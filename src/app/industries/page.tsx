import Link from "next/link";
import styles from "../page.module.css";

export default function IndustriesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h2>Industries We Serve</h2>
        <p>We adapt our approach for different markets and audiences.</p>
      </div>
      <div className={styles.pills}>
        <span>Technology & SaaS</span>
        <span>E‑commerce</span>
        <span>Professional services</span>
        <span>Education</span>
        <span>Real estate</span>
        <span>Healthcare</span>
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
