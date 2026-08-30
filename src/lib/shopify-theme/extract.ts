import * as cheerio from "cheerio";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { AnyNode } from "domhandler";
import type {
  ExtractedCard,
  ExtractedImage,
  ExtractedLink,
  ExtractedSite,
  FaqBlock,
  FeaturedBlock,
  HeroBlock,
  ImageWithTextBlock,
  TestimonialsBlock,
} from "./types";

const USER_AGENT =
  "Mozilla/5.0 (compatible; W3TechShopifyThemeGenerator/1.0; +https://www.w3tech.co.in)";

const NEUTRAL_COLORS = new Set([
  "#fff",
  "#ffffff",
  "#000",
  "#000000",
  "#eee",
  "#eeeeee",
  "#ccc",
  "#cccccc",
  "#f5f5f5",
  "#fafafa",
  "#333",
  "#333333",
]);

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("A website URL is required.");
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are supported.");
  }

  return url.toString();
}

export async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html" },
    redirect: "follow",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`The page returned HTTP ${response.status}. Check the URL and try again.`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("html")) {
    throw new Error("That URL did not return an HTML page.");
  }

  return response.text();
}

function clean(value: string | undefined | null): string {
  return (value || "").replace(/\s+/g, " ").trim();
}

function absolute(base: string, href: string | undefined): string {
  if (!href) return "";
  try {
    return new URL(href, base).toString();
  } catch {
    return "";
  }
}

function imageFrom($el: Cheerio<AnyNode>, base: string): ExtractedImage | undefined {
  const img = $el.find("img").first();
  if (!img.length) return undefined;

  // Lazy-loaded markup usually parks the real file in data-src / srcset.
  const raw =
    img.attr("src") ||
    img.attr("data-src") ||
    (img.attr("srcset") || "").split(",")[0]?.trim().split(" ")[0];

  const src = absolute(base, raw);
  if (!src || src.startsWith("data:")) return undefined;

  return { src, alt: clean(img.attr("alt")) || "Image from the source page" };
}

/** Nearest block-level ancestor, used to scope a heading to its own section. */
function sectionOf($: CheerioAPI, $el: Cheerio<AnyNode>): Cheerio<AnyNode> {
  const container = $el.closest("section, article, header, main > div, div[class]");
  return container.length ? container : $el.parent();
}

function extractLinks($: CheerioAPI, $scope: Cheerio<AnyNode>, base: string, limit: number): ExtractedLink[] {
  const links: ExtractedLink[] = [];
  const seen = new Set<string>();

  $scope.find("a").each((_, node) => {
    if (links.length >= limit) return;
    const $a = $(node);
    const label = clean($a.text());
    const href = absolute(base, $a.attr("href"));
    if (!label || !href || label.length > 40) return;
    const key = label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    links.push({ label, href });
  });

  return links;
}

function extractColors(html: string): ExtractedSite["colors"] {
  const counts = new Map<string, number>();

  for (const match of html.matchAll(/#[0-9a-f]{3,8}\b/gi)) {
    const hex = match[0].toLowerCase();
    if (hex.length !== 4 && hex.length !== 7) continue;
    if (NEUTRAL_COLORS.has(hex)) continue;
    counts.set(hex, (counts.get(hex) || 0) + 1);
  }

  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return {
    accent: ranked[0]?.[0] || "#cc5500",
    background: "#ffffff",
    text: "#1f2937",
  };
}

function extractHero($: CheerioAPI, base: string): HeroBlock | null {
  const h1 = $("h1").first();
  if (!h1.length) return null;

  const scope = sectionOf($, h1);
  const subheading =
    clean(h1.nextAll("p").first().text()) ||
    clean(scope.find("p").first().text()) ||
    clean($('meta[name="description"]').attr("content"));

  const cta = scope
    .find("a")
    .filter((_, node) => {
      const text = clean($(node).text());
      return Boolean(text) && text.length <= 30;
    })
    .first();

  return {
    heading: clean(h1.text()),
    subheading: subheading.slice(0, 240),
    image: imageFrom(scope, base),
    ctaLabel: clean(cta.text()) || undefined,
    ctaHref: absolute(base, cta.attr("href")) || undefined,
  };
}

function extractImageWithText($: CheerioAPI, base: string): ImageWithTextBlock | null {
  let found: ImageWithTextBlock | null = null;

  $("section, article").each((_, node) => {
    if (found) return;
    const $section = $(node);
    if ($section.find("img").length !== 1) return;

    const heading = clean($section.find("h2, h3").first().text());
    const body = clean($section.find("p").first().text());
    if (!heading || !body) return;

    found = { heading, body: body.slice(0, 400), image: imageFrom($section, base) };
  });

  return found;
}

/**
 * Finds the largest group of sibling elements that share a tag and class —
 * the shape almost every card grid, product row, and feature list is built from.
 */
function findRepeatedGroup($: CheerioAPI): Cheerio<AnyNode> | null {
  let best: { score: number; nodes: Cheerio<AnyNode> } | null = null;

  $("body *").each((_, node) => {
    const $parent = $(node);
    const children = $parent.children();
    if (children.length < 3) return;

    const signature = new Map<string, number>();
    children.each((__, child) => {
      const $child = $(child);
      const key = `${child.type === "tag" ? child.name : "?"}.${clean($child.attr("class"))}`;
      signature.set(key, (signature.get(key) || 0) + 1);
    });

    const [topKey, topCount] = [...signature.entries()].sort((a, b) => b[1] - a[1])[0];
    if (topCount < 3) return;

    const matching = children.filter((__, child) => {
      const $child = $(child);
      return `${child.type === "tag" ? child.name : "?"}.${clean($child.attr("class"))}` === topKey;
    });

    // Prefer groups that actually carry content, not bare layout wrappers.
    const withText = matching.filter((__, child) => clean($(child).text()).length > 20).length;
    if (withText < 3) return;

    if (!best || withText > best.score) {
      best = { score: withText, nodes: matching };
    }
  });

  return best ? (best as { nodes: Cheerio<AnyNode> }).nodes : null;
}

function extractFeatured($: CheerioAPI, base: string): FeaturedBlock | null {
  const group = findRepeatedGroup($);
  if (!group) return null;

  const cards: ExtractedCard[] = [];

  group.each((_, node) => {
    if (cards.length >= 6) return;
    const $card = $(node);
    const title = clean($card.find("h2, h3, h4, strong").first().text());
    if (!title) return;

    const body = clean($card.find("p").first().text()) || clean($card.text()).slice(0, 160);
    cards.push({
      title,
      body: body.slice(0, 200),
      image: imageFrom($card, base),
      href: absolute(base, $card.find("a").first().attr("href")) || undefined,
    });
  });

  if (cards.length < 3) return null;

  const heading = clean(group.parent().prevAll("h2, h3").first().text()) || "Featured";
  return { heading, cards };
}

function extractTestimonials($: CheerioAPI): TestimonialsBlock | null {
  const items: TestimonialsBlock["items"] = [];

  $("blockquote").each((_, node) => {
    if (items.length >= 4) return;
    const quote = clean($(node).text());
    if (quote.length < 20) return;
    items.push({ quote: quote.slice(0, 300), author: clean($(node).next().text()).slice(0, 60) });
  });

  if (!items.length) {
    const heading = $("h2, h3").filter((_, node) =>
      /testimonial|review|clients say|what our/i.test(clean($(node).text()))
    ).first();

    if (heading.length) {
      heading
        .parent()
        .find("p")
        .each((_, node) => {
          if (items.length >= 4) return;
          const quote = clean($(node).text());
          if (quote.length < 40) return;
          items.push({ quote: quote.slice(0, 300), author: "" });
        });
    }
  }

  return items.length ? { heading: "What our customers say", items } : null;
}

function extractFaq($: CheerioAPI): FaqBlock | null {
  const items: FaqBlock["items"] = [];

  $("details").each((_, node) => {
    if (items.length >= 6) return;
    const $details = $(node);
    const question = clean($details.find("summary").first().text());
    if (!question) return;
    const answer = clean($details.clone().children("summary").remove().end().text());
    items.push({ question, answer: answer.slice(0, 400) });
  });

  if (!items.length) {
    const heading = $("h2, h3").filter((_, node) =>
      /faq|frequently asked|questions/i.test(clean($(node).text()))
    ).first();

    if (heading.length) {
      let current = heading.next();
      while (current.length && items.length < 6) {
        const question = clean(current.filter("h3, h4").text());
        if (question) {
          items.push({ question, answer: clean(current.next("p").text()).slice(0, 400) });
        }
        current = current.next();
      }
    }
  }

  return items.length ? { heading: "Frequently asked questions", items } : null;
}

function buildWarnings($: CheerioAPI, html: string, site: Partial<ExtractedSite>): string[] {
  const warnings: string[] = [];
  const bodyText = clean($("body").text());

  if (bodyText.length < 600) {
    warnings.push(
      "This page returned very little server-rendered text, which usually means it builds its content with JavaScript. Only what is in the initial HTML could be converted."
    );
  }

  if (!site.hero) {
    warnings.push("No <h1> was found, so no hero section could be detected. A placeholder hero was generated instead.");
  }

  if (!site.featured) {
    warnings.push("No repeating card grid was detected, so the featured collection section was generated with placeholder content.");
  }

  if (/<form[^>]*(cart|checkout|add-to-cart)/i.test(html) || /add to cart/i.test(bodyText)) {
    warnings.push("Cart and checkout behaviour cannot be converted. Shopify supplies its own cart, checkout, and customer accounts.");
  }

  if ($("link[rel=stylesheet]").length > 0) {
    warnings.push(
      `The source page loads ${$("link[rel=stylesheet]").length} external stylesheet(s). The generated theme ships its own minimal CSS rather than copying them, so spacing and typography will need adjustment.`
    );
  }

  return warnings;
}

export function extractSite(html: string, sourceUrl: string): ExtractedSite {
  const $ = cheerio.load(html);

  // Scripts and styles only add noise to every text heuristic below.
  $("script, style, noscript, svg").remove();

  const brand =
    clean($('meta[property="og:site_name"]').attr("content")) ||
    clean($("title").text()).split(/[|–—-]/)[0].trim() ||
    new URL(sourceUrl).hostname;

  const headerScope = $("header").first().length ? $("header").first() : $("nav").first();
  const footerScope = $("footer").first();

  const partial: Partial<ExtractedSite> = {
    hero: extractHero($, sourceUrl),
    featured: extractFeatured($, sourceUrl),
  };

  return {
    sourceUrl,
    extractedAt: new Date().toISOString(),
    brand,
    title: clean($("title").text()) || brand,
    description:
      clean($('meta[name="description"]').attr("content")) ||
      clean($('meta[property="og:description"]').attr("content")),
    colors: extractColors(html),
    header: {
      logo: headerScope.length ? imageFrom(headerScope, sourceUrl) : undefined,
      links: headerScope.length ? extractLinks($, headerScope, sourceUrl, 6) : [],
    },
    hero: partial.hero ?? null,
    imageWithText: extractImageWithText($, sourceUrl),
    featured: partial.featured ?? null,
    testimonials: extractTestimonials($),
    faq: extractFaq($),
    footer: {
      links: footerScope.length ? extractLinks($, footerScope, sourceUrl, 8) : [],
      copyright:
        clean(footerScope.text()).match(/©[^.|]{0,80}/)?.[0] ||
        `© ${new Date().getFullYear()} ${brand}`,
    },
    warnings: buildWarnings($, html, partial),
  };
}
