import type { ExtractedSite, ThemeFile } from "./types";

/** Shopify rejects oversized themes, so imports are capped well below the limit. */
const MAX_ASSETS = 12;
const MAX_BYTES_PER_ASSET = 2 * 1024 * 1024;
const MAX_TOTAL_BYTES = 12 * 1024 * 1024;

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

export interface AssetImportResult {
  files: ThemeFile[];
  /** Original URL -> flat filename inside assets/. */
  map: Record<string, string>;
  notes: string[];
}

/** Every image the extractor found, in the order it should be imported. */
function collectImageUrls(site: ExtractedSite): string[] {
  const urls = [
    site.header.logo?.src,
    site.hero?.image?.src,
    site.imageWithText?.image?.src,
    ...(site.featured?.cards.map((card) => card.image?.src) ?? []),
  ];

  return [...new Set(urls.filter((url): url is string => Boolean(url)))];
}

function safeName(url: string, index: number, extension: string): string {
  const base = decodeURIComponent(new URL(url).pathname.split("/").pop() || "image")
    .replace(/\.[a-z0-9]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

  // assets/ is flat in Shopify, so the index guarantees uniqueness.
  return `imported-${index + 1}-${base || "image"}.${extension}`;
}

/**
 * Downloads the source page's images into the theme's assets/ directory.
 * Failures are reported rather than thrown — a missing image should never
 * cost the merchant the whole theme.
 */
export async function importAssets(site: ExtractedSite): Promise<AssetImportResult> {
  const urls = collectImageUrls(site).slice(0, MAX_ASSETS);
  const files: ThemeFile[] = [];
  const map: Record<string, string> = {};
  const notes: string[] = [];

  let totalBytes = 0;
  let skipped = 0;

  const downloads = await Promise.all(
    urls.map(async (url, index) => {
      try {
        const response = await fetch(url, { redirect: "follow", cache: "no-store" });
        if (!response.ok) return { url, index, error: `HTTP ${response.status}` };

        const contentType = (response.headers.get("content-type") || "").split(";")[0].trim();
        const extension = EXTENSION_BY_TYPE[contentType];
        if (!extension) return { url, index, error: `unsupported type ${contentType || "unknown"}` };

        const buffer = Buffer.from(await response.arrayBuffer());
        if (buffer.byteLength > MAX_BYTES_PER_ASSET) {
          return { url, index, error: `larger than ${MAX_BYTES_PER_ASSET / 1024 / 1024}MB` };
        }

        return { url, index, extension, buffer };
      } catch (error) {
        return { url, index, error: error instanceof Error ? error.message : "download failed" };
      }
    })
  );

  for (const download of downloads) {
    if ("error" in download && download.error) {
      skipped += 1;
      continue;
    }

    const { url, index, extension, buffer } = download as {
      url: string;
      index: number;
      extension: string;
      buffer: Buffer;
    };

    if (totalBytes + buffer.byteLength > MAX_TOTAL_BYTES) {
      skipped += 1;
      continue;
    }

    const name = safeName(url, index, extension);
    files.push({ path: `assets/${name}`, contents: buffer });
    map[url] = name;
    totalBytes += buffer.byteLength;
  }

  if (files.length) {
    notes.push(
      `${files.length} image(s) were downloaded into assets/ (${(totalBytes / 1024).toFixed(0)} KB) and are referenced with asset_url.`
    );
  }

  if (skipped) {
    notes.push(
      `${skipped} image(s) could not be imported (unreachable, too large, or an unsupported format) and still point at the source site.`
    );
  }

  return { files, map, notes };
}
