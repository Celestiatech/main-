/**
 * W3Tech - Structured Data (JSON-LD)
 * Implements schema.org markup for SEO
 */

import { siteConfig } from "./metadata";

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate: string;
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
    areaServed: string;
  }[];
  sameAs: string[];
  address: {
    "@type": string;
    addressCountry: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
  }[];
}

export interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  name: string;
  image: string;
  "@id": string;
  url: string;
  telephone: string;
  priceRange: string;
  address: {
    "@type": string;
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    "@type": string;
    latitude: string;
    longitude: string;
  };
  openingHoursSpecification?: {
    "@type": string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
}

/**
 * Generate Organization schema
 */
export function getOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo.primary}`,
    description: siteConfig.description,
    foundingDate: siteConfig.company.founded,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone.india,
        contactType: "Customer Service",
        areaServed: "IN",
      },
    ],
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressCountry: siteConfig.contact.offices.india.country,
        addressLocality: siteConfig.contact.offices.india.locality,
        addressRegion: siteConfig.contact.offices.india.region,
        postalCode: siteConfig.contact.offices.india.postalCode,
      },
    ],
  };
}

/**
 * LocalBusiness schema for the registered office.
 *
 * Only one office is declared because only one exists. Location schema is a
 * factual claim to Google, and listing an office that is not real is a
 * spam-policy violation rather than an SEO tactic.
 */
export function getIndiaLocalBusinessSchema(): LocalBusinessSchema {
  const office = siteConfig.contact.offices.india;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.logo.primary}`,
    "@id": `${siteConfig.url}#office`,
    url: `${siteConfig.url}/contact`,
    telephone: siteConfig.contact.phone.india,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: office.locality,
      addressRegion: office.region,
      postalCode: office.postalCode,
      addressCountry: office.country,
      streetAddress: office.fullAddress,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

/**
 * Generate Article schema for blog posts
 */
export function getArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image || `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": author ? "Person" : "Organization",
      name: author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo.primary}`,
      },
    },
  };
}

/**
 * Generate FAQ schema
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate structured data script tags as string
 * Use this in layout.tsx head section
 */
export function generateStructuredDataScripts(data: object | object[]): string {
  const jsonLd = Array.isArray(data) ? data : [data];
  return jsonLd
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n");
}
