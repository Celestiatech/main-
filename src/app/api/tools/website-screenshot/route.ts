import { NextRequest, NextResponse } from "next/server";

const SCREENSHOT_KEY = process.env.SCREENSHOTMACHINE_KEY || "";

function normalizeTargetUrl(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("URL is required.");
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are supported.");
  }

  return url.toString();
}

function buildScreenshotUrl(url: string, device: string, variant: string) {
  const params = new URLSearchParams({
    key: SCREENSHOT_KEY,
    url,
  });

  if (device === "mobile") {
    params.set("device", "phone");
    params.set("dimension", variant === "tall" ? "480x1200" : "480x800");
  } else if (device === "tablet") {
    params.set("device", "tablet");
    params.set("dimension", variant === "tall" ? "900x1600" : "800x1280");
  } else {
    if (variant === "wide") {
      params.set("dimension", "1600x1000");
    } else if (variant === "tall") {
      params.set("dimension", "1440x2200");
    } else {
      params.set("dimension", "1280x960");
    }
  }

  return `https://api.screenshotmachine.com/?${params.toString()}`;
}

export async function GET(request: NextRequest) {
  try {
    const rawUrl = request.nextUrl.searchParams.get("url") ?? "";
    const device = request.nextUrl.searchParams.get("device") ?? "desktop";
    const variant = request.nextUrl.searchParams.get("variant") ?? "default";
    const url = normalizeTargetUrl(rawUrl);
    const screenshotUrl = buildScreenshotUrl(url, device, variant);

    const response = await fetch(screenshotUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Screenshot provider returned ${response.status}.` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "content-type": contentType,
        "cache-control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to capture screenshot." },
      { status: 400 }
    );
  }
}
