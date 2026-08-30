import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { siteConfig } from "@/lib/metadata";
import { getOrganizationSchema, getIndiaLocalBusinessSchema } from "@/lib/structured-data";
import { SkipToContent } from "./components/SkipToContent";
import { AnalyticsInit } from "./components/AnalyticsInit";
import { AnimatedTabTitle } from "./components/AnimatedTabTitle";

// The site's only typeface. `display: swap` shows the fallback immediately
// rather than blocking first paint on the font download.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = genMeta();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    getOrganizationSchema(),
    getIndiaLocalBusinessSchema(),
  ];

  return (
    <html lang="en">
      <head>
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className={inter.variable}>
        <AnimatedTabTitle baseTitle={`${siteConfig.name} - ${siteConfig.tagline}`} />
        <SkipToContent />
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
