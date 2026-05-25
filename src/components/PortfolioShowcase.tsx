"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/lib/grocitoPortfolio";
import styles from "./portfolio-showcase.module.css";

type Category = "all" | CaseStudy["category"];

const FILTERS: Array<{ label: string; value: Category }> = [
  { label: "All", value: "all" },
  { label: "Mobile", value: "mobile" },
  { label: "Web", value: "web" },
  { label: "Game", value: "game" },
  { label: "Design", value: "design" },
  { label: "Blockchain", value: "blockchain" },
  { label: "AI", value: "ai" },
  { label: "No-Code", value: "nocode" },
];

export function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filteredStudies = useMemo(() => {
    if (activeFilter === "all") {
      return CASE_STUDIES;
    }

    return CASE_STUDIES.filter((study) => study.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className={styles.portfolioSection}>
      <div className="container">
        <div className={styles.intro}>
          <h2 className={styles.title}>Portfolio</h2>
          <p className={styles.subtitle}>
            Explore our latest projects and see how we've helped clients succeed with innovative solutions and proven results.
          </p>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterTabs} role="tablist" aria-label="Portfolio filters">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.value}
                className={`${styles.filterBtn} ${activeFilter === filter.value ? styles.filterBtnActive : ""}`}
                onClick={() => {
                  setActiveFilter(filter.value);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredStudies.length === 0 ? (
          <div className={styles.empty}>No case studies available for this category yet.</div>
        ) : (
          <div className={styles.cardsGrid}>
            {filteredStudies.map((study, index) => (
              <Link href={`/portfolio/case-studies/${study.category}`} key={study.title}>
                <article className={styles.gridCard}>
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={study.panelImage}
                      alt={study.title}
                      fill
                      className={styles.cardImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                      priority={index < 3}
                    />
                    <div className={styles.cardOverlay} />
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.cardBadges}>
                      <span className={styles.categoryBadge}>{study.categoryBadge}</span>
                      <span className={styles.accentBadge}>{study.accent}</span>
                    </div>
                    
                    <h3 className={styles.cardTitle}>{study.title}</h3>
                    <p className={styles.cardDescription}>{study.subtitle}</p>
                    
                    <div className={styles.cardFooter}>
                      <span className={styles.viewMore}>View Project →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
