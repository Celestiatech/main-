import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityImage } from "@/lib/city-images.generated";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CITY_TARGETS, getCityBySlug, getNearbyCities } from "@/lib/city-pages";
import { buildCityPageContent } from "@/lib/city-page-content";
import { siteConfig } from "@/lib/metadata";
import styles from "./city.module.css";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return CITY_TARGETS.map((target) => ({ city: target.slug }));
}

// Only the cities we have data for; anything else is a genuine 404 rather
// than a thin auto-generated page.
export const dynamicParams = false;

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const target = getCityBySlug(city);

  if (!target) return {};

  const content = buildCityPageContent(target);
  const url = `${siteConfig.url}/web-development-company/${target.slug}`;
  const image = getCityImage(target.slug);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      type: "website",
      images: image ? [{ url: `${siteConfig.url}${image.src}`, alt: image.alt }] : undefined,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const target = getCityBySlug(city);

  if (!target) {
    notFound();
  }

  const content = buildCityPageContent(target);
  const nearby = getNearbyCities(target);
  const image = getCityImage(target.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web development",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: {
      "@type": "City",
      name: target.city,
      containedInPlace: { "@type": "AdministrativeArea", name: target.region },
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, serviceSchema]) }}
      />

      <Header />
      <div className={styles.headerGap} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <strong>{target.city}</strong>
          </nav>

          <p className={styles.eyebrow}>
            {target.region === target.city ? target.country : `${target.region}, ${target.country}`}
          </p>
          <h1>{content.heroHeading}</h1>
          <p className={styles.heroSub}>{content.heroSub}</p>

          <div className={styles.trust}>
            {content.trustPoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>

          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryBtn}>
              Get a fixed-price quote
            </Link>
            <Link href="/portfolio" className={styles.secondaryBtn}>
              See our work
            </Link>
          </div>
        </section>

        {image && (
          <figure className={styles.cityShot}>
            <div className={styles.cityShotFrame}>
              <Image
                src={image.src}
                alt={image.alt}
                width={1280}
                height={720}
                priority
                sizes="(max-width: 1180px) 92vw, 1180px"
                className={styles.cityShotImage}
              />
              <div className={styles.cityShotOverlay}>
                <span className={styles.cityShotMark} aria-hidden="true">
                  W3<em>TECH</em>
                </span>
                <span className={styles.cityShotPlace}>
                  Web development in {target.city}
                </span>
              </div>
            </div>
            <figcaption>
              {target.city}
              {target.region !== target.city && ` · ${target.region}`} · photo by {image.credit} on Pixabay
            </figcaption>
          </figure>
        )}

        <section className={styles.section}>
          {content.intro.map((paragraph) => (
            <p key={paragraph} className={styles.lead}>
              {paragraph}
            </p>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.whyHeading}</h2>
          <div className={styles.whyGrid}>
            {content.why.map((item) => (
              <article key={item.title} className={styles.whyCard}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.comparisonHeading}</h2>
          <p className={styles.sectionLead}>{content.comparisonIntro}</p>

          <div className={styles.tableScroll}>
            <table className={styles.compare}>
              <thead>
                <tr>
                  <th scope="col">Option</th>
                  {content.comparisonColumns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.comparison.map((row) => (
                  <tr key={row.name} className={row.highlight ? styles.compareUs : undefined}>
                    <th scope="row">{row.name}</th>
                    {row.cells.map((cell, index) => (
                      <td key={`${row.name}-${content.comparisonColumns[index]}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={styles.tableNote}>
            The alternatives above are common categories of provider, not specific companies. Which one
            suits you depends on your budget and how much of the process you want to manage yourself.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What we build in {target.city}</h2>
          <div className={styles.serviceGrid}>
            {content.services.map((service) => (
              <Link key={service.href} href={service.href} className={styles.serviceCard}>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How a project runs</h2>
          <div className={styles.processList}>
            {content.process.map((step) => (
              <article key={step.step} className={styles.processRow}>
                <span className={styles.processBadge}>{step.step}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.marketHeading}</h2>
          {content.market.map((paragraph) => (
            <p key={paragraph} className={styles.lead}>
              {paragraph}
            </p>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.faqHeading}</h2>
          <div className={styles.faqGrid}>
            {content.faq.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {nearby.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>We also work in</h2>
            <div className={styles.nearby}>
              {nearby.map((entry) => (
                <Link key={entry.slug} href={`/web-development-company/${entry.slug}`}>
                  {entry.city}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.cta}>
          <h2>{content.ctaHeading}</h2>
          <p>{content.ctaBody}</p>
          <Link href="/contact" className={styles.primaryBtn}>
            Talk to W3Tech
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
