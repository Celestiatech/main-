import Link from "next/link";
import styles from "../page.module.css";

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h2>Contact Us</h2>
        <p>Tell us about your project, timelines and goals.</p>
      </div>
      <div className={styles.contactLayout}>
        <div>
          <div className={styles.contactHighlights}>
            <span>Free initial consultation</span>
            <span>Clear pricing before we start</span>
            <span>Dedicated project manager</span>
          </div>
        </div>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Your name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="you@example.com" type="email" />
          </div>
          <div className={styles.field}>
            <label htmlFor="company">Company</label>
            <input id="company" name="company" placeholder="Your company" />
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Project details</label>
            <textarea id="message" name="message" rows={4} placeholder="Short overview." />
          </div>
          <button type="submit" className={styles.primaryButton}>Send message</button>
        </form>
      </div>
      <div className={styles.heroActions}>
        <Link href="/" className={styles.secondaryButton}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
