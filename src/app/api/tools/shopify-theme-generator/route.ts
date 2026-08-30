import { NextRequest, NextResponse } from "next/server";
import { extractSite, fetchPage, normalizeUrl } from "@/lib/shopify-theme/extract";
import { importAssets } from "@/lib/shopify-theme/assets";
import { buildThemeFiles, themeCss, zipTheme } from "@/lib/shopify-theme/generate";
import { buildPreviewHtml } from "@/lib/shopify-theme/preview";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { url, authorized } = payload as { url?: string; authorized?: boolean };

  // Guardrail from the product plan: no conversion without a stated authorization.
  if (!authorized) {
    return NextResponse.json(
      {
        success: false,
        error: "Confirm that you own this website or have permission to convert it before continuing.",
      },
      { status: 403 }
    );
  }

  let normalizedUrl: string;
  try {
    normalizedUrl = normalizeUrl(url || "");
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Invalid URL" },
      { status: 400 }
    );
  }

  try {
    const html = await fetchPage(normalizedUrl);
    const site = extractSite(html, normalizedUrl);

    const imported = await importAssets(site);
    site.warnings = [...site.warnings, ...imported.notes];

    const files = [
      ...buildThemeFiles(site, "Confirmed by the user in the browser at conversion time.", imported.map),
      ...imported.files,
    ];
    const archive = await zipTheme(files);

    return NextResponse.json({
      success: true,
      previewHtml: buildPreviewHtml(site, themeCss(site)),
      source: {
        url: site.sourceUrl,
        brand: site.brand,
        title: site.title,
        description: site.description,
        colors: site.colors,
        convertedAt: site.extractedAt,
      },
      detected: {
        header: { links: site.header.links.length, logo: Boolean(site.header.logo) },
        hero: site.hero,
        imageWithText: site.imageWithText,
        featured: site.featured,
        testimonials: site.testimonials,
        faq: site.faq,
        footer: { links: site.footer.links.length, copyright: site.footer.copyright },
      },
      warnings: site.warnings,
      theme: {
        fileCount: files.length,
        files: files.map((file) => file.path).sort(),
        sizeBytes: archive.byteLength,
        // The client turns this into a Blob so the download never leaves the browser.
        zipBase64: archive.toString("base64"),
        fileName: `${site.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "generated"}-shopify-theme.zip`,
      },
    });
  } catch (error) {
    console.error("Shopify theme generation failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Could not convert that page.",
      },
      { status: 502 }
    );
  }
}
