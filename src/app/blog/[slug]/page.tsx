import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { StructuredData } from "@/components/StructuredData";
import styles from "./page.module.css";
import { BLOG_POSTS, getBlogBySlug } from "@/lib/blogs";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { getArticleSchema } from "@/lib/structured-data";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found | Celestiatech",
    };
  }

  const publishedTime = new Date(post.date).toISOString();

  return genMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
    type: "article",
    publishedTime,
    modifiedTime: publishedTime,
    authors: [post.author],
    keywords: [
      post.category,
      post.title,
      "software development blog",
      "technology articles",
      "Celestiatech blog",
    ],
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  const articleSchema = getArticleSchema({
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: post.author,
  });
  // FAQPage markup is what AI overviews and answer engines extract from, so it
  // is emitted only when the page really carries a question-and-answer block.
  const faqSchema = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blog" },
    { label: post.title },
  ];

  return (
    <div className={styles.page}>
      <Header />
      <StructuredData data={articleSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      <Breadcrumb items={breadcrumbItems} />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.categoryPill}>{post.category}</div>
            <h1>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className={styles.metaRow}>
              <span>{post.author}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>

            <div className={styles.heroImage}>
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 860px"
                className={styles.heroImageMedia}
              />
            </div>
          </div>
        </div>
      </section>

      <main className={styles.content}>
        <div className="container">
          <div className={styles.contentGrid}>
            <article className={styles.article}>
              <p className={styles.intro}>{post.intro}</p>

              <div className={styles.takeaways}>
                <h2>Key Takeaways</h2>
                <ul>
                  {post.keyTakeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.sections}>
                {post.sections.map((section) => (
                  <section key={section.heading} className={styles.sectionBlock}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              {post.faq && post.faq.length > 0 && (
                <section className={styles.faqBlock}>
                  <h2>Frequently asked questions</h2>
                  {post.faq.map((item) => (
                    <details key={item.question} className={styles.faqItem}>
                      <summary>
                        {item.question}
                        <span aria-hidden="true">+</span>
                      </summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </section>
              )}
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3>Need help building something like this?</h3>
                <p>We design and develop web, mobile, AI, and product systems built around real business goals.</p>
                <div className={styles.sidebarActions}>
                  <Link href="/contact" className={styles.primaryButton}>
                    Talk to Us
                  </Link>
                  <Link href="/proposal" className={styles.secondaryButton}>
                    Get a Proposal
                  </Link>
                </div>
              </div>

              {relatedPosts.length ? (
                <div className={styles.sidebarCard}>
                  <h3>Related Articles</h3>
                  <div className={styles.relatedList}>
                    {relatedPosts.map((item) => (
                      <Link key={item.slug} href={`/blog/${item.slug}`} className={styles.relatedItem}>
                        <span className={styles.relatedCategory}>{item.category}</span>
                        <strong>{item.title}</strong>
                        <span className={styles.relatedMeta}>{item.readTime}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
