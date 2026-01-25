"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import styles from "./page.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.section} style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "120px", fontWeight: 800, marginBottom: "20px", color: "var(--color-error)" }}>
              500
            </h1>
            <h2 style={{ fontSize: "32px", marginBottom: "16px", color: "var(--text-primary)" }}>
              Something Went Wrong
            </h2>
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
              We&apos;re experiencing a technical issue. Our team has been notified and is working to fix it.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={reset} className="btn btn-primary">
                Try Again
              </button>
              <Link href="/" className="btn btn-secondary">
                Go to Homepage
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact Support
              </Link>
            </div>
            {error.digest && (
              <div style={{ marginTop: "32px", padding: "16px", background: "var(--color-gray-100)", borderRadius: "8px", fontSize: "14px", color: "var(--text-secondary)" }}>
                Error ID: {error.digest}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
