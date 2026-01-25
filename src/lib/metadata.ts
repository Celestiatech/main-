/**
 * NexaVibe Solutions - Metadata Configuration
 * Single source of truth for all brand metadata
 */

import type { Metadata } from "next";

export const siteConfig = {
  name: "NexaVibe Solutions",
  shortName: "NexaVibe",
  tagline: "Premium IT & Software Development Company",
  description: "Elite IT solutions with neo-glassmorphism design. Specializing in web development, mobile apps, AI solutions, and blockchain technology. 12+ years of experience serving 2,500+ clients worldwide.",
  url: "https://nexavibe.com",
  ogImage: "/brand/og-image.png",
  logo: {
    primary: "/brand/logo.svg",
    dark: "/brand/logo-dark.svg",
    light: "/brand/logo-light.svg",
    favicon: "/brand/favicon.ico",
    social: "/brand/social-logo.png",
  },
  contact: {
    email: {
      general: "hello@nexavibe.com",
      legal: "legal@nexavibe.com",
      privacy: "privacy@nexavibe.com",
      support: "support@nexavibe.com",
    },
    phone: {
      uae: "+971 50 000 0000",
      india: "+91 98765 43210",
    },
    offices: {
      uae: {
        name: "Dubai Office",
        address: "Business Bay, Dubai, UAE",
        fullAddress: "Business Bay, Dubai, United Arab Emirates",
      },
      india: {
        name: "India Office",
        address: "Mohali, Punjab, India",
        fullAddress: "Mohali, Punjab, India",
      },
    },
  },
  social: {
    linkedin: "https://linkedin.com/company/nexavibe",
    twitter: "https://twitter.com/nexavibe",
    facebook: "https://facebook.com/nexavibe",
    instagram: "https://instagram.com/nexavibe",
  },
  company: {
    founded: "2012",
    experience: "12+ years",
    clients: "2,500+",
    team: "200+",
    countries: "50+",
  },
};

export function generateMetadata(page?: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const title = page?.title
    ? `${page.title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.tagline}`;
  
  const description = page?.description || siteConfig.description;
  const url = page?.path ? `${siteConfig.url}${page.path}` : siteConfig.url;
  const ogImage = page?.ogImage || siteConfig.ogImage;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
