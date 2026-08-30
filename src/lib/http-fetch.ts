import dns from "node:dns";
import { Agent } from "undici";

/**
 * Outbound fetch layer for tools that read third-party sites.
 *
 * Every quirk here exists because a plain `fetch` fails against some real
 * hosting setup:
 *  - IPv6 is often advertised via DNS but unroutable in production, so AAAA
 *    records resolve and then hang.
 *  - Some proxies return an empty body when the runtime cannot decode the
 *    compression they chose, so we ask for identity encoding.
 *  - `response.text()` intermittently yields an empty string on certain
 *    undici builds, so bodies are read from the raw stream first.
 *  - CDN/WAF layers (Sucuri, some Cloudflare configs) serve certificates that
 *    do not match the requested hostname.
 *
 * That last point is why `rejectUnauthorized` is false — but only inside these
 * Agents, so it applies to scraping traffic alone. Never set
 * NODE_TLS_REJECT_UNAUTHORIZED globally: that would silently disable
 * certificate checking for SMTP and every other outbound call the server makes.
 */

try {
  dns.setDefaultResultOrder?.("ipv4first");
} catch {
  // Older runtimes do not expose this; ordering just stays at the default.
}

export const fetchDispatcher = new Agent({
  connectTimeout: 20_000,
  headersTimeout: 60_000,
  bodyTimeout: 60_000,
  connect: { rejectUnauthorized: false },
});

/** For deliberately slow upstreams — PageSpeed runs a live Lighthouse audit first. */
export const slowFetchDispatcher = new Agent({
  connectTimeout: 20_000,
  headersTimeout: 90_000,
  bodyTimeout: 90_000,
  connect: { rejectUnauthorized: false },
});

const DEFAULT_HEADERS: Record<string, string> = {
  "User-Agent": "Mozilla/5.0 (compatible; W3TechAuditBot/1.0; +https://www.w3tech.co.in/)",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.8,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "identity",
};

export interface FetchOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit;
  dispatcher?: Agent;
}

export interface FetchTextResult {
  ok: boolean;
  status: number;
  contentType: string;
  url: string;
  html: string;
  elapsedMs: number;
}

export interface FetchBufferResult {
  ok: boolean;
  status: number;
  contentType: string;
  url: string;
  buffer: Buffer;
}

function normalizeContentType(value: string | null): string {
  return String(value || "").replace(/\s+/g, " ").trim();
}

/** Reads a text body from the raw stream, falling back to response.text(). */
export async function readBody(response: Response): Promise<string> {
  try {
    if (response.body) {
      const chunks: Buffer[] = [];
      // @ts-expect-error - Node streams are async-iterable at runtime.
      for await (const chunk of response.body) chunks.push(Buffer.from(chunk));
      return Buffer.concat(chunks).toString("utf8");
    }
  } catch {
    // fall through
  }

  try {
    return (await response.text()) || "";
  } catch {
    return "";
  }
}

/** Binary counterpart of readBody, for images and files. */
export async function readBuffer(response: Response): Promise<Buffer> {
  try {
    if (response.body) {
      const chunks: Buffer[] = [];
      // @ts-expect-error - Node streams are async-iterable at runtime.
      for await (const chunk of response.body) chunks.push(Buffer.from(chunk));
      return Buffer.concat(chunks);
    }
  } catch {
    // fall through
  }

  try {
    return Buffer.from(await response.arrayBuffer());
  } catch {
    return Buffer.alloc(0);
  }
}

async function fetchAny(url: string, options: FetchOptions, readAll: boolean): Promise<FetchTextResult> {
  const {
    signal,
    timeoutMs = 15_000,
    method = "GET",
    headers = {},
    body,
    dispatcher = fetchDispatcher,
  } = options;

  const controller = new AbortController();
  const useSignal = signal || controller.signal;
  const timer = signal ? null : setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: useSignal,
      headers: { ...DEFAULT_HEADERS, ...headers },
      body,
      cache: "no-store",
      // `dispatcher` is an undici extension that Node's fetch honours.
      dispatcher,
    } as RequestInit & { dispatcher: Agent });

    const status = response.status;
    const ok = status >= 200 && status < 400;
    const contentType = normalizeContentType(response.headers.get("content-type"));

    let html = "";
    if (ok) {
      const looksLikeHtml = !contentType || /text\/html|application\/xhtml\+xml/i.test(contentType);
      if (readAll || looksLikeHtml) {
        html = await readBody(response);
      }
    }

    return { ok, status, contentType, url: response.url || url, html, elapsedMs: Date.now() - start };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Reads the body only when the content-type looks like HTML. */
export const fetchHtml = (url: string, options: FetchOptions = {}) => fetchAny(url, options, false);

/** Reads the body whatever the content-type (HTML, XML, JSON, plain text). */
export const fetchText = (url: string, options: FetchOptions = {}) => fetchAny(url, options, true);

/** Fetches a binary resource and returns the raw Buffer. */
export async function fetchBuffer(url: string, options: FetchOptions = {}): Promise<FetchBufferResult> {
  const {
    signal,
    timeoutMs = 15_000,
    method = "GET",
    headers = {},
    dispatcher = fetchDispatcher,
  } = options;

  const controller = new AbortController();
  const useSignal = signal || controller.signal;
  const timer = signal ? null : setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: useSignal,
      headers: { ...DEFAULT_HEADERS, ...headers },
      cache: "no-store",
      dispatcher,
    } as RequestInit & { dispatcher: Agent });

    const status = response.status;
    const ok = status >= 200 && status < 400;

    return {
      ok,
      status,
      contentType: normalizeContentType(response.headers.get("content-type")),
      url: response.url || url,
      buffer: ok ? await readBuffer(response) : Buffer.alloc(0),
    };
  } catch {
    return { ok: false, status: 0, contentType: "", url, buffer: Buffer.alloc(0) };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Some hosts reject the apex domain but serve www (or the reverse).
 * Returns the www variant of a URL, or null when it already has one.
 */
export function withWwwFallback(inputUrl: string): string | null {
  try {
    const url = new URL(inputUrl);
    if (url.hostname.startsWith("www.")) return null;
    url.hostname = `www.${url.hostname}`;
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Fetches a page, retrying once against the www variant when the first attempt
 * throws or is rejected — the single most common cause of "audit failed" on
 * sites that are actually reachable in a browser.
 */
export async function fetchPageWithFallback(url: string, options: FetchOptions = {}): Promise<FetchTextResult> {
  try {
    const result = await fetchText(url, options);
    if (result.ok) return result;

    const fallbackUrl = withWwwFallback(url);
    if (!fallbackUrl) return result;

    const fallback = await fetchText(fallbackUrl, options);
    return fallback.ok ? fallback : result;
  } catch (error) {
    const fallbackUrl = withWwwFallback(url);
    if (!fallbackUrl) throw error;
    return fetchText(fallbackUrl, options);
  }
}
