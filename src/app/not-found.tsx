import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.section} style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "120px", fontWeight: 800, marginBottom: "20px", background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              404
            </h1>
            <h2 style={{ fontSize: "32px", marginBottom: "16px", color: "var(--text-primary)" }}>
              Page Not Found
            </h2>
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" className="btn btn-primary">
                Go to Homepage
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact Support
              </Link>
            </div>
            <div style={{ marginTop: "48px", padding: "24px", background: "var(--color-gray-50)", borderRadius: "12px", maxWidth: "500px", margin: "48px auto 0" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--text-primary)" }}>Popular Pages</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
                <Link href="/services" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Our Services</Link>
                <Link href="/portfolio" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Portfolio</Link>
                <Link href="/about" style={{ color: "var(--color-primary)", textDecoration: "none" }}>About Us</Link>
                <Link href="/contact" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Contact</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
