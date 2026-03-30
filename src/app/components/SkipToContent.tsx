"use client";

import Link from "next/link";
import styles from "./SkipToContent.module.css";

export function SkipToContent() {
  return (
    <Link href="#main-content" className={styles.skipLink}>
      Skip to main content
    </Link>
  );
}
