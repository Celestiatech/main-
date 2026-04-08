"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const filteredStudies = useMemo(() => {
    if (activeFilter === "all") {
      return CASE_STUDIES;
    }

    return CASE_STUDIES.filter((study) => study.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const animateProgress = () => {
      const current = progressRef.current;
      const target = targetProgressRef.current;
      const delta = target - current;

      if (Math.abs(delta) < 0.001) {
        progressRef.current = target;
        setScrollProgress(target);
        animationFrameRef.current = null;
        return;
      }

      const next = current + delta * 0.14;
      progressRef.current = next;
      setScrollProgress(next);
      animationFrameRef.current = window.requestAnimationFrame(animateProgress);
    };

    const handleWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section || !viewport || window.innerWidth <= 768) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const stickyTop = 108;
      const isPinnedZone = rect.top <= stickyTop + 20 && rect.bottom >= stickyTop + 360;
      const isReverseAligned = rect.top >= stickyTop - 28;

      if (!isPinnedZone) {
        return;
      }

      const direction = Math.sign(event.deltaY);
      const currentProgress = targetProgressRef.current;
      const step = Math.min(Math.abs(event.deltaY) / Math.max(filteredStudies.length * 900, 3200), 0.06);

      if (direction > 0 && currentProgress < 1) {
        event.preventDefault();
        targetProgressRef.current = Math.min(1, currentProgress + step);
        if (animationFrameRef.current === null) {
          animationFrameRef.current = window.requestAnimationFrame(animateProgress);
        }
        return;
      }

      if (direction < 0 && currentProgress > 0) {
        if (!isReverseAligned && currentProgress < 0.08) {
          return;
        }

        event.preventDefault();
        targetProgressRef.current = Math.max(0, currentProgress - step);
        if (animationFrameRef.current === null) {
          animationFrameRef.current = window.requestAnimationFrame(animateProgress);
        }
      }
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [filteredStudies.length]);

  const activeIndex = filteredStudies.length > 1 ? scrollProgress * (filteredStudies.length - 1) : 0;

  return (
    <section ref={sectionRef} className={styles.portfolioSection}>
      <div className="container">
        <div className={styles.intro}>
          <h2 className={styles.title}>Featured Case Studies</h2>
          <p className={styles.subtitle}>
            A smoother layered showcase inspired by the stacked ChicMic feel, rebuilt here with local assets and a
            cleaner product-led presentation.
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
                  progressRef.current = 0;
                  targetProgressRef.current = 0;
                  setScrollProgress(0);
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
          <div className={styles.cardsContainer}>
            <div ref={viewportRef} className={styles.cardsViewport}>
              {filteredStudies.map((study, index) => (
                <article
                  key={study.title}
                  className={styles.caseCard}
                  style={
                    {
                      "--card-translate-y": `${getCardTranslateY(index, activeIndex)}px`,
                      "--card-scale": getCardScale(index, activeIndex).toString(),
                      "--card-opacity": getCardOpacity(index, activeIndex).toString(),
                      zIndex: getCardZIndex(index, activeIndex, filteredStudies.length),
                      pointerEvents: Math.abs(index - activeIndex) < 0.85 ? "auto" : "none",
                    } as CSSProperties
                  }
                >
                  <div className={styles.cardInner}>
                    <div className={styles.panelMedia}>
                      <Image
                        src={study.panelImage}
                        alt={study.title}
                        fill
                        className={styles.panelImage}
                        sizes="(max-width: 768px) 100vw, 1120px"
                        priority={index === 0}
                      />
                      <div className={styles.panelOverlay} />
                    </div>

                    <div className={styles.panelContent}>
                      <div className={styles.panelTop}>
                        <span className={styles.badge}>{study.categoryBadge}</span>
                        <span className={styles.accent}>{study.accent}</span>
                      </div>

                      <div className={styles.panelBody}>
                        <div className={styles.copyBlock}>
                          <p className={styles.kicker}>Selected Capability</p>
                          <h3 className={styles.caseTitle}>{study.title}</h3>
                          <p className={styles.caseSubtitle}>{study.subtitle}</p>
                          <p className={styles.summary}>{study.summary}</p>
                        </div>

                        <div className={styles.panelFooter}>
                          <div className={styles.progressMeta}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <span>{String(filteredStudies.length).padStart(2, "0")}</span>
                          </div>

                          <Link href={study.url} className={styles.ctaButton}>
                            {study.ctaLabel}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function getCardTranslateY(index: number, activeIndex: number) {
  const distance = index - activeIndex;

  if (distance <= -1) {
    return -48 - (Math.abs(distance) - 1) * 20;
  }

  if (distance <= 0) {
    return distance * 36;
  }

  if (distance <= 1) {
    return distance * 136;
  }

  return 136 + (distance - 1) * 52;
}

function getCardScale(index: number, activeIndex: number) {
  const distance = index - activeIndex;

  if (distance <= -1) {
    return 0.95;
  }

  if (distance <= 0) {
    return 1 + distance * 0.03;
  }

  if (distance <= 1) {
    return 0.9 + (1 - distance) * 0.08;
  }

  return Math.max(0.84, 0.9 - (distance - 1) * 0.03);
}

function getCardOpacity(index: number, activeIndex: number) {
  const distance = Math.abs(index - activeIndex);
  return Math.max(0.6, 1 - distance * 0.08);
}

function getCardZIndex(index: number, activeIndex: number, total: number) {
  const distance = index - activeIndex;
  const closeness = Math.max(0, 200 - Math.round(Math.abs(distance) * 100));
  const incomingBoost = distance > 0 && distance < 1 ? 250 : 0;

  return total * 10 + closeness + incomingBoost + index;
}
