import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { MISSING_ROUTES } from "../missing-routes";
import styles from "./LegacyMissingPage.module.css";

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function getPath(params: Promise<{ slug: string[] }> | { slug: string[] }) {
  const resolved = await Promise.resolve(params);
  const rawPath = `/${(resolved.slug ?? []).join("/")}`;
  return decodeURI(rawPath).replace(/\/+$/, "").toLowerCase();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const path = await getPath(params);
  if (!MISSING_ROUTES.has(path)) return {};

  const resolved = await params;
  const last = resolved.slug?.[resolved.slug.length - 1] ?? "page";
  const title = `${humanizeSlug(last)} | W3Tech`;

  return {
    title,
    description:
      "This page is being migrated to the new W3Tech website. Contact us for help or request a quote.",
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LegacyMissingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const path = await getPath(params);
  if (!MISSING_ROUTES.has(path)) notFound();

  const resolved = await params;
  const last = resolved.slug?.[resolved.slug.length - 1] ?? "page";
  const title = humanizeSlug(last);

  return (
    <div className={styles.page}>
      <Header />
      <main id="main-content" className={styles.hero}>
        <div className="container">
          <div className={styles.card}>
            <p className={styles.kicker}>
              <span className={styles.pill}>Legacy Page</span>
              <span>{path}</span>
            </p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>
              We’re migrating content from <strong>teqtop.com</strong> to{" "}
              <strong>w3tech.co.in</strong>. This page is available here so your old links keep working.
              If you need anything specific from this page, tell us and we’ll prioritize it.
            </p>

            <div className={styles.actions}>
              <Link href="/contact" className="btn btn-accent btn-3d btn-bubble">
                Contact Us
              </Link>
              <Link href="/work" className="btn btn-secondary btn-3d btn-bubble">
                View Our Portfolio
              </Link>
              <Link href="/services" className="btn btn-secondary btn-3d btn-bubble">
                Our Services
              </Link>
            </div>

            <div className={styles.grid} aria-label="Quick links">
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Need a quote?</h3>
                <p className={styles.itemText}>Share your requirements and we’ll respond within 24 hours.</p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Looking for SEO tools?</h3>
                <p className={styles.itemText}>
                  Tell us which tool you need and we’ll add it back to the new site.
                </p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Hiring developers?</h3>
                <p className={styles.itemText}>We can create dedicated pages for each tech stack you offer.</p>
              </div>
            </div>

            <p className={styles.meta}>
              Tip: If you want, I can create full dedicated pages for all missing routes (SEO-ready) instead of this
              temporary page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
