"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./popular-tools.module.css";
import type { ToolCategory, ToolItem, ToolCategoryId } from "@/lib/tools-catalog";

type PopularToolsClientProps = {
  categories: ToolCategory[];
  tools: ToolItem[];
};

type CategoryFilter = "all" | ToolCategoryId;

const TOOL_ICON_MAP: Record<string, { iconClass: string; color: string }> = {
  "json-formatter": { iconClass: "fa-solid fa-code", color: "#2563eb" },
  "json-validator": { iconClass: "fa-solid fa-square-check", color: "#2563eb" },
  "base64-encoder-decoder": { iconClass: "fa-solid fa-right-left", color: "#0f766e" },
  "url-encoder-decoder": { iconClass: "fa-solid fa-link", color: "#0284c7" },
  "regex-tester": { iconClass: "fa-solid fa-magnifying-glass", color: "#7c3aed" },
  "html-minifier": { iconClass: "fa-brands fa-html5", color: "#ea580c" },
  "css-minifier": { iconClass: "fa-brands fa-css3-alt", color: "#2563eb" },
  "javascript-minifier": { iconClass: "fa-brands fa-js", color: "#ca8a04" },
  "uuid-generator": { iconClass: "fa-solid fa-fingerprint", color: "#475569" },
  "api-response-viewer": { iconClass: "fa-solid fa-server", color: "#1d4ed8" },
  "word-counter": { iconClass: "fa-solid fa-file-lines", color: "#2563eb" },
  "character-counter": { iconClass: "fa-solid fa-font", color: "#7c3aed" },
  "case-converter": { iconClass: "fa-solid fa-arrow-down-a-z", color: "#2563eb" },
  "text-diff-checker": { iconClass: "fa-solid fa-code-compare", color: "#0f766e" },
  "remove-duplicate-lines": { iconClass: "fa-solid fa-filter-circle-xmark", color: "#dc2626" },
  "text-sorter": { iconClass: "fa-solid fa-arrow-down-wide-short", color: "#0284c7" },
  "markdown-editor": { iconClass: "fa-brands fa-markdown", color: "#111827" },
  "random-text-generator": { iconClass: "fa-solid fa-shuffle", color: "#9333ea" },
  "lorem-ipsum-generator": { iconClass: "fa-solid fa-paragraph", color: "#6366f1" },
  "password-generator": { iconClass: "fa-solid fa-key", color: "#d97706" },
  "image-compressor": { iconClass: "fa-solid fa-file-image", color: "#2563eb" },
  "image-resizer": { iconClass: "fa-solid fa-up-right-and-down-left-from-center", color: "#0284c7" },
  "image-converter": { iconClass: "fa-solid fa-repeat", color: "#7c3aed" },
  "image-crop-tool": { iconClass: "fa-solid fa-crop-simple", color: "#0f766e" },
  "background-remover": { iconClass: "fa-solid fa-eraser", color: "#dc2626" },
  "screenshot-to-image": { iconClass: "fa-solid fa-camera", color: "#2563eb" },
  "blur-image-tool": { iconClass: "fa-solid fa-droplet", color: "#6366f1" },
  "watermark-tool": { iconClass: "fa-solid fa-stamp", color: "#0284c7" },
  "pdf-to-word": { iconClass: "fa-solid fa-file-word", color: "#2563eb" },
  "word-to-pdf": { iconClass: "fa-solid fa-file-pdf", color: "#dc2626" },
  "merge-pdf": { iconClass: "fa-solid fa-file-circle-plus", color: "#0f766e" },
  "split-pdf": { iconClass: "fa-solid fa-scissors", color: "#ea580c" },
  "compress-pdf": { iconClass: "fa-solid fa-file-zipper", color: "#9333ea" },
  "pdf-page-extractor": { iconClass: "fa-solid fa-file-export", color: "#2563eb" },
  "pdf-password-remover": { iconClass: "fa-solid fa-unlock", color: "#ca8a04" },
  "meta-tag-generator": { iconClass: "fa-solid fa-tags", color: "#2563eb" },
  "robots-txt-generator": { iconClass: "fa-solid fa-robot", color: "#0f766e" },
  "sitemap-generator": { iconClass: "fa-solid fa-sitemap", color: "#0284c7" },
  "keyword-density-checker": { iconClass: "fa-solid fa-chart-column", color: "#7c3aed" },
  "website-audit-tool": { iconClass: "fa-solid fa-globe", color: "#2563eb" },
  "website-screenshot-tool": { iconClass: "fa-solid fa-window-maximize", color: "#0284c7" },
  "open-graph-preview-tool": { iconClass: "fa-solid fa-share-nodes", color: "#0f766e" },
  "qr-code-generator": { iconClass: "fa-solid fa-qrcode", color: "#111827" },
  "color-palette-generator": { iconClass: "fa-solid fa-palette", color: "#9333ea" },
  "gradient-generator": { iconClass: "fa-solid fa-fill-drip", color: "#2563eb" },
  "fake-user-generator": { iconClass: "fa-solid fa-user-secret", color: "#475569" },
  "random-name-generator": { iconClass: "fa-solid fa-signature", color: "#0284c7" },
  "invoice-generator": { iconClass: "fa-solid fa-file-invoice-dollar", color: "#0f766e" },
  "password-strength-checker": { iconClass: "fa-solid fa-shield-halved", color: "#ca8a04" },
  "age-calculator": { iconClass: "fa-solid fa-cake-candles", color: "#d97706" },
  "timestamp-converter": { iconClass: "fa-solid fa-clock", color: "#2563eb" },
  "countdown-timer": { iconClass: "fa-solid fa-stopwatch", color: "#7c3aed" },
  "time-zone-converter": { iconClass: "fa-solid fa-earth-americas", color: "#0284c7" },
  "unit-converter": { iconClass: "fa-solid fa-ruler-combined", color: "#0f766e" },
};

export default function PopularToolsClient({ categories, tools }: PopularToolsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const visibleTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        `${tool.title} ${tool.description} ${tool.slug}`.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, tools]);

  const activeTitle =
    activeCategory === "all"
      ? "All Tools"
      : categories.find((category) => category.id === activeCategory)?.title ?? "Tools";

  return (
    <div className={styles.browser}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Tool Categories</div>
        <button
          type="button"
          className={`${styles.sidebarButton} ${activeCategory === "all" ? styles.sidebarButtonActive : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All tools
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`${styles.sidebarButton} ${activeCategory === category.id ? styles.sidebarButtonActive : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.title}
          </button>
        ))}
      </aside>

      <section className={styles.directory}>
        <div className={styles.directoryHead}>
          <span className={styles.directoryEyebrow}>Free utilities</span>
          <h1 className={styles.directoryTitle}>{activeTitle}</h1>
          <p className={styles.directorySubtitle}>
            Explore {visibleTools.length} ready-to-use tools in a cleaner directory layout built for quick browsing.
          </p>
          <div className={styles.searchBarWrap}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools..."
              className={styles.searchBar}
            />
          </div>
        </div>

        {visibleTools.length ? (
          <div className={styles.toolsGrid}>
            {visibleTools.map((tool) => (
              <Link key={tool.slug} href={`/popular-tools/${tool.slug}`} className={styles.toolCard}>
                <div className={styles.toolCardTop}>
                  <div className={styles.toolIconWrap}>
                    <i
                      className={`${TOOL_ICON_MAP[tool.slug]?.iconClass ?? "fa-solid fa-screwdriver-wrench"} ${styles.toolIcon}`}
                      style={{ color: TOOL_ICON_MAP[tool.slug]?.color ?? "#2563eb" }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles.toolArrow} aria-hidden="true">
                    &#8594;
                  </div>
                </div>
                <h2 className={styles.toolTitle}>{tool.title}</h2>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>No tools match your search.</div>
        )}
      </section>
    </div>
  );
}
