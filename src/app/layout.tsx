import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
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

const futura = localFont({
  src: [
    { path: "../fonts/futura-pt/FuturaCyrillicLight.ttf", weight: "300", style: "normal" },
    { path: "../fonts/futura-pt/FuturaCyrillicBook.ttf", weight: "400", style: "normal" },
    { path: "../fonts/futura-pt/FuturaCyrillicMedium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/futura-pt/FuturaCyrillicDemi.ttf", weight: "600", style: "normal" },
    { path: "../fonts/futura-pt/FuturaCyrillicBold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/futura-pt/FuturaCyrillicExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../fonts/futura-pt/FuturaCyrillicHeavy.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-futura",
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
      <body className={`${inter.variable} ${futura.variable}`}>
        <SkipToContent />
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
