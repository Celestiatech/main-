import type { Metadata, Viewport } from "next";
import { Changa_One, Fjalla_One, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { siteConfig } from "@/lib/metadata";
import { getOrganizationSchema, getDubaiLocalBusinessSchema, getIndiaLocalBusinessSchema } from "@/lib/structured-data";
import { SkipToContent } from "./components/SkipToContent";
import { AnalyticsInit } from "./components/AnalyticsInit";
import { AnimatedTabTitle } from "./components/AnimatedTabTitle";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const changaOne = Changa_One({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-changa-one",
  display: "swap",
});

const fjallaOne = Fjalla_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fjalla-one",
  display: "swap",
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

const leagueGothic = localFont({
  src: [{ path: "../fonts/league-gothic/LeagueGothic-Regular-VariableFont_wdth.ttf", style: "normal" }],
  variable: "--font-league-gothic",
  display: "swap",
});

const lokanova = localFont({
  src: [
    { path: "../fonts/lokanova-pro/Lokanova-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../fonts/lokanova-pro/Lokanova-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/lokanova-pro/Lokanova-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/lokanova-pro/Lokanova-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/lokanova-pro/Lokanova-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../fonts/lokanova-pro/Lokanova-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/lokanova-pro/Lokanova-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../fonts/lokanova-pro/Lokanova-ExtraLightItalic.otf", weight: "200", style: "italic" },
    { path: "../fonts/lokanova-pro/Lokanova-Italic.otf", weight: "400", style: "italic" },
    { path: "../fonts/lokanova-pro/Lokanova-SemiBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../fonts/lokanova-pro/Lokanova-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../fonts/lokanova-pro/Lokanova-ExtraBoldItalic.otf", weight: "800", style: "italic" },
  ],
  variable: "--font-lokanova",
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

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className={`${inter.variable} ${changaOne.variable} ${fjallaOne.variable} ${futura.variable} ${leagueGothic.variable} ${lokanova.variable}`}>
        <AnimatedTabTitle baseTitle={`${siteConfig.name} - ${siteConfig.tagline}`} />
        <SkipToContent />
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
