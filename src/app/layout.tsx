import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { getOrganizationSchema, getDubaiLocalBusinessSchema, getIndiaLocalBusinessSchema } from "@/lib/structured-data";
import { SkipToContent } from "./components/SkipToContent";
import { AnalyticsInit } from "./components/AnalyticsInit";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
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
    getDubaiLocalBusinessSchema(),
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
      </head>
      <body className={inter.variable}>
        <SkipToContent />
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
