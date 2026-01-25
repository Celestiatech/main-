import type { Metadata } from "next";
import { Syne, Poppins, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { generateMetadata as genMeta, siteConfig } from "@/lib/metadata";
import { getOrganizationSchema, getDubaiLocalBusinessSchema, getIndiaLocalBusinessSchema } from "@/lib/structured-data";
import { SkipToContent } from "./components/SkipToContent";
import { AnalyticsInit } from "./components/AnalyticsInit";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = genMeta();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    getOrganizationSchema(),
    getDubaiLocalBusinessSchema(),
    getIndiaLocalBusinessSchema(),
  ];

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${syne.variable} ${poppins.variable} ${inter.variable} ${plusJakarta.variable}`}>
        <SkipToContent />
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}

