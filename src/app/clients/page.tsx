import Link from "next/link";
import styles from "../page.module.css";

export default function ClientsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h2>For Clients</h2>
        <p>Information and links for existing clients.</p>
      </div>
      <div className={styles.pills}>
        <span>Support</span>
        <span>Maintenance</span>
        <span>Billing</span>
        <span>Project updates</span>
      </div>
      <div className={styles.heroActions}>
        <Link href="/contact" className={styles.primaryButton}>
          Request support
        </Link>
        <Link href="/" className={styles.secondaryButton}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
