
"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GROCITO_PORTFOLIO_ITEMS, getPortfolioItemSlug } from "@/lib/grocitoPortfolio";

export default function WorkPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.eyebrow}>Our Work Directory</div>
              <h1>Every imported project, shown in one clean directory.</h1>
              <p>This page is intentionally different from `/portfolio`: simpler, faster to scan, and focused on showing all projects clearly.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.topBar}>
              <h2>All Projects</h2>
              <div className={styles.count}>{GROCITO_PORTFOLIO_ITEMS.length} live items</div>
            </div>

            <div className={styles.grid}>
              {GROCITO_PORTFOLIO_ITEMS.map((item) => (
                <article key={item.title} className={styles.card}>
                  <div className={styles.cardMedia}>
                    <Image src={item.image} alt={item.title} fill className={styles.cardImage} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <span className={styles.domain}>{item.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                      <span className={styles.visit}>Live Project</span>
                    </div>
                    <h3>{item.title}</h3>
                    <div className={styles.actions}>
                      <Link href={`/portfolio/${getPortfolioItemSlug(item)}`} className={styles.primaryButton}>
                        View Details
                      </Link>
                      <Link href={item.url} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
                        Open Live Site
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
