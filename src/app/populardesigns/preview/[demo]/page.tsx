import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { PreviewFrame } from "./PreviewFrame";

type PreviewPageProps = {
  params: Promise<{
    demo: string;
  }>;
  searchParams?: Promise<{
    path?: string;
  }>;
};

const MIRROR_ROOT = path.join(process.cwd(), "public/premiumthemes");

function buildMirrorAssetPath(demo: string, pagePath: string) {
  const normalizedPath =
    pagePath === "/" ? "/index.html" : pagePath.endsWith("/") ? `${pagePath}index.html` : pagePath;
  return {
    filePath: path.join(MIRROR_ROOT, demo, normalizedPath.replace(/^\//, "")),
    publicPath: `/premiumthemes/${demo}${normalizedPath}`,
  };
}

export default async function PopularDesignPreviewPage({ params, searchParams }: PreviewPageProps) {
  const { demo } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const requestedPath = resolvedSearchParams?.path || "/index.html";
  const asset = buildMirrorAssetPath(demo, requestedPath);

  if (!fs.existsSync(asset.filePath)) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <p className={styles.eyebrow}>Celestiatech Preview</p>
          <h1>{demo}</h1>
        </div>
        <a href="/populardesigns" className={styles.backLink}>
          Back To Designs
        </a>
      </div>

      <PreviewFrame src={asset.publicPath} title={`${demo} preview`} />
    </main>
  );
}
