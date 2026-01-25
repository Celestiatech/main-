/**
 * NexaVibe Solutions - Structured Data (JSON-LD)
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
        telephone: siteConfig.contact.phone.uae,
        contactType: "Customer Service",
        areaServed: "AE",
      },
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
        addressCountry: "AE",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
      },
      {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "Mohali",
        addressRegion: "Punjab",
      },
    ],
  };
}

/**
 * Generate LocalBusiness schema for Dubai office
 */
export function getDubaiLocalBusinessSchema(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} - Dubai Office`,
    image: `${siteConfig.url}${siteConfig.logo.primary}`,
    "@id": `${siteConfig.url}#dubai-office`,
    url: `${siteConfig.url}/contact`,
    telephone: siteConfig.contact.phone.uae,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
      streetAddress: siteConfig.contact.offices.uae.fullAddress,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.2048",
      longitude: "55.2708",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

/**
 * Generate LocalBusiness schema for India office
 */
export function getIndiaLocalBusinessSchema(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} - India Office`,
    image: `${siteConfig.url}${siteConfig.logo.primary}`,
    "@id": `${siteConfig.url}#india-office`,
    url: `${siteConfig.url}/contact`,
    telephone: siteConfig.contact.phone.india,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mohali",
      addressRegion: "Punjab",
      addressCountry: "IN",
      streetAddress: siteConfig.contact.offices.india.fullAddress,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.7046",
      longitude: "76.7179",
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
      "@type": "Organization",
      name: siteConfig.name,
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
