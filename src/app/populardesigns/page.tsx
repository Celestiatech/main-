import fs from "node:fs";
import path from "node:path";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styles from "./page.module.css";
import { PopularDesignsClient } from "./PopularDesignsClient";

type Category = {
  href: string;
  label: string;
};

type Project = {
  category: string;
  href: string;
  localHref: string;
  image: string;
  title: string;
};

const HTML_PATH = path.join(process.cwd(), "public/premiumthemes/catalog/portfolio.html");
const ASSET_BASE = "/premiumthemes/catalog";
const MIRROR_ROOT = path.join(process.cwd(), "public/premiumthemes");

function readReferenceHtml() {
  return fs.readFileSync(HTML_PATH, "utf8");
}

function normalizeBranding(value: string) {
  return value
    .replace(/DexignZone/gi, "Celestiatech")
    .replace(/DexignLab/gi, "Celestiatech")
    .replace(/W3itexperts/gi, "Celestiatech")
    .replace(/TemplateLelo/gi, "Celestiatech");
}

function parseCategories(source: string): Category[] {
  const filterMatch = source.match(/<div class="site-filters[\s\S]*?<ul class="clearfix">([\s\S]*?)<\/ul>/i);
  const filterHtml = filterMatch?.[1] ?? "";

  return [...filterHtml.matchAll(/<li><a href="([^"]+)" class="btn">([\s\S]*?)<\/a><\/li>/gi)].map((match) => ({
    href: `${ASSET_BASE}/${match[1]}`,
    label: normalizeBranding(match[2].trim()),
  }));
}

function parseProjects(source: string): Project[] {
  return [...source.matchAll(/<li class="card-container[\s\S]*?<\/li>/gi)]
    .map((match) => match[0])
    .map((block) => {
      const category = block.match(/m-b30\s+([a-z0-9-]+)/i)?.[1] ?? "html";
      const href = block.match(/<div class="dlab-media">[\s\S]*?<a href="([^"]+)"/i)?.[1] ?? "#";
      const image = block.match(/data-src="([^"]+)"/i)?.[1] ?? "product/preview.png";
      const title = block.match(/<h5 class="dez-title[\s\S]*?<a [^>]*>([\s\S]*?)<\/a>/i)?.[1] ?? "Imported Design";

      return {
        category: category.toUpperCase(),
        href,
        localHref: getLocalMirrorHref(href),
        image: `${ASSET_BASE}/${image}`,
        title: normalizeBranding(title.replace(/\s+/g, " ").trim()),
      };
    })
    .filter((project) => project.href !== "#");
}

function getLocalMirrorHref(href: string) {
  try {
    const url = new URL(href);
    const demoName = url.hostname.replace(/\.dexignzone\.com$/i, "");
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname;
    const localPath = path.join(MIRROR_ROOT, demoName, pathname.replace(/^\//, ""));

    if (fs.existsSync(localPath)) {
      return `/populardesigns/preview/${demoName}?path=${encodeURIComponent(pathname)}`;
    }
  } catch {
    return href;
  }

  return href;
}

export default function PopularDesignsPage() {
  const html = readReferenceHtml();
  const categories = parseCategories(html);
  const projects = parseProjects(html);

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.eyebrow}>Premium Themes</div>
              <h1>Explore Premium Theme Directions Before We Build Yours</h1>
              <p>
                Browse the same reference projects from the imported catalog, now presented in our own
                site style so clients can review options more clearly.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <PopularDesignsClient categories={categories} projects={projects} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
