import Link from "next/link";
import styles from "./popular-tools.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/tools-catalog";
import PopularToolsClient from "./PopularToolsClient";

export default function PopularToolsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.headerGap} aria-hidden="true" />

      <main className={styles.main}>
        <section className={styles.surface}>
          <div className={styles.hero}>
            <div className={styles.heroCopy}>
              <h1 className={styles.title}>Popular Tools</h1>
              <p className={styles.subtitle}>
                Fast utilities for developers, marketers, designers and teams - built to be simple, clean and ready to use.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.primaryButton}>
                  Start your project
                </Link>
                <Link href="/services" className={styles.secondaryButton}>
                  View all services
                </Link>
              </div>
            </div>

            <div className={styles.heroPanel} aria-hidden="true">
              <div className={styles.heroPanelInner}>
                <div className={styles.heroPanelTitle}>Tip</div>
                <div className={styles.heroPanelText}>Use search to jump to any tool instantly.</div>
              </div>
            </div>
          </div>

          <PopularToolsClient categories={TOOL_CATEGORIES} tools={TOOLS} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
