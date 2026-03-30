import styles from "./popular-tools.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/tools-catalog";
import PopularToolsClient from "./PopularToolsClient";

export default function PopularToolsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.headerGap} aria-hidden="true" />

      <main className={styles.main}>
        <PopularToolsClient categories={TOOL_CATEGORIES} tools={TOOLS} />
      </main>

      <Footer />
    </div>
  );
}
