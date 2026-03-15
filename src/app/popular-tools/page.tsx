import Link from "next/link";
import styles from "./popular-tools.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { TOOL_CATEGORIES, getToolsByCategory } from "@/lib/tools-catalog";

export default function PopularToolsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.headerGap} aria-hidden="true" />

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h1>Popular Tools</h1>
            <p>Browse all tools and open each one on its own dedicated detail page.</p>
          </div>

          <div className={styles.categoryNav}>
            {TOOL_CATEGORIES.map((category) => (
              <a key={category.id} href={`#${category.id}`} className={styles.categoryChip}>
                {category.title}
              </a>
            ))}
          </div>

          {TOOL_CATEGORIES.map((category) => {
            const tools = getToolsByCategory(category.id);

            return (
            <section key={category.id} id={category.id} className={styles.categorySection}>
              <div className={styles.categoryHead}>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>

              <div className={styles.cardsGrid}>
                {tools.map((tool) => (
                  <article key={tool.slug} className={styles.card}>
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                    <div className={styles.cardMeta}>
                      <span className={`${styles.toolTag} ${tool.status === "live" ? styles.tagLive : styles.tagSoon}`}>
                        {tool.status === "live" ? "Live" : "Coming Soon"}
                      </span>
                      <Link href={`/popular-tools/${tool.slug}`} className={styles.viewLink}>
                        Open Tool
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            );
          })}

          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Start your project
            </Link>
            <Link href="/services" className={styles.secondaryButton}>
              View all services
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
