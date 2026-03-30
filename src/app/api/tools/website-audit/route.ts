import { NextRequest, NextResponse } from "next/server";

type AuditCheck = {
  id: string;
  label: string;
  passed: boolean;
  value?: string;
  details?: string;
};

type AuditSection = {
  id: string;
  title: string;
  score: number;
  checks: AuditCheck[];
};

type PageSpeedSummary = {
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
};

type AuditSectionWithInclusion = AuditSection & {
  includeInOverall?: boolean;
};

const GOOGLE_PAGESPEED_KEY = "AIzaSyDT9H1dgnuNDk0E7iEwm0rzj503moPrI0Y";

function normalizeUrl(input: string) {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Website URL is required.");
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are supported.");
  }

  return url.toString();
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function stripTags(value: string) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function parseAttributes(tag: string) {
  const attrs: Record<string, string> = {};
  const attrRegex = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match: RegExpExecArray | null;

  while ((match = attrRegex.exec(tag)) !== null) {
    const name = match[1].toLowerCase();
    if (name.startsWith("<")) {
      continue;
    }
    attrs[name] = match[2] ?? match[3] ?? match[4] ?? "";
  }

  return attrs;
}

function getMetaTags(html: string) {
  return Array.from(html.matchAll(/<meta\b[^>]*>/gi)).map((match) => parseAttributes(match[0]));
}

function getLinkTags(html: string) {
  return Array.from(html.matchAll(/<link\b[^>]*>/gi)).map((match) => parseAttributes(match[0]));
}

function getAnchorTags(html: string) {
  return Array.from(html.matchAll(/<a\b[^>]*>/gi)).map((match) => parseAttributes(match[0]));
}

function getImageTags(html: string) {
  return Array.from(html.matchAll(/<img\b[^>]*>/gi)).map((match) => parseAttributes(match[0]));
}

function getTitle(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]) : "";
}

function getHtmlLang(html: string) {
  const match = html.match(/<html\b[^>]*\blang=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  return (match?.[1] ?? match?.[2] ?? match?.[3] ?? "").trim();
}

function getMetaContent(html: string, key: "name" | "property", expected: string) {
  const tags = getMetaTags(html);
  const found = tags.find((tag) => (tag[key] ?? "").toLowerCase() === expected.toLowerCase());
  return found?.content?.trim() ?? "";
}

function countMatches(html: string, regex: RegExp) {
  return (html.match(regex) ?? []).length;
}

function findCanonical(html: string) {
  const links = getLinkTags(html);
  const canonical = links.find((tag) => (tag.rel ?? "").toLowerCase().split(/\s+/).includes("canonical"));
  return canonical?.href?.trim() ?? "";
}

function findFavicon(html: string) {
  const links = getLinkTags(html);
  const icon = links.find((tag) => {
    const rel = (tag.rel ?? "").toLowerCase();
    return rel.includes("icon");
  });
  return icon?.href?.trim() ?? "";
}

function hasViewportMeta(html: string) {
  return Boolean(getMetaContent(html, "name", "viewport"));
}

function getButtonsCount(html: string) {
  const buttonTags = countMatches(html, /<button\b/gi);
  const submitInputs = countMatches(html, /<input\b[^>]*type=["']?(submit|button)["']?[^>]*>/gi);
  return buttonTags + submitInputs;
}

function getFormCount(html: string) {
  return countMatches(html, /<form\b/gi);
}

function getLabelCount(html: string) {
  return countMatches(html, /<label\b/gi);
}

function getInputCount(html: string) {
  return countMatches(html, /<(input|textarea|select)\b/gi);
}

function getMissingImageDimensions(images: Record<string, string>[]) {
  return images.filter((image) => !(image.width ?? "").trim() || !(image.height ?? "").trim()).length;
}

function buildPageSpeedCheck(label: string, value: number | null, goodThreshold: number, okThreshold: number, unit = ""): AuditCheck {
  if (value === null || Number.isNaN(value)) {
    return {
      id: label.toLowerCase().replace(/\s+/g, "-"),
      label,
      passed: false,
      value: "Unavailable",
      details: "Google PageSpeed Insights did not return this metric.",
    };
  }

  return {
    id: label.toLowerCase().replace(/\s+/g, "-"),
    label,
    passed: value <= goodThreshold,
    value: `${value}${unit}`,
    details: value <= goodThreshold ? "Good" : value <= okThreshold ? "Needs improvement" : "Poor",
  };
}

function parseDisplayMilliseconds(displayValue: string | undefined) {
  if (!displayValue) {
    return null;
  }

  const normalized = displayValue.replace(/,/g, "").toLowerCase();
  const value = parseFloat(normalized);
  if (Number.isNaN(value)) {
    return null;
  }
  if (normalized.includes("ms")) {
    return value;
  }
  if (normalized.includes("s")) {
    return value * 1000;
  }
  return value;
}

function parseDisplayCls(displayValue: string | undefined) {
  if (!displayValue) {
    return null;
  }
  const value = parseFloat(displayValue.replace(/,/g, ""));
  return Number.isNaN(value) ? null : value;
}

async function fetchPageSpeed(url: string, strategy: "mobile" | "desktop"): Promise<PageSpeedSummary | null> {
  try {
    const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("strategy", strategy);
    apiUrl.searchParams.set("key", GOOGLE_PAGESPEED_KEY);

    const response = await fetch(apiUrl.toString(), {
      cache: "no-store",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      lighthouseResult?: {
        categories?: {
          performance?: { score?: number };
          accessibility?: { score?: number };
          seo?: { score?: number };
          "best-practices"?: { score?: number };
        };
        audits?: Record<string, { displayValue?: string }>;
      };
    };

    const categories = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits ?? {};

    return {
      strategy,
      performanceScore: categories?.performance?.score != null ? Math.round(categories.performance.score * 100) : null,
      accessibilityScore: categories?.accessibility?.score != null ? Math.round(categories.accessibility.score * 100) : null,
      seoScore: categories?.seo?.score != null ? Math.round(categories.seo.score * 100) : null,
      bestPracticesScore: categories?.["best-practices"]?.score != null ? Math.round(categories["best-practices"].score * 100) : null,
      firstContentfulPaint: audits["first-contentful-paint"]?.displayValue ?? "Unavailable",
      largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue ?? "Unavailable",
      cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue ?? "Unavailable",
      speedIndex: audits["speed-index"]?.displayValue ?? "Unavailable",
      totalBlockingTime: audits["total-blocking-time"]?.displayValue ?? "Unavailable",
    };
  } catch {
    return null;
  }
}

function resolveUrl(baseUrl: string, maybeRelative: string) {
  try {
    return new URL(maybeRelative, baseUrl).toString();
  } catch {
    return maybeRelative;
  }
}

function safeHost(input: string) {
  try {
    return new URL(input).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function classifyLinks(baseUrl: string, html: string) {
  const anchors = getAnchorTags(html);
  const baseHost = safeHost(baseUrl);
  const socialHosts = [
    "facebook.com",
    "instagram.com",
    "linkedin.com",
    "x.com",
    "twitter.com",
    "youtube.com",
    "tiktok.com",
    "pinterest.com",
    "github.com",
  ];

  let internal = 0;
  let external = 0;
  let social = 0;

  for (const anchor of anchors) {
    const href = anchor.href?.trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      continue;
    }

    const resolved = resolveUrl(baseUrl, href);
    const host = safeHost(resolved);

    if (!host || host === baseHost) {
      internal += 1;
      continue;
    }

    external += 1;

    if (socialHosts.some((socialHost) => host === socialHost || host.endsWith(`.${socialHost}`))) {
      social += 1;
    }
  }

  return {
    internal,
    external,
    social,
  };
}

async function exists(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; WebsiteAuditTool/1.0; +https://localhost)",
      },
      redirect: "follow",
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}

function buildScore(checks: AuditCheck[]) {
  if (checks.length === 0) {
    return 0;
  }

  const passed = checks.filter((check) => check.passed).length;
  return Math.round((passed / checks.length) * 100);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { url?: string };
    const normalizedUrl = normalizeUrl(body.url ?? "");

    const start = Date.now();
    const response = await fetch(normalizedUrl, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; WebsiteAuditTool/1.0; +https://localhost)",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      cache: "no-store",
    });
    const responseTimeMs = Date.now() - start;

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Target URL returned ${response.status} ${response.statusText}.`,
        },
        { status: 400 }
      );
    }

    const html = await response.text();
    const finalUrl = response.url || normalizedUrl;
    const pageSizeBytes = Buffer.byteLength(html, "utf8");
    const title = getTitle(html);
    const metaDescription = getMetaContent(html, "name", "description");
    const canonical = findCanonical(html);
    const favicon = findFavicon(html);
    const robotsMeta = getMetaContent(html, "name", "robots");
    const ogTitle = getMetaContent(html, "property", "og:title");
    const ogDescription = getMetaContent(html, "property", "og:description");
    const ogImage = getMetaContent(html, "property", "og:image");
    const h1Count = countMatches(html, /<h1\b/gi);
    const h2Count = countMatches(html, /<h2\b/gi);
    const schemaCount = countMatches(html, /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi);
    const wordCount = stripTags(html).split(/\s+/).filter(Boolean).length;
    const images = getImageTags(html);
    const imagesWithoutAlt = images.filter((image) => !(image.alt ?? "").trim()).length;
    const links = classifyLinks(finalUrl, html);
    const robotsUrl = resolveUrl(finalUrl, "/robots.txt");
    const sitemapUrl = resolveUrl(finalUrl, "/sitemap.xml");
    const [hasRobots, hasSitemap] = await Promise.all([exists(robotsUrl), exists(sitemapUrl)]);
    const isHttps = finalUrl.startsWith("https://");

    const htmlLang = getHtmlLang(html);
    const viewportPresent = hasViewportMeta(html);
    const buttonsCount = getButtonsCount(html);
    const formsCount = getFormCount(html);
    const labelsCount = getLabelCount(html);
    const inputCount = getInputCount(html);
    const missingImageDimensions = getMissingImageDimensions(images);
    const [pageSpeedMobile, pageSpeedDesktop] = await Promise.all([
      fetchPageSpeed(finalUrl, "mobile"),
      fetchPageSpeed(finalUrl, "desktop"),
    ]);

    const seoChecks: AuditCheck[] = [
      {
        id: "title",
        label: "Title tag",
        passed: title.length >= 10 && title.length <= 65,
        value: title || "Missing",
        details: "Recommended range: 10 to 65 characters.",
      },
      {
        id: "description",
        label: "Meta description",
        passed: metaDescription.length >= 70 && metaDescription.length <= 160,
        value: metaDescription || "Missing",
        details: "Recommended range: 70 to 160 characters.",
      },
      {
        id: "h1",
        label: "Single H1 heading",
        passed: h1Count === 1,
        value: `${h1Count} found`,
      },
      {
        id: "h2",
        label: "Supporting H2 structure",
        passed: h2Count >= 1,
        value: `${h2Count} found`,
      },
      {
        id: "canonical",
        label: "Canonical URL",
        passed: Boolean(canonical),
        value: canonical || "Missing",
      },
      {
        id: "content-depth",
        label: "Visible content depth",
        passed: wordCount >= 250,
        value: `${wordCount} words`,
        details: "Pages under 250 words are often thin for SEO landing pages.",
      },
      {
        id: "image-alt",
        label: "Image alt coverage",
        passed: images.length === 0 || imagesWithoutAlt === 0,
        value: images.length === 0 ? "No images found" : `${imagesWithoutAlt}/${images.length} missing alt`,
      },
    ];

    const technicalChecks: AuditCheck[] = [
      {
        id: "https",
        label: "HTTPS enabled",
        passed: isHttps,
        value: isHttps ? "Secure" : "Not secure",
      },
      {
        id: "robots",
        label: "robots.txt available",
        passed: hasRobots,
        value: hasRobots ? robotsUrl : "Missing",
      },
      {
        id: "sitemap",
        label: "sitemap.xml available",
        passed: hasSitemap,
        value: hasSitemap ? sitemapUrl : "Missing",
      },
      {
        id: "favicon",
        label: "Favicon linked",
        passed: Boolean(favicon),
        value: favicon || "Missing",
      },
      {
        id: "indexing",
        label: "Indexable page",
        passed: !/noindex/i.test(robotsMeta),
        value: robotsMeta || "No robots meta found",
      },
    ];

    const socialChecks: AuditCheck[] = [
      {
        id: "og-title",
        label: "Open Graph title",
        passed: Boolean(ogTitle),
        value: ogTitle || "Missing",
      },
      {
        id: "og-description",
        label: "Open Graph description",
        passed: Boolean(ogDescription),
        value: ogDescription || "Missing",
      },
      {
        id: "og-image",
        label: "Open Graph image",
        passed: Boolean(ogImage),
        value: ogImage || "Missing",
      },
      {
        id: "social-links",
        label: "Social profile links",
        passed: links.social > 0,
        value: `${links.social} found`,
      },
    ];

    const performanceChecks: AuditCheck[] = [
      {
        id: "response-time",
        label: "Server response time",
        passed: responseTimeMs < 1500,
        value: `${responseTimeMs} ms`,
      },
      {
        id: "page-size",
        label: "HTML payload size",
        passed: pageSizeBytes < 250_000,
        value: `${(pageSizeBytes / 1024).toFixed(1)} KB`,
      },
      {
        id: "structured-data",
        label: "Structured data present",
        passed: schemaCount > 0,
        value: `${schemaCount} schema block${schemaCount === 1 ? "" : "s"}`,
      },
    ];

    const usabilityChecks: AuditCheck[] = [
      {
        id: "viewport",
        label: "Responsive viewport meta tag",
        passed: viewportPresent,
        value: viewportPresent ? "Present" : "Missing",
      },
      {
        id: "lang",
        label: "Document language declared",
        passed: Boolean(htmlLang),
        value: htmlLang || "Missing",
      },
      {
        id: "forms",
        label: "Forms have visible labels",
        passed: formsCount === 0 || labelsCount >= Math.max(1, Math.floor(inputCount / 2)),
        value: `${labelsCount} labels / ${inputCount} fields`,
      },
      {
        id: "button-clarity",
        label: "Primary actions available",
        passed: buttonsCount > 0,
        value: `${buttonsCount} action elements`,
      },
      {
        id: "image-dimensions",
        label: "Images reserve layout space",
        passed: images.length === 0 || missingImageDimensions === 0,
        value: images.length === 0 ? "No images found" : `${missingImageDimensions}/${images.length} missing width or height`,
      },
    ];

    const pageSpeedChecks: AuditCheck[] = [];
    if (pageSpeedMobile) {
      const fcp = parseDisplayMilliseconds(pageSpeedMobile.firstContentfulPaint);
      const lcp = parseDisplayMilliseconds(pageSpeedMobile.largestContentfulPaint);
      const tbt = parseDisplayMilliseconds(pageSpeedMobile.totalBlockingTime);
      const cls = parseDisplayCls(pageSpeedMobile.cumulativeLayoutShift);

      pageSpeedChecks.push(
        {
          id: "psi-mobile-performance",
          label: "Google PSI mobile performance",
          passed: (pageSpeedMobile.performanceScore ?? 0) >= 75,
          value: pageSpeedMobile.performanceScore != null ? `${pageSpeedMobile.performanceScore}%` : "Unavailable",
        },
        {
          id: "psi-desktop-performance",
          label: "Google PSI desktop performance",
          passed: (pageSpeedDesktop?.performanceScore ?? 0) >= 80,
          value: pageSpeedDesktop?.performanceScore != null ? `${pageSpeedDesktop.performanceScore}%` : "Unavailable",
        },
        buildPageSpeedCheck("First Contentful Paint", fcp, 1800, 3000, " ms"),
        buildPageSpeedCheck("Largest Contentful Paint", lcp, 2500, 4000, " ms"),
        buildPageSpeedCheck("Total Blocking Time", tbt, 200, 600, " ms"),
        {
          id: "cumulative-layout-shift",
          label: "Cumulative Layout Shift",
          passed: cls !== null && cls <= 0.1,
          value: cls !== null ? String(cls) : "Unavailable",
          details: cls !== null ? (cls <= 0.1 ? "Good" : cls <= 0.25 ? "Needs improvement" : "Poor") : "Google PageSpeed Insights did not return this metric.",
        }
      );
    } else {
      pageSpeedChecks.push({
        id: "psi-unavailable",
        label: "Google PageSpeed Insights",
        passed: false,
        value: "Unavailable",
        details: "Live PageSpeed data could not be fetched right now.",
      });
    }

    const sections: AuditSectionWithInclusion[] = [
      { id: "seo", title: "SEO", score: buildScore(seoChecks), checks: seoChecks },
      { id: "technical", title: "Technical", score: buildScore(technicalChecks), checks: technicalChecks },
      { id: "social", title: "Social", score: buildScore(socialChecks), checks: socialChecks },
      { id: "performance", title: "Performance", score: buildScore(performanceChecks), checks: performanceChecks },
      { id: "usability", title: "Usability & Design", score: buildScore(usabilityChecks), checks: usabilityChecks },
      { id: "page-speed", title: "Google PageSpeed", score: pageSpeedMobile ? buildScore(pageSpeedChecks) : 0, checks: pageSpeedChecks, includeInOverall: Boolean(pageSpeedMobile) },
    ];

    const includedSections = sections.filter((section) => section.includeInOverall !== false);
    const overallScore = Math.round(includedSections.reduce((sum, section) => sum + section.score, 0) / includedSections.length);

    return NextResponse.json({
      success: true,
      result: {
        requestedUrl: body.url ?? "",
        normalizedUrl: finalUrl,
        overallScore,
        responseTimeMs,
        pageSizeBytes,
        screenshotUrl: `https://image.thum.io/get/width/1400/noanimate/${encodeURIComponent(finalUrl)}`,
        sections,
        metrics: {
          title,
          metaDescription,
          canonical,
          favicon: favicon ? resolveUrl(finalUrl, favicon) : "",
          robotsMeta,
          robotsUrl,
          sitemapUrl,
          wordCount,
          h1Count,
          h2Count,
          schemaCount,
          imageCount: images.length,
          imagesWithoutAlt,
          imagesMissingDimensions: missingImageDimensions,
          internalLinks: links.internal,
          externalLinks: links.external,
          socialLinks: links.social,
          htmlLang,
          viewportPresent,
          buttonsCount,
          formsCount,
          labelsCount,
          inputCount,
        },
        pageSpeed: {
          mobile: pageSpeedMobile,
          desktop: pageSpeedDesktop,
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
