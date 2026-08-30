import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCityImage } from "@/lib/city-images.generated";
import { buildCityExcerpt } from "@/lib/city-page-content";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CITY_TARGETS } from "@/lib/city-pages";
import { siteConfig } from "@/lib/metadata";
import styles from "./[city]/city.module.css";
import indexStyles from "./index.module.css";

export const metadata: Metadata = {
  title: "Web Development Company | Locations We Serve | W3Tech",
  description:
    "W3Tech builds websites, web applications and AI products for businesses across India, the United States, the United Kingdom, Australia and the Gulf. Find your city.",
  alternates: { canonical: `${siteConfig.url}/web-development-company` },
};

export default function LocationsPage() {
  // Grouped so the list reads as a service area rather than a wall of links.
  const byCountry = CITY_TARGETS.reduce<Record<string, typeof CITY_TARGETS>>((groups, target) => {
    (groups[target.country] ||= []).push(target);
    return groups;
  }, {});

  const countries = Object.keys(byCountry).sort(
    (a, b) => byCountry[b].length - byCountry[a].length || a.localeCompare(b)
  );

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.headerGap} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <strong>Locations</strong>
          </nav>

          <p className={styles.eyebrow}>Where we work</p>
          <h1>Web development company, wherever you are</h1>
          <p className={styles.heroSub}>
            We work with clients across {countries.length} countries from engineering teams in India and
            the UAE. Pick your city to see how we work there, what we build, and how we compare to the
            alternatives.
          </p>
        </section>

        {countries.map((country) => (
          <section key={country} className={styles.section}>
            <h2 className={styles.sectionTitle}>{country}</h2>
            <div className={indexStyles.cityGrid}>
              {byCountry[country]
                .slice()
                .sort((a, b) => a.city.localeCompare(b.city))
                .map((target) => {
                  const image = getCityImage(target.slug);
                  return (
                    <Link
                      key={target.slug}
                      href={`/web-development-company/${target.slug}`}
                      className={indexStyles.cityCard}
                    >
                      {image && (
                        <span className={indexStyles.thumb}>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 700px) 50vw, (max-width: 980px) 33vw, 25vw"
                            className={indexStyles.thumbImage}
                          />
                          <span className={indexStyles.thumbMark} aria-hidden="true">
                            W3<em>TECH</em>
                          </span>
                        </span>
                      )}
                      <strong>{target.city}</strong>
                      <span className={indexStyles.cardMeta}>
                        {target.region === target.city ? target.country : target.region}
                      </span>
                      <span className={indexStyles.cardExcerpt}>{buildCityExcerpt(target)}</span>
                    </Link>
                  );
                })}
            </div>
          </section>
        ))}

        <section className={styles.cta}>
          <h2>Not on the list?</h2>
          <p>
            These are the cities we have written about, not the limit of where we work. Tell us where you
            are and what you are building.
          </p>
          <Link href="/contact" className={styles.primaryBtn}>
            Talk to W3Tech
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
