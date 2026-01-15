import Link from "next/link";
import styles from "../page.module.css";

export default function TestimonialsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h2>Testimonials</h2>
        <p>What clients say about working with us.</p>
      </div>
      <div className={styles.testimonialsGrid}>
        <article className={styles.testimonialCard}>
          <p>“They delivered a fast, modern site that matched our brand.”</p>
          <span className={styles.testimonialAuthor}>Ben Wright, Founder</span>
        </article>
        <article className={styles.testimonialCard}>
          <p>“Process was smooth and results exceeded expectations.”</p>
          <span className={styles.testimonialAuthor}>Ivana Jablanovic, Project Manager</span>
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
