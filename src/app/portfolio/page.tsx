import Link from "next/link";
import styles from "../page.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function PortfolioPage() {
  return (
    <div className={styles.page}>
      {/* Floating orbs for background */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* 3D Geometric Shapes */}
      <div className="morph-shape" style={{ top: '10%', left: '5%' }}></div>
      <div className="morph-shape" style={{ top: '60%', right: '10%' }}></div>

      {/* 3D Particle System */}
      <div className="particle-3d"></div>
      <div className="particle-3d"></div>
      <div className="particle-3d"></div>
      <div className="particle-3d"></div>

      <div className={styles.topStrip}>
        <span>Need help with SEO or PPC?</span>
        <span>Grow your Shopify or e‑commerce store.</span>
        <span>Custom web solutions in React, Next.js and Node.js.</span>
        <span>Specialists in WordPress, Wix, Webflow and Joomla.</span>
      </div>

      <Header />

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Portfolio</h2>
            <p>Showcase of our recent projects and successful client work.</p>
          </div>
          <div className={styles.projectsGrid}>
            <article className={styles.projectCard}>
              <h3>E-commerce Platform</h3>
              <p>Modern Shopify store with custom integrations and advanced analytics.</p>
            </article>
            <article className={styles.projectCard}>
              <h3>Corporate Website</h3>
              <p>Professional business website with CMS integration and SEO optimization.</p>
            </article>
            <article className={styles.projectCard}>
              <h3>Mobile Application</h3>
              <p>Cross-platform mobile app with real-time features and offline capabilities.</p>
            </article>
            <article className={styles.projectCard}>
              <h3>Brand Identity</h3>
              <p>Complete brand redesign including logo, website, and marketing materials.</p>
            </article>
            <article className={styles.projectCard}>
              <h3>SEO Campaign</h3>
              <p>Comprehensive SEO strategy that increased organic traffic by 300%.</p>
            </article>
            <article className={styles.projectCard}>
              <h3>Marketing Automation</h3>
              <p>Automated marketing system with email campaigns and lead nurturing.</p>
            </article>
          </div>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Start your project
            </Link>
            <Link href="/" className={styles.secondaryButton}>
              Back to home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
