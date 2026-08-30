import { NextRequest, NextResponse } from "next/server";
import { fetchText, slowFetchDispatcher } from "@/lib/http-fetch";

const GOOGLE_PAGESPEED_KEY = process.env.PAGESPEED_API_KEY || process.env.GOOGLE_PAGESPEED_KEY || "";

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

type StrategyResult = {
  strategy: "mobile" | "desktop";
  performanceScore: number | null;
  accessibilityScore: number | null;
  seoScore: number | null;
  bestPracticesScore: number | null;
  firstContentfulPaint: string;
  largestContentfulPaint: string;
  cumulativeLayoutShift: string;
  speedIndex: string;
  totalBlockingTime: string;
  timeToInteractive: string;
};

async function fetchPageSpeed(url: string, strategy: "mobile" | "desktop"): Promise<StrategyResult | null> {
  try {
    const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("strategy", strategy);
    if (GOOGLE_PAGESPEED_KEY) {
      apiUrl.searchParams.set("key", GOOGLE_PAGESPEED_KEY);
    }

    const response = await fetchText(apiUrl.toString(), {
      headers: { accept: "application/json" },
      dispatcher: slowFetchDispatcher,
      timeoutMs: 90_000,
    });

    if (!response.ok || !response.html) {
      return null;
    }

    const data = JSON.parse(response.html) as {
      lighthouseResult?: {
        categories?: {
          performance?: { score?: number };
          accessibility?: { score?: number };
          seo?: { score?: number };
          "best-practices"?: { score?: number };
        };
        audits?: Record<string, { displayValue?: string }>;
      };
      error?: { message?: string };
    };

    if (data.error?.message) {
      throw new Error(data.error.message);
    }

    const categories = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits ?? {};

    return {
      strategy,
      performanceScore: categories?.performance?.score != null ? Math.round(categories.performance.score * 100) : null,
      accessibilityScore:
        categories?.accessibility?.score != null ? Math.round(categories.accessibility.score * 100) : null,
      seoScore: categories?.seo?.score != null ? Math.round(categories.seo.score * 100) : null,
      bestPracticesScore:
        categories?.["best-practices"]?.score != null ? Math.round(categories["best-practices"].score * 100) : null,
      firstContentfulPaint: audits["first-contentful-paint"]?.displayValue ?? "Unavailable",
      largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue ?? "Unavailable",
      cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue ?? "Unavailable",
      speedIndex: audits["speed-index"]?.displayValue ?? "Unavailable",
      totalBlockingTime: audits["total-blocking-time"]?.displayValue ?? "Unavailable",
      timeToInteractive: audits["interactive"]?.displayValue ?? "Unavailable",
    };
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  let url: string;
  try {
    url = normalizeUrl(String((body as Record<string, unknown>)?.url ?? ""));
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Invalid URL" },
      { status: 400 }
    );
  }

  const modes = String((body as Record<string, unknown>)?.strategies ?? "mobile,desktop");
  const strategies = modes
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s === "mobile" || s === "desktop") as ("mobile" | "desktop")[];

  const results = await Promise.all(strategies.map((strategy) => fetchPageSpeed(url, strategy)));
  const resolved = results.filter((r): r is StrategyResult => r !== null);

  if (!resolved.length) {
    return NextResponse.json(
      {
        success: false,
        error: "PageSpeed could not produce results for this URL.",
        details: "The URL may be unreachable or the request quota may be exhausted. Try again in a few minutes.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: { url, results: resolved },
      message: "PageSpeed results are ready.",
    },
    { status: 200 }
  );
}