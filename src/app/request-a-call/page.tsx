import Link from "next/link";
import styles from "../page.module.css";

export default function RequestCallPage() {
  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h2>Request a Call</h2>
        <p>Leave your details and we will call you back.</p>
      </div>
      <div className={styles.contactLayout}>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Your name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" placeholder="+1 555 000 0000" />
          </div>
          <div className={styles.field}>
            <label htmlFor="time">Preferred time</label>
            <input id="time" name="time" placeholder="e.g., Tomorrow 3pm" />
          </div>
          <button type="submit" className={styles.primaryButton}>Request a call</button>
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
