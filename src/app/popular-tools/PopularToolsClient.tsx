"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./popular-tools.module.css";
import type { ToolCategory, ToolItem, ToolCategoryId } from "@/lib/tools-catalog";

type PopularToolsClientProps = { categories: ToolCategory[]; tools: ToolItem[] };
type CategoryFilter = "all" | ToolCategoryId;

/* One warm family across every category, so the grid reads as one product
   rather than seven. Brand orange carries the SEO tools; the rest step away
   from it in hue without leaving the family. */
const categoryColors: Record<ToolCategoryId, readonly [string, string]> = {
  "developer-tools": ["#1c1917", "#44403c"],
  "text-tools": ["#7c2d12", "#c2410c"],
  "image-tools": ["#9a3412", "#f97316"],
  "pdf-tools": ["#991b1b", "#ea580c"],
  "seo-tools": ["#cc5500", "#ff8c00"],
  generators: ["#a16207", "#f59e0b"],
  "date-utility-tools": ["#292524", "#78716c"],
};

const slugAngle = (slug: string) => 115 + (Array.from(slug).reduce((acc, char) => acc + char.charCodeAt(0), 0) % 4) * 15;

const cardGradient = (tool: ToolItem) => {
  const [from, to] = categoryColors[tool.category] ?? categoryColors["developer-tools"];
  return `linear-gradient(${slugAngle(tool.slug)}deg, ${from}, ${to})`;
};

/* A few tools read better as a symbol than as initials. Everything else falls
   back to initials, so adding a tool never requires touching this map. */
const MONOGRAM_OVERRIDES: Record<string, string> = {
  "json-formatter": "{ }",
  "json-validator": "{✓}",
  "base64-encoder-decoder": "64",
  "url-encoder-decoder": "%",
  "regex-tester": ".*",
  "html-minifier": "</>",
  "css-minifier": "{;}",
  "javascript-minifier": "JS",
  "uuid-generator": "ID",
  "word-counter": "123",
  "character-counter": "abc",
  "case-converter": "Aa",
  "text-diff-checker": "±",
  "password-generator": "•••",
  "password-strength-checker": "•••",
  "qr-code-generator": "▦",
  "color-palette-generator": "◐",
  "gradient-generator": "▤",
  "image-compressor": "⤓",
  "image-resizer": "⤡",
  "image-crop-tool": "⌗",
  "blur-image-tool": "◍",
  "merge-pdf": "⧉",
  "split-pdf": "⧅",
  "compress-pdf": "⤓",
  "robots-txt-generator": "/*",
  "sitemap-generator": "⌗",
  "website-audit-tool": "◎",
  "keyword-density-checker": "%",
  "timestamp-converter": "⏱",
  "countdown-timer": "⏳",
  "time-zone-converter": "◷",
  "age-calculator": "⌛",
  "unit-converter": "⇄",
  "lorem-ipsum-generator": "¶",
  "markdown-editor": "M↓",
  "shopify-theme-generator": "⛭",
  "meta-video-downloader": "▶",
};

/** Initials from the tool name, capped at two characters. */
function monogramFor(tool: ToolItem): string {
  const override = MONOGRAM_OVERRIDES[tool.slug];
  if (override) return override;

  const words = tool.title
    .replace(/[()/]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !/^(to|and|the|for|of|a)$/i.test(word));

  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function ToolThumb({ tool, categoryTitle }: { tool: ToolItem; categoryTitle: string }) {
  return (
    <span className={styles.cardDesign} style={{ background: cardGradient(tool) }} aria-hidden="true">
      <span className={styles.thumbGlyph}>
        <CategoryIcon category={tool.category} />
      </span>
      <span className={styles.thumbMonogram}>{monogramFor(tool)}</span>
      <span className={styles.thumbLabel}>{categoryTitle}</span>
      <span className={styles.thumbBrand}>
        W3<em>TECH</em>
      </span>
    </span>
  );
}

function CategoryIcon({ category }: { category: ToolCategoryId }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (category) {
    case "developer-tools":
      return <svg viewBox="0 0 24 24" {...common}><path d="m8 4-5 8 5 8" /><path d="m16 4 5 8-5 8" /></svg>;
    case "text-tools":
      return <svg viewBox="0 0 24 24" {...common}><path d="M13 3H6v18h3v-7h3a5 5 0 0 0 0-10Z" /></svg>;
    case "image-tools":
      return <svg viewBox="0 0 24 24" {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m6 17 4-4 3 3 3-3 2 2" /></svg>;
    case "pdf-tools":
      return <svg viewBox="0 0 24 24" {...common}><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 16h6" /></svg>;
    case "seo-tools":
      return <svg viewBox="0 0 24 24" {...common}><circle cx="11" cy="11" r="7" /><path d="m20.5 20.5-4.4-4.4" /></svg>;
    case "generators":
      return <svg viewBox="0 0 24 24" {...common}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" /><path d="M19 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9Z" fill="currentColor" stroke="none" /></svg>;
    case "date-utility-tools":
      return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}

const benefits = [
  ["Start with the right tool", "Search and filter the collection to get from a task to a useful result without signing up."],
  ["Work with client websites", "Use the tools for research, content checks, technical reviews, and everyday delivery work."],
  ["Spot issues before they grow", "Run quick checks before a small content, performance, or technical issue becomes a bigger problem."],
  ["Keep workflows moving", "Each tool is designed for one clear job, with results you can use immediately."],
  ["Get expert help when needed", "Use the free tools first, then bring in our team for a production-ready solution."],
];

const faqs = [
  ["Are these tools really free?", "Yes. The tools listed here are available without a login, trial, or credit card."],
  ["Do I need to sign up before using a tool?", "No. Open a tool, provide the required input, and use the result immediately."],
  ["Can I use these tools for client work?", "Yes. They are designed for businesses, freelancers, agencies, and in-house teams. Only submit content and URLs you are authorized to use."],
  ["Which tool should I use first?", "Use the search field above to describe your task, then choose the tool that best matches your goal. Website Audit Tool is a practical starting point for a public website review."],
  ["What if I need a custom website, app, or Shopify theme?", "The tools provide a fast starting point. Our team can help plan, design, build, and maintain a complete production solution."],
  ["Will every result be perfect?", "Tools provide helpful automated output, but important business, legal, SEO, and technical decisions should always be reviewed by a qualified person."],
];

export default function PopularToolsClient({ categories, tools }: PopularToolsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const categoryTitleById = useMemo(() => new Map(categories.map((category) => [category.id, category.title])), [categories]);
  const visibleTools = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesSearch = !query || `${tool.title} ${tool.description}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, tools]);

  return <>
    <section className={styles.hero}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Popular Tools</span></nav>
        <div className={styles.heroContent}>
          <h1>Free Tools You&apos;ve <em>Been Looking For</em></h1>
          <p>No login, no trial, and no credit card required. Open any tool and get a useful result for your next project.</p>
          <div className={styles.heroActions}><a href="#tools" className={styles.primaryHeroButton}>Show Me the Tools <span>→</span></a><Link href="/contact" className={styles.secondaryHeroButton}>Talk to an Expert</Link></div>
        </div>
      </div>
    </section>

    <section className={styles.searchSection}><div className="container">
      <div className={styles.searchHeading}><span className={styles.eyebrow}>Find the right tool</span><h2>What Do You Need Right Now?</h2></div>
      <div className={styles.searchWrapper}><svg aria-hidden="true" viewBox="0 0 24 24" className={styles.searchIcon}><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg><input type="search" className={styles.searchInput} placeholder='Try “audit”, “keyword”, “theme”, or “PDF”' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} /></div>
    </div></section>

    <section id="tools" className={styles.toolsSection}><div className="container">
      <div className={styles.toolsHeading}><div><span className={styles.eyebrow}>All free tools</span><h2>{tools.length} Free Tools — <em>No Login Needed</em></h2></div><p>Showing <strong>{visibleTools.length} free tools</strong> — no login required</p></div>
      <div className={styles.filters} role="tablist" aria-label="Tool categories"><button type="button" role="tab" aria-selected={activeCategory === "all"} className={activeCategory === "all" ? styles.filterActive : styles.filterButton} onClick={() => setActiveCategory("all")}>All Tools</button>{categories.map((category) => <button key={category.id} type="button" role="tab" aria-selected={activeCategory === category.id} className={activeCategory === category.id ? styles.filterActive : styles.filterButton} onClick={() => setActiveCategory(category.id)}>{category.title}</button>)}</div>
      {visibleTools.length ? <div className={styles.grid} aria-label="Tools">{visibleTools.map((tool) => <Link key={tool.slug} href={`/popular-tools/${tool.slug}`} className={styles.card}><ToolThumb tool={tool} categoryTitle={categoryTitleById.get(tool.category) ?? "Tools"} /><span className={styles.cardCategory}>{(categoryTitleById.get(tool.category) ?? "Tools").toUpperCase()}</span><h3>{tool.title}</h3><p>{tool.description}</p><span className={styles.cardAction}>Use Tool <b aria-hidden="true">→</b></span></Link>)}</div> : <div className={styles.emptyState}><strong>No tools match your search.</strong><span>Try a different keyword or browse all tools above.</span></div>}
    </div></section>

    <section className={styles.whySection}><div className="container"><div className={styles.whyGrid}>
      <div><span className={styles.eyebrow}>Why use our free tools</span><h2>Useful answers first. <em>Expert help when you need it.</em></h2><p>Free tools should help you get unstuck, not lead to a signup wall. We build focused utilities around real tasks our team handles for websites, SEO, e-commerce, and digital products.</p><p>Use them as often as you need. When the work needs strategy, custom design, or implementation, our specialists are ready to help.</p></div>
      <div className={styles.benefitList}>{benefits.map(([title, description]) => <article key={title} className={styles.benefit}><span aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </div></div></section>

    <section className={styles.faqSection}><div className="container"><span className={styles.eyebrow}>FAQs</span><h2>Everything You Need to Know About <em>Our Free Tools</em></h2><div className={styles.faqGrid}>{faqs.map(([question, answer]) => <details key={question} className={styles.faqItem}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className={styles.ctaSection}><div className="container"><div className={styles.ctaContent}><h2>Tools Are Great But <em>Strategy Is Better.</em></h2><p>Get experienced help with website design, development, SEO, e-commerce, mobile apps, and AI solutions.</p><Link href="/contact" className={styles.primaryHeroButton}>Talk to Our Team <span>→</span></Link></div></div></section>
  </>;
}
