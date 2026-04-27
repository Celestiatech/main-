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

function buildMirrorPublicPath(demo: string, pagePath: string) {
  const normalizedPath =
    pagePath === "/" ? "/index.html" : pagePath.endsWith("/") ? `${pagePath}index.html` : pagePath;

  return `/premiumthemes/${demo}${normalizedPath}`;
}

export default async function PopularDesignPreviewPage({ params, searchParams }: PreviewPageProps) {
  const { demo } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const requestedPath = resolvedSearchParams?.path || "/index.html";
  const normalizedPath =
    requestedPath === "/" ? "/index.html" : requestedPath.endsWith("/") ? `${requestedPath}index.html` : requestedPath;

  if (!/^[a-z0-9-]+$/i.test(demo) || !normalizedPath.startsWith("/") || normalizedPath.includes("..")) {
    notFound();
  }

  const publicPath = buildMirrorPublicPath(demo, normalizedPath);

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

      <PreviewFrame src={publicPath} title={`${demo} preview`} />
    </main>
  );
}
