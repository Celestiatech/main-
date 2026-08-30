import type { ExtractedSite } from "./types";

function esc(value: string): string {
  return (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function img(src: string | undefined, alt: string, className = ""): string {
  if (!src) return "";
  return `<img class="${className}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`;
}

/**
 * Renders the generated sections as standalone HTML, using the same markup and
 * CSS the Liquid emits. Shown in a sandboxed iframe so the merchant can see the
 * layout before uploading, without a Shopify store.
 *
 * Images still point at their source URLs here — the downloaded copies only
 * resolve once the theme is installed and asset_url can be evaluated.
 */
export function buildPreviewHtml(site: ExtractedSite, themeCss: string): string {
  const hero = site.hero;
  const iwt = site.imageWithText;
  const cards = site.featured?.cards ?? [];
  const quotes = site.testimonials?.items ?? [];
  const faq = site.faq?.items ?? [];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(site.brand)} — theme preview</title>
<style>${themeCss}
body { -webkit-text-size-adjust: 100%; }
.preview-note { background: #fff7ed; border-bottom: 1px solid #fed7aa; color: #7c2d12; font-size: 12px; padding: 8px 16px; text-align: center; }
</style>
</head>
<body>
<p class="preview-note">Generated theme preview — Shopify supplies the real cart, checkout, and product data.</p>

<header class="site-header">
  <div class="wrapper site-header__inner">
    <a class="site-header__brand" href="#">
      ${site.header.logo ? img(site.header.logo.src, site.brand, "site-header__logo") : esc(site.brand)}
    </a>
    <nav class="site-header__nav">
      ${site.header.links.map((link) => `<a href="#">${esc(link.label)}</a>`).join("")}
    </nav>
    <a class="site-header__cart" href="#">Cart (0)</a>
  </div>
</header>

<main>
  <section class="hero">
    <div class="wrapper hero__inner">
      <div class="hero__text">
        <h1>${esc(hero?.heading || "Your headline here")}</h1>
        <p>${esc(hero?.subheading || "Describe what you sell in a sentence.")}</p>
        <a class="button" href="#">${esc(hero?.ctaLabel || "Shop now")}</a>
      </div>
      ${hero?.image ? `<div class="hero__media">${img(hero.image.src, hero.heading)}</div>` : ""}
    </div>
  </section>

  ${
    iwt
      ? `<section class="image-with-text">
    <div class="wrapper image-with-text__inner">
      <div class="image-with-text__media">${img(iwt.image?.src, iwt.heading)}</div>
      <div class="image-with-text__content">
        <h2>${esc(iwt.heading)}</h2>
        <div class="rte"><p>${esc(iwt.body)}</p></div>
      </div>
    </div>
  </section>`
      : ""
  }

  <section class="featured">
    <div class="wrapper">
      <h2>${esc(site.featured?.heading || "Featured")}</h2>
      <div class="featured__grid">
        ${
          cards.length
            ? cards
                .map(
                  (card) => `<article class="card">
          ${img(card.image?.src, card.title)}
          <h3>${esc(card.title)}</h3>
          <p>${esc(card.body)}</p>
        </article>`
                )
                .join("")
            : `<article class="card"><h3>Product title</h3><p>Connect a collection in the theme editor.</p></article>`
        }
      </div>
    </div>
  </section>

  <section class="testimonials">
    <div class="wrapper">
      <h2>${esc(site.testimonials?.heading || "What our customers say")}</h2>
      <div class="testimonials__grid">
        ${
          quotes.length
            ? quotes
                .map(
                  (quote) =>
                    `<blockquote><p>${esc(quote.quote)}</p>${
                      quote.author ? `<cite>${esc(quote.author)}</cite>` : ""
                    }</blockquote>`
                )
                .join("")
            : `<blockquote><p>Add a customer quote here.</p><cite>Customer name</cite></blockquote>`
        }
      </div>
    </div>
  </section>

  <section class="faq">
    <div class="wrapper">
      <h2>${esc(site.faq?.heading || "Frequently asked questions")}</h2>
      ${
        faq.length
          ? faq
              .map(
                (item) =>
                  `<details><summary>${esc(item.question)}</summary><div class="rte"><p>${esc(
                    item.answer
                  )}</p></div></details>`
              )
              .join("")
          : `<details><summary>Add a question</summary><div class="rte"><p>Add an answer</p></div></details>`
      }
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="wrapper site-footer__inner">
    <nav class="site-footer__nav">
      ${site.footer.links.map((link) => `<a href="#">${esc(link.label)}</a>`).join("")}
    </nav>
    <p class="site-footer__legal">${esc(site.footer.copyright)}</p>
  </div>
</footer>
</body>
</html>`;
}
