import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FontAwesomeLoader } from "../../components/FontAwesomeLoader";
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

  const isAuditTool = tool.slug === "website-audit-tool";

  return (
    <div className={styles.page}>
      <FontAwesomeLoader />
      <Header />
      <div className={styles.headerGap} />

      <main className={`${styles.main} ${isAuditTool ? styles.auditMain : ""}`}>
        <Link className={`${styles.backLink} ${isAuditTool ? styles.auditBackLink : ""}`} href="/popular-tools">
          Back to All Tools
        </Link>

        <section className={`${styles.heroCard} ${isAuditTool ? styles.auditHeroCard : ""}`}>
          <p className={styles.categoryLabel}>{tool.category.replaceAll("-", " ")}</p>
          <h1>{tool.title}</h1>
          <p>{tool.description}</p>
          <span className={`${styles.badge} ${tool.status === "live" ? styles.live : styles.soon}`}>
            {tool.status === "live" ? "Live Tool" : "Coming Soon"}
          </span>
        </section>

        <section className={`${styles.workspaceCard} ${isAuditTool ? styles.auditWorkspaceCard : ""}`}>
          <ToolPlayground slug={tool.slug} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
