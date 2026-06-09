"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
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

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Team Members" },
];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue} ref={ref}>
        {count}{suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function PortfolioCard({ study, index, onImageHover }: { study: CaseStudy; index: number; onImageHover: (src: string | null) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${x * 12}deg`);
    card.style.setProperty("--tilt-y", `${y * -12}deg`);
    card.style.setProperty("--glow-x", `${(e.clientX - rect.left) / rect.width * 100}%`);
    card.style.setProperty("--glow-y", `${(e.clientY - rect.top) / rect.height * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", `0deg`);
    card.style.setProperty("--tilt-y", `0deg`);
  }, []);

  const handleImageEnter = useCallback(() => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => onImageHover(study.panelImage), 200);
  }, [onImageHover, study.panelImage]);

  const handleImageLeave = useCallback(() => {
    clearTimeout(hoverTimer.current);
    onImageHover(null);
  }, [onImageHover]);

  return (
    <article
      ref={cardRef}
      className={styles.gridCard}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={study.url} target="_blank" rel="noopener noreferrer" className={styles.cardImageLink}>
        <div className={styles.cardImageWrapper} onMouseEnter={handleImageEnter} onMouseLeave={handleImageLeave}>
          <Image
            src={study.panelImage}
            alt={study.title}
            fill
            className={styles.cardImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.cardOverlay} />
          <div className={styles.cardGlow} />
          <div className={styles.cardImageHint}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      </Link>
      <div className={styles.cardContent}>
        <div className={styles.cardBadges}>
          <span className={styles.categoryBadge}>{study.categoryBadge}</span>
          <span className={styles.accentBadge}>{study.accent}</span>
        </div>
        <h3 className={styles.cardTitle}>{study.title}</h3>
        <p className={styles.cardDescription}>{study.subtitle}</p>
        <div className={styles.cardFooter}>
          <Link href={study.url} target="_blank" rel="noopener noreferrer" className={styles.viewMore}>
            {study.ctaLabel} →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [filterChanged, setFilterChanged] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const filteredStudies = useMemo(() => {
    if (activeFilter === "all") return CASE_STUDIES;
    return CASE_STUDIES.filter((study) => study.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    setFilterChanged(true);
    const timer = setTimeout(() => setFilterChanged(false), 500);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  useEffect(() => {
    const tabs = tabsRef.current;
    const indicator = indicatorRef.current;
    if (!tabs || !indicator) return;
    const activeBtn = tabs.querySelector(`[data-active="true"]`) as HTMLButtonElement | null;
    if (activeBtn) {
      indicator.style.width = `${activeBtn.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
    }
  }, [activeFilter]);

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.bgMesh} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Our Work</span>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Portfolio</span>
          </h2>
          <p className={styles.subtitle}>
            Explore our latest projects and see how we&apos;ve helped clients succeed with innovative solutions and proven results.
          </p>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterTabs} ref={tabsRef} role="tablist" aria-label="Portfolio filters">
            <span className={styles.activeIndicator} ref={indicatorRef} />
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                role="tab"
                data-active={activeFilter === filter.value}
                aria-selected={activeFilter === filter.value}
                className={`${styles.filterBtn} ${activeFilter === filter.value ? styles.filterBtnActive : ""}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredStudies.length === 0 ? (
          <div className={styles.empty}>No case studies available for this category yet.</div>
        ) : (
          <div className={`${styles.cardsGrid} ${filterChanged ? styles.cardsGridAnimating : ""}`}>
            {filteredStudies.map((study, index) => (
              <PortfolioCard key={study.title} study={study} index={index} onImageHover={setLightboxSrc} />
            ))}
          </div>
        )}

        {lightboxSrc && (
          <div
            className={styles.lightbox}
            onMouseEnter={() => setLightboxSrc(lightboxSrc)}
            onMouseLeave={() => setLightboxSrc(null)}
            onClick={() => setLightboxSrc(null)}
          >
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <Image
                src={lightboxSrc}
                alt="Portfolio preview"
                fill
                className={styles.lightboxImage}
                sizes="90vw"
                priority
              />
            </div>
            <button className={styles.lightboxClose} onClick={() => setLightboxSrc(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>
          </div>
        )}

        <div className={styles.ctaRow}>
          <Link href="/portfolio" className={styles.ctaButton}>
            View All Projects
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
