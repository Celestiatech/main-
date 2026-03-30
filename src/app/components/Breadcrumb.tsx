
"use client";

import Link from "next/link";
import styles from "../page.module.css";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className={styles.breadcrumb}>
      <div className="container">
        <div className={styles.breadcrumbContent}>
          {items.map((item, index) => (
            <span key={index} className={styles.breadcrumbItem}>
              {item.href ? (
                <Link href={item.href} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.breadcrumbCurrent}>{item.label}</span>
              )}
              {index < items.length - 1 && (
                <span className={styles.breadcrumbSeparator}>›</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

