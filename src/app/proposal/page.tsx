import Link from "next/link";
import styles from "../page.module.css";

export default function ProposalPage() {
  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h2>Get a Free Proposal</h2>
        <p>Share your project details and receive a tailored proposal.</p>
      </div>
      <div className={styles.contactLayout}>
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
            <label htmlFor="budget">Budget range</label>
            <select id="budget" name="budget" defaultValue="">
              <option value="" disabled>Select a range</option>
              <option value="5-10k">$5k – $10k</option>
              <option value="10-25k">$10k – $25k</option>
              <option value="25-50k">$25k – $50k</option>
              <option value="50k+">$50k+</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Project details</label>
            <textarea id="message" name="message" rows={4} placeholder="Short overview." />
          </div>
          <button type="submit" className={styles.primaryButton}>Request proposal</button>
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
