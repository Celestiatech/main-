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

const CATEGORY_ICON_MAP: Record<ToolCategoryId, string> = {
  "developer-tools": "/images/hero-icons/code.svg",
  "text-tools": "/images/icons/concept.svg",
  "image-tools": "/images/hero-icons/palette.svg",
  "pdf-tools": "/images/icons/plan.svg",
  "seo-tools": "/images/icons/chart-growth.svg",
  generators: "/images/hero-icons/rocket.svg",
  "date-utility-tools": "/images/icons/clock-fast.svg",
};

export default function PopularToolsClient({ categories, tools }: PopularToolsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const visibleTools = useMemo(() => {
    if (activeCategory === "all") {
      return tools;
    }

    return tools.filter((tool) => tool.category === activeCategory);
  }, [activeCategory, tools]);

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
        </div>

        <div className={styles.toolsGrid}>
          {visibleTools.map((tool) => (
            <Link key={tool.slug} href={`/popular-tools/${tool.slug}`} className={styles.toolCard}>
              <div className={styles.toolCardTop}>
                <div className={styles.toolIconWrap}>
                  <img
                    src={CATEGORY_ICON_MAP[tool.category]}
                    alt=""
                    className={styles.toolIcon}
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
      </section>
    </div>
  );
}
