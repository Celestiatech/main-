import Link from "next/link";
import styles from "../page.module.css";

export default function WorkPage() {
  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h2>Our Work</h2>
        <p>A snapshot of recent projects and case studies.</p>
      </div>
      <div className={styles.projectsGrid}>
        <article className={styles.projectCard}>
          <h3>Grasshopper Soccer</h3>
          <p>Community sports website with enrolment and location search.</p>
        </article>
        <article className={styles.projectCard}>
          <h3>Zion Cases</h3>
          <p>Storefront with optimized product pages and streamlined checkout.</p>
        </article>
        <article className={styles.projectCard}>
          <h3>Finance Platform</h3>
          <p>Marketing site highlighting features, security and stories.</p>
        </article>
      </div>
      <div className={styles.heroActions}>
        <Link href="/contact" className={styles.primaryButton}>
          Start a project
        </Link>
        <Link href="/" className={styles.secondaryButton}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
