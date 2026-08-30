import type { Metadata } from "next";
import styles from "./popular-tools.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FontAwesomeLoader } from "../components/FontAwesomeLoader";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/tools-catalog";
import PopularToolsClient from "./PopularToolsClient";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Free Online Tools for Developers, SEO & Content",
  description: "Free online tools for developers, SEO, text editing, PDF and image work. No login, no trial and no credit card — open a tool and get a usable result.",
  path: "/popular-tools",
  keywords: [
    "free online tools",
    "developer tools",
    "SEO tools",
    "PDF tools",
    "image tools",
    "text tools",
  ],
});

export default function PopularToolsPage() {
  return (
    <div className={styles.page}>
      <FontAwesomeLoader />
      <Header />
      <div className={styles.headerGap} aria-hidden="true" />

      <main className={styles.main}>
        <PopularToolsClient categories={TOOL_CATEGORIES} tools={TOOLS} />
      </main>

      <Footer />
    </div>
  );
}
