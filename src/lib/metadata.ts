/**
 * W3Tech - Metadata Configuration
 * Single source of truth for all brand metadata
 */

import type { Metadata } from "next";

export const siteConfig = {
  name: "W3Tech",
  shortName: "W3Tech",
  tagline: "Premium IT & Software Development Company",
  description: "Premium web, mobile, AI, and blockchain development services backed by 12+ years of experience and 2,500+ successful client engagements worldwide.",
  url: "https://w3tech.in",
  ogImage: "/brand/og-image.png",
  logo: {
    primary: "/brand/logo.svg",
    dark: "/brand/logo-dark.svg",
    light: "/brand/logo-light.svg",
    favicon: "/favicon.svg",
    social: "/brand/social-logo.png",
  },
  contact: {
    email: {
      general: "hello@w3tech.in",
      legal: "legal@w3tech.in",
      privacy: "privacy@w3tech.in",
      support: "support@w3tech.in",
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
    linkedin: "https://linkedin.com/company/w3tech",
    twitter: "https://twitter.com/w3tech",
    facebook: "https://facebook.com/w3tech",
    instagram: "https://instagram.com/w3tech",
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
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}): Metadata {
  const title = page?.title
    ? `${page.title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.tagline}`;
  
  const description = page?.description || siteConfig.description;
  const url = page?.path ? `${siteConfig.url}${page.path}` : siteConfig.url;
  const ogImage = page?.ogImage || siteConfig.ogImage;
  const type = page?.type || "website";
  const keywords = page?.keywords || [
    "software development company",
    "web development",
    "mobile app development",
    "AI development",
    "blockchain development",
    "UI UX design",
  ];

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    keywords,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: ["/favicon.ico", "/favicon-32x32.png"],
      other: [
        { rel: "mask-icon", url: "/favicon.svg", color: "#ff8c00" },
      ],
    },
    alternates: {
      canonical: page?.path || "/",
    },
    robots: page?.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
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
      type,
      ...(type === "article"
        ? {
            publishedTime: page?.publishedTime,
            modifiedTime: page?.modifiedTime || page?.publishedTime,
            authors: page?.authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    category: type === "article" ? "technology" : "business",
  };
}
