import Link from "next/link";
import styles from "./page.module.css";

const importedPages = [
  {
    title: "Portfolio Catalog",
    href: "/premiumthemes/catalog/portfolio.html",
    description: "Imported portfolio listing page with local CSS and asset references.",
  },
  {
    title: "Home Page",
    href: "/premiumthemes/catalog/index.html",
    description: "Imported site home page from the approved reference host.",
  },
  {
    title: "Why Choose Us",
    href: "/premiumthemes/catalog/why-choose-us.html",
    description: "Imported supporting marketing page from the approved reference host.",
  },
  {
    title: "Contact Page",
    href: "/premiumthemes/catalog/contact.html",
    description: "Imported contact page from the approved reference host.",
  },
];

export default function ReferenceDesignsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Reference Import</p>
          <h1>Imported DexignZone Pages</h1>
          <p className={styles.copy}>
            These pages were downloaded into the project as local reference files so you can review,
            adapt, and later convert them into native Next.js pages.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {importedPages.map((page) => (
            <article key={page.href} className={styles.card}>
              <h2>{page.title}</h2>
              <p>{page.description}</p>
              <Link href={page.href} className={styles.button} target="_blank">
                Open Imported Page
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
