import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const trimmedUrl = url.trim();

    if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const isFacebook =
      trimmedUrl.includes("facebook.com") ||
      trimmedUrl.includes("fb.com") ||
      trimmedUrl.includes("fb.watch");
    const isInstagram = trimmedUrl.includes("instagram.com") || trimmedUrl.includes("instagr.am");
    const isMetaAi = trimmedUrl.includes("meta.ai");

    if (!isFacebook && !isInstagram && !isMetaAi) {
      return NextResponse.json(
        { error: "Only Facebook, Instagram, and Meta AI links are supported" },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(trimmedUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
        redirect: "follow",
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Failed to fetch page (HTTP ${response.status})` },
          { status: 502 }
        );
      }

      const html = await response.text();

      const videoUrlPatterns = [
        /<meta[^>]+property="og:video"[^>]+content="([^"]+)"/i,
        /<meta[^>]+property="og:video:url"[^>]+content="([^"]+)"/i,
        /<meta[^>]+name="twitter:player"[^>]+content="([^"]+)"/i,
        /<video[^>]+src="([^"]+)"/i,
        /<source[^>]+src="([^"]+\.mp4[^"]*)"/i,
        /"video_url"\s*:\s*"([^"]+)"/i,
        /"download_url"\s*:\s*"([^"]+)"/i,
        /"playable_url"\s*:\s*"([^"]+)"/i,
        /"hd_src"\s*:\s*"([^"]+)"/i,
        /"sd_src"\s*:\s*"([^"]+)"/i,
        /"src"\s*:\s*"([^"]+\.mp4[^"]*)"/i,
      ];

      let videoSrc: string | null = null;
      for (const pattern of videoUrlPatterns) {
        const match = html.match(pattern);
        if (match?.[1]) {
          videoSrc = match[1].replace(/\\u0025/g, "%").replace(/\\\//g, "/").replace(/\\\\/g, "\\");
          break;
        }
      }

      if (!videoSrc) {
        return NextResponse.json(
          { error: "Could not find a downloadable video on this page" },
          { status: 404 }
        );
      }

      clearTimeout(timeout);

      const videoResponse = await fetch(videoSrc, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Referer: trimmedUrl,
        },
        redirect: "follow",
      });

      clearTimeout(timeout);

      if (!videoResponse.ok) {
        return NextResponse.json(
          { error: `Failed to fetch video (HTTP ${videoResponse.status})` },
          { status: 502 }
        );
      }

      const contentType = videoResponse.headers.get("content-type") || "video/mp4";
      const contentLength = videoResponse.headers.get("content-length");
      const videoBuffer = await videoResponse.arrayBuffer();

      return new NextResponse(videoBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Length": contentLength || String(videoBuffer.byteLength),
          "Content-Disposition": `attachment; filename="meta-video-${Date.now()}.mp4"`,
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Download failed: ${message}` }, { status: 500 });
  }
}
