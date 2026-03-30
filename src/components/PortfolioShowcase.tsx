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
  { label: "Blockchain", value: "blockchain" },
  { label: "AI", value: "ai" },
  { label: "Design", value: "design" },
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
    progressRef.current = 0;
    targetProgressRef.current = 0;
    setScrollProgress(0);
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
      const stickyTop = 112;
      const isPinnedZone = rect.top <= stickyTop + 20 && rect.bottom >= stickyTop + 320;
      const isReverseAligned = rect.top >= stickyTop - 28;

      if (!isPinnedZone) {
        return;
      }

      const direction = Math.sign(event.deltaY);
      const currentProgress = targetProgressRef.current;
      const step = Math.min(Math.abs(event.deltaY) / Math.max(filteredStudies.length * 900, 3200), 0.06);

      if (direction > 0 && currentProgress < 1) {
        event.preventDefault();
        const nextProgress = Math.min(1, currentProgress + step);
        targetProgressRef.current = nextProgress;
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
        const nextProgress = Math.max(0, currentProgress - step);
        targetProgressRef.current = nextProgress;
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
            Filter through selected launches to see the challenge, the build direction, and the measurable outcome.
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
          <div
            className={styles.cardsContainer}
            style={
              {
                "--stack-count": filteredStudies.length,
              } as CSSProperties
            }
          >
            <div ref={viewportRef} className={styles.cardsViewport}>
              {filteredStudies.map((study, index) => (
                <article
                  key={study.title}
                  className={styles.caseCard}
                  style={
                  {
                    "--card-translate-y": `${getCardTranslateY(index, activeIndex)}px`,
                    "--card-scale": getCardScale(index, activeIndex).toString(),
                    "--card-opacity": "1",
                    zIndex: getCardZIndex(index, activeIndex, filteredStudies.length),
                    pointerEvents: Math.abs(index - activeIndex) < 0.85 ? "auto" : "none",
                  } as CSSProperties
                }
              >
                  <div className={styles.cardInner}>
                    <div className={styles.beforeAfterSection}>
                      <div className={styles.beforeAfterGrid}>
                        <div className={styles.beforeBlock}>
                          <span className={styles.blockLabel}>Before</span>
                          <div className={styles.imageWrapper}>
                            <Image
                              src={study.beforeImage}
                              alt={`${study.title} before redesign`}
                              fill
                              className={styles.image}
                              sizes="(max-width: 1024px) 100vw, 30vw"
                            />
                          </div>
                        </div>

                        <div className={styles.afterBlock}>
                          <span className={styles.blockLabel}>After</span>
                          <div className={styles.imageWrapper}>
                            <Image
                              src={study.afterImage}
                              alt={`${study.title} after launch`}
                              fill
                              className={styles.image}
                              sizes="(max-width: 1024px) 100vw, 30vw"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.contentSection}>
                      <div>
                        <div className={styles.header}>
                          <span className={styles.badge}>{study.categoryBadge}</span>
                          <span className={styles.tech}>{study.mainTech}</span>
                        </div>

                        <h3 className={styles.caseTitle}>{study.title}</h3>
                        <p className={styles.caseSubtitle}>{study.subtitle}</p>

                        <div className={styles.problemSolution}>
                          <div className={styles.item}>
                            <h4>Problem</h4>
                            <p>{study.problem}</p>
                          </div>
                          <div className={styles.item}>
                            <h4>Solution</h4>
                            <p>{study.solution}</p>
                          </div>
                        </div>

                        <div className={styles.impacts}>
                          {study.impacts.map((impact) => (
                            <div key={`${study.title}-${impact.label}`} className={styles.impactItem}>
                              <div className={styles.impactLabel}>{impact.label}</div>
                              <div className={styles.impactValue}>{impact.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className={styles.techStack}>
                          {study.techStack.map((tech) => (
                            <span key={`${study.title}-${tech}`} className={styles.techTag}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link href={study.url} className={styles.ctaButton}>
                        Start a Similar Project
                      </Link>
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
    return -42 - (Math.abs(distance) - 1) * 18;
  }

  if (distance <= 0) {
    return distance * 34;
  }

  if (distance <= 1) {
    return distance * 180;
  }

  return 180 + (distance - 1) * 56;
}

function getCardScale(index: number, activeIndex: number) {
  const distance = index - activeIndex;

  if (distance <= -1) {
    return 0.93;
  }

  if (distance <= 0) {
    return 1 + distance * 0.04;
  }

  if (distance <= 1) {
    return 0.88 + (1 - distance) * 0.1;
  }

  return Math.max(0.8, 0.9 - (distance - 1) * 0.04);
}

function getCardZIndex(index: number, activeIndex: number, total: number) {
  const distance = index - activeIndex;
  const closeness = Math.max(0, 200 - Math.round(Math.abs(distance) * 100));
  const incomingBoost = distance > 0 && distance < 1 ? 250 : 0;

  return total * 10 + closeness + incomingBoost + index;
}
