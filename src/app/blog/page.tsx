"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/blogs";

export default function BlogPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blogs" },
  ];

  const blogs = BLOG_POSTS;
  const categories = BLOG_CATEGORIES.map((name) => ({
    name,
    count: name === "All" ? blogs.length : blogs.filter((blog) => blog.category === name).length,
  }));

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter((blog) => blog.category === activeCategory);

  const featuredBlogs = blogs.filter((blog) => blog.featured);

  return (
    <div className={styles.page}>
      <Header />

      <Breadcrumb items={breadcrumbItems} />

      <section className={styles.blogHero}>
        <div className="container">
          <div className={styles.blogHeroContent}>
            <h1>Celestiatech Blog</h1>
            <p>Latest insights, tutorials, and trends in software development, AI, and technology</p>
          </div>
        </div>
      </section>

      {featuredBlogs.length > 0 && (
        <section className={styles.blogFeatured}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Featured Articles</h2>
              <p>Top picks from our experts</p>
            </div>
            <div className={styles.blogGrid}>
              {featuredBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className={styles.blogCardLink}>
                  <div className={styles.blogCard}>
                    <div className={styles.blogCardImage}>
                      <span>{blog.category.charAt(0)}</span>
                    </div>
                    <div className={styles.blogCardContent}>
                      <span className={styles.blogCardCategory}>{blog.category}</span>
                      <h3>{blog.title}</h3>
                      <p>{blog.excerpt}</p>
                      <div className={styles.blogCardMeta}>
                        <span>{blog.author}</span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.blogFilters}>
        <div className="container">
          <div className={styles.blogFilterTabs}>
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`${styles.blogFilterTab} ${activeCategory === cat.name ? styles.active : ""}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                {cat.name} <span style={{ opacity: 0.7 }}>({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blogArticles}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>{activeCategory === "All" ? "Latest Articles" : activeCategory}</h2>
            <p>{filteredBlogs.length} articles found</p>
          </div>
          <div className={styles.blogArticlesGrid}>
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className={styles.blogArticleCardLink}>
                <div className={styles.blogArticleCard}>
                  <div className={styles.blogArticleIcon}>
                    {blog.category.charAt(0)}
                  </div>
                  <div style={{ padding: "0 20px 0" }}>
                    <div className={styles.blogArticleCategory}>
                      {blog.category}
                    </div>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                  </div>
                  <div className={styles.blogArticleMeta}>
                    <span>{blog.author}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blogNewsletter}>
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest tech insights and tutorials</p>
          <div className={styles.blogNewsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email"
              className={styles.blogNewsletterInput}
            />
            <button className={styles.blogNewsletterButton}>Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
