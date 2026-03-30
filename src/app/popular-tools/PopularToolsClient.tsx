"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./popular-tools.module.css";
import type { ToolCategory, ToolItem } from "@/lib/tools-catalog";

type PopularToolsClientProps = {
  categories: ToolCategory[];
  tools: ToolItem[];
};

function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

function matchesQuery(tool: ToolItem, query: string) {
  const haystack = `${tool.title} ${tool.description} ${tool.slug}`.toLowerCase();
  return haystack.includes(query);
}

export default function PopularToolsClient({ categories, tools }: PopularToolsClientProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeQuery(query);

  const grouped = useMemo(() => {
    const filtered = normalizedQuery ? tools.filter((tool) => matchesQuery(tool, normalizedQuery)) : tools;

    return categories.map((category) => ({
      category,
      tools: filtered.filter((tool) => tool.category === category.id),
    }));
  }, [categories, tools, normalizedQuery]);

  const resultCount = useMemo(() => grouped.reduce((sum, group) => sum + group.tools.length, 0), [grouped]);

  const hasResults = resultCount > 0;

  return (
    <div className={styles.content}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <label className={styles.searchLabel} htmlFor="tool-search">
            Search tools
          </label>
          <div className={styles.searchRow}>
            <input
              id="tool-search"
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search JSON, PDF, sitemap, QR code…"
              autoComplete="off"
              inputMode="search"
            />
            {query ? (
              <button type="button" className={styles.clearButton} onClick={() => setQuery("")}>
                Clear
              </button>
            ) : null}
          </div>
          <p className={styles.searchHint}>
            {normalizedQuery ? (
              <>
                Showing <strong>{resultCount}</strong> result{resultCount === 1 ? "" : "s"} for{" "}
                <span className={styles.queryPill}>{query.trim()}</span>.
              </>
            ) : (
              <>
                Browse by category or use search. <strong>{tools.length}</strong> tools available.
              </>
            )}
          </p>
        </div>

        <nav className={styles.categoryNav} aria-label="Tool categories">
          {categories.map((category) => (
            <a key={category.id} href={`#${category.id}`} className={styles.categoryChip}>
              <span className={styles.categoryChipText}>{category.title}</span>
            </a>
          ))}
        </nav>
      </div>

      {!hasResults ? (
        <div className={styles.emptyCard} role="status" aria-live="polite">
          <h2 className={styles.emptyTitle}>No tools found</h2>
          <p className={styles.emptyText}>
            Try a different keyword, or browse categories below. You can search by name, description, or slug.
          </p>
          <button type="button" className={styles.primaryButton} onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      ) : null}

      <div className={styles.categories}>
        {grouped.map(({ category, tools: categoryTools }) => (
          <section key={category.id} id={category.id} className={styles.categorySection}>
            <div className={styles.categoryHead}>
              <div className={styles.categoryTitleRow}>
                <h2 className={styles.categoryTitle}>{category.title}</h2>
                <span className={styles.categoryCount}>{categoryTools.length}</span>
              </div>
              <p className={styles.categoryDesc}>{category.description}</p>
            </div>

            {categoryTools.length ? (
              <div className={styles.cardsGrid}>
                {categoryTools.map((tool) => (
                  <Link key={tool.slug} href={`/popular-tools/${tool.slug}`} className={styles.cardLink}>
                    <article className={styles.card}>
                      <div className={styles.cardTop}>
                        <span className={`${styles.toolTag} ${tool.status === "live" ? styles.tagLive : styles.tagSoon}`}>
                          {tool.status === "live" ? "Live" : "Coming Soon"}
                        </span>
                        <span className={styles.cardCta} aria-hidden="true">
                          Open →
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{tool.title}</h3>
                      <p className={styles.cardDesc}>{tool.description}</p>
                      <div className={styles.cardBottom}>
                        <span className={styles.slugPill}>{tool.slug}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.noMatchRow}>
                <span className={styles.noMatchText}>No matches in this category.</span>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

