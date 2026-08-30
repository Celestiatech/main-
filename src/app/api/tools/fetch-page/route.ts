import { NextRequest, NextResponse } from "next/server";
import { fetchPageWithFallback } from "@/lib/http-fetch";

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

export async function GET(request: NextRequest) {
  try {
    const rawUrl = request.nextUrl.searchParams.get("url") ?? "";
    const url = normalizeUrl(rawUrl);
    const result = await fetchPageWithFallback(url);
    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: `The page returned status ${result.status}.` },
        { status: 502 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        url: result.url,
        contentType: result.contentType,
        html: result.html,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch the URL." },
      { status: 400 }
    );
  }
}