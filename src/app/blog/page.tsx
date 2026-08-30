"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/blogs";
import { CITY_TARGETS } from "@/lib/city-pages";
import { getCityImage } from "@/lib/city-images.generated";
import { buildCityExcerpt } from "@/lib/city-page-content";
import { siteConfig } from "@/lib/metadata";
import locationStyles from "./blog-locations.module.css";

export default function BlogPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blogs" },
  ];

  // City guides live at /web-development-company/[city] rather than /blog/[slug],
  // so they get their own section instead of being faked into the article grid
  // with an author and a read time they do not have.
  const citiesByCountry = CITY_TARGETS.reduce<Record<string, typeof CITY_TARGETS>>((groups, target) => {
    (groups[target.country] ||= []).push(target);
    return groups;
  }, {});

  const cityCountries = Object.keys(citiesByCountry).sort(
    (a, b) => citiesByCountry[b].length - citiesByCountry[a].length || a.localeCompare(b)
  );

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
            <h1>{siteConfig.name} Blog</h1>
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
                      <Image
                        src={blog.image}
                        alt={blog.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.blogCardImageMedia}
                      />
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
                  <div className={styles.blogArticleImage}>
                    <Image
                      src={blog.image}
                      alt={blog.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.blogArticleImageMedia}
                    />
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

      <section className={locationStyles.locations}>
        <div className="container">
          <div className={locationStyles.head}>
            <p className={locationStyles.eyebrow}>By location</p>
            <h2>Web development guides by city</h2>
            <p>
              How we work in each market, what a project costs and runs like, and an honest comparison
              against the other ways to get a build done there.
            </p>
          </div>

          {cityCountries.map((country) => (
            <div key={country} className={locationStyles.country}>
              <h3 className={locationStyles.countryName}>
                {country}
                <small>{citiesByCountry[country].length}</small>
              </h3>
              <div className={locationStyles.grid}>
                {citiesByCountry[country]
                  .slice()
                  .sort((a, b) => a.city.localeCompare(b.city))
                  .map((target) => {
                    const image = getCityImage(target.slug);
                    return (
                      <Link
                        key={target.slug}
                        href={`/web-development-company/${target.slug}`}
                        className={locationStyles.card}
                      >
                        {image && (
                          <span className={locationStyles.thumb}>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 700px) 50vw, (max-width: 980px) 33vw, 25vw"
                              className={locationStyles.thumbImage}
                            />
                            <span className={locationStyles.thumbMark} aria-hidden="true">
                              W3<em>TECH</em>
                            </span>
                          </span>
                        )}
                        <strong>{target.city}</strong>
                        <span className={locationStyles.cardMeta}>
                          {target.region === target.city ? target.country : target.region}
                        </span>
                        <span className={locationStyles.cardExcerpt}>{buildCityExcerpt(target)}</span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}

          <Link href="/web-development-company" className={locationStyles.allLink}>
            See every location we work in →
          </Link>
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
