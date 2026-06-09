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

export default function PopularToolsClient({ categories, tools }: PopularToolsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const categoryTitleById = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((category) => map.set(category.id, category.title));
    return map;
  }, [categories]);

  const visibleTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      if (!q) return matchesCategory;
      return matchesCategory &&
        (tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q));
    });
  }, [activeCategory, searchQuery, tools]);

  return (
    <div className="container">
      <section className={styles.hero}>
        <div className={styles.heroTopRow}>
          <div className={styles.eyebrow} aria-label="All free tools">
            <span className={styles.eyebrowDash} aria-hidden="true" />
            All free tools
          </div>
          <div className={styles.heroMeta}>
            Showing <strong>{visibleTools.length} free tools</strong> — no login required
          </div>
        </div>

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleStrong}>Free tools.</span>{" "}
          <span className={styles.heroTitleAccent}>Real results.</span>
        </h1>

        <div className={styles.filters} role="tablist" aria-label="Tool categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            className={`${styles.filterBtn} ${activeCategory === "all" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Tools
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`${styles.filterBtn} ${activeCategory === category.id ? styles.filterBtnActive : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className={styles.searchWrapper}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search tools by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {visibleTools.length ? (
        <section className={styles.grid} aria-label="Tools">
          {visibleTools.map((tool) => (
            <Link key={tool.slug} href={`/popular-tools/${tool.slug}`} className={styles.card}>
              <div className={styles.cardCategory}>
                {(categoryTitleById.get(tool.category) ?? "Tools").toUpperCase()}
              </div>
              <h2 className={styles.cardTitle}>{tool.title}</h2>
              <p className={styles.cardDesc}>{tool.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.freePill}>Free</span>
                <span className={styles.useTool}>
                  Use Tool <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div className={styles.emptyState}>No tools in this category yet.</div>
      )}
    </div>
  );
}
