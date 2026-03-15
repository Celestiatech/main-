import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import ToolPlayground from "./ToolPlayground";
import styles from "./tool-detail.module.css";
import { getToolBySlug } from "@/lib/tools-catalog";

type ToolDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.headerGap} />

      <main className={styles.main}>
        <Link className={styles.backLink} href="/popular-tools">
          Back to All Tools
        </Link>

        <section className={styles.heroCard}>
          <p className={styles.categoryLabel}>{tool.category.replaceAll("-", " ")}</p>
          <h1>{tool.title}</h1>
          <p>{tool.description}</p>
          <span className={`${styles.badge} ${tool.status === "live" ? styles.live : styles.soon}`}>
            {tool.status === "live" ? "Live Tool" : "Coming Soon"}
          </span>
        </section>

        <section className={styles.workspaceCard}>
          <ToolPlayground slug={tool.slug} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
