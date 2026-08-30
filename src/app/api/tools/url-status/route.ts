import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function normalizeUrl(input: string) {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("URL is required.");
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are supported.");
  }
  return url.toString();
}

type Hop = { url: string; status: number | null; location: string | null };
type Result = {
  url: string;
  finalUrl: string;
  status: number | null;
  ok: boolean;
  hops: Hop[];
  redirectCount: number;
  loop: boolean;
  error?: string;
};

const MAX_HOPS = 6;
const REQUEST_TIMEOUT_MS = 15_000;

async function checkUrl(rawUrl: string): Promise<Result> {
  const startUrl = normalizeUrl(rawUrl);
  const hops: Hop[] = [];
  const seen = new Set<string>();
  let current = startUrl;
  let redirectCount = 0;
  let loop = false;

  for (let hopIndex = 0; hopIndex <= MAX_HOPS; hopIndex++) {
    if (seen.has(current)) {
      loop = true;
      break;
    }
    seen.add(current);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      let response: Response;
      try {
        response = await fetch(current, {
          method: "GET",
          redirect: "manual",
          signal: controller.signal,
          headers: {
            "user-agent": "W3Tech-URL-Checker/1.0",
            accept: "*/*",
          },
          cache: "no-store",
        });
      } finally {
        clearTimeout(timeout);
      }

      hops.push({
        url: current,
        status: response.status,
        location: response.headers.get("location"),
      });

      const status = response.status;
      if (status >= 300 && status < 400 && status !== 304) {
        const locationHeader = response.headers.get("location");
        if (!locationHeader) {
          break;
        }
        try {
          current = new URL(locationHeader, current).toString();
        } catch {
          break;
        }
        redirectCount++;
        continue;
      }

      return {
        url: startUrl,
        finalUrl: current,
        status,
        ok: status >= 200 && status < 400,
        hops,
        redirectCount,
        loop: false,
      };
    } catch (error) {
      return {
        url: startUrl,
        finalUrl: current,
        status: null,
        ok: false,
        hops,
        redirectCount,
        loop,
        error: error instanceof Error ? error.message : "Request failed",
      };
    }
  }

  return {
    url: startUrl,
    finalUrl: current,
    status: null,
    ok: false,
    hops,
    redirectCount,
    loop,
    error: loop ? "Redirect loop detected" : "Too many redirects",
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const raw = typeof (body as Record<string, unknown>)?.urls === "string" ? String((body as Record<string, unknown>).urls) : "";
  const urls = raw
    .split(/[\n,]/)
    .map((u) => u.trim())
    .filter(Boolean)
    .slice(0, 10);

  if (!urls.length) {
    return NextResponse.json({ success: false, error: "At least one URL is required" }, { status: 400 });
  }

  const results = await Promise.all(urls.map((url) => checkUrl(url)));

  return NextResponse.json(
    { success: true, results, message: "URL status checks are ready." },
    { status: 200 }
  );
}