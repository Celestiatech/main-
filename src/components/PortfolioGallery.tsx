"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GROCITO_PORTFOLIO_ITEMS } from "@/lib/grocitoPortfolio";
import styles from "./portfolio-gallery.module.css";

type Category = "all" | "mobile" | "web" | "game" | "blockchain" | "ai";

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [filteredItems, setFilteredItems] = useState(GROCITO_PORTFOLIO_ITEMS);
  const containerRef = useRef<HTMLDivElement>(null);

  const filters: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "Mobile", value: "mobile" },
    { label: "Web", value: "web" },
    { label: "Game", value: "game" },
    { label: "Blockchain", value: "blockchain" },
    { label: "AI", value: "ai" },
  ];

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(GROCITO_PORTFOLIO_ITEMS);
    } else {
      setFilteredItems(GROCITO_PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section className={styles.portfolioSection}>
      <div className="container">
        <div className={styles.intro}>
          <h2 className={styles.title}>Our Portfolio — Results That Speak</h2>
          <p className={styles.subtitle}>Explore our success stories and delivered projects</p>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterTabs}>
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`${styles.filterBtn} ${activeFilter === filter.value ? styles.filterBtnActive : ""}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.stackedContainer} ref={containerRef}>
          <div className={styles.stackedScroll}>
            {filteredItems.map((item, index) => (
              <article key={item.title} className={styles.stackedCard} style={{ zIndex: filteredItems.length - index }}>
                <Link href={item.url} target="_blank" rel="noreferrer" className={styles.cardLink}>
                  <div className={styles.cardImageWrapper}>
                    <Image src={item.image} alt={item.title} fill className={styles.cardImage} sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className={styles.cardOverlay} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <span className={styles.cardCta}>Visit Project →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
