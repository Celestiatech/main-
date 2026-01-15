import Link from "next/link";
import styles from "../page.module.css";

export default function ServicesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h2>Our Services</h2>
        <p>Explore our web, design, marketing and mobile app services.</p>
      </div>
      <div className={styles.cardsGrid}>
        <article className={styles.card}>
          <h3>Web Development</h3>
          <p>Next.js, React, CMS integration and custom APIs.</p>
        </article>
        <article className={styles.card}>
          <h3>Web Design</h3>
          <p>UI/UX, branding and conversion-focused layouts.</p>
        </article>
        <article className={styles.card}>
          <h3>Digital Marketing</h3>
          <p>SEO, PPC, social media, content and analytics.</p>
        </article>
        <article className={styles.card}>
          <h3>Mobile Apps</h3>
          <p>iOS and Android development with modern tooling.</p>
        </article>
      </div>
      <div className={styles.heroActions}>
        <Link href="/contact" className={styles.primaryButton}>
          Talk to us
        </Link>
        <Link href="/" className={styles.secondaryButton}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
