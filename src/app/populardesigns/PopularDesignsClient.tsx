"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type Category = {
  href: string;
  label: string;
};

type Project = {
  category: string;
  href: string;
  localHref: string;
  image: string;
  title: string;
};

type PopularDesignsClientProps = {
  categories: Category[];
  projects: Project[];
};

export function PopularDesignsClient({ categories, projects }: PopularDesignsClientProps) {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return projects;
    }

    return projects.filter((project) => {
      return (
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [projects, query]);

  return (
    <>
      <div className={styles.filterWrap}>
        {categories.map((category, index) => (
          <Link
            key={`${category.label}-${category.href}`}
            href={category.href}
            className={index === 0 ? `${styles.filterChip} ${styles.filterChipActive}` : styles.filterChip}
            target="_blank"
          >
            {category.label}
          </Link>
        ))}
      </div>

      <div className={styles.searchWrap}>
        <label className={styles.searchLabel} htmlFor="premium-theme-search">
          Search Themes
        </label>
        <input
          id="premium-theme-search"
          className={styles.searchInput}
          type="search"
          placeholder="Search by theme name..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className={styles.sectionHead}>
        <div>
          <h2>Premium Theme Catalog</h2>
          <p>Same reference projects and preview images, now arranged as a premium theme selection in our template style.</p>
        </div>
        <div className={styles.countBadge}>{filteredProjects.length} premium themes</div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <article key={`${project.href}-${project.title}`} className={styles.card}>
              <div className={styles.cardMedia}>
                <img src={project.image} alt={project.title} className={styles.cardImage} loading="lazy" />
                <div className={styles.cardOverlay} />
                <span className={styles.cardBadge}>{project.category}</span>
              </div>

              <div className={styles.cardBody}>
                <h3>{project.title}</h3>
                <div className={styles.cardActions}>
                  <Link href={project.localHref} target="_blank" className={styles.primaryButton}>
                    Live Preview
                  </Link>
                  <Link href="/contact" className={styles.secondaryButton}>
                    Choose Theme
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          No premium themes matched <strong>{query}</strong>.
        </div>
      )}
    </>
  );
}
