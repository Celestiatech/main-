"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function BlogPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blogs" },
  ];

  const categories = [
    { name: "All", count: 24 },
    { name: "Web Development", count: 8 },
    { name: "Mobile Development", count: 5 },
    { name: "AI & Machine Learning", count: 4 },
    { name: "Blockchain", count: 3 },
    { name: "DevOps", count: 2 },
    { name: "Design", count: 2 },
  ];

  const blogs = [
    {
      id: 1,
      title: "Complete Guide to React 19: New Features and Improvements",
      excerpt: "Explore the exciting new features in React 19 including the use hook, improved concurrency, and better TypeScript support.",
      category: "Web Development",
      author: "John Smith",
      date: "Jan 15, 2024",
      readTime: "8 min read",
      featured: true,
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js and TypeScript",
      excerpt: "Learn best practices for creating high-performance, type-safe APIs using Node.js, Express, and TypeScript.",
      category: "Web Development",
      author: "Sarah Johnson",
      date: "Jan 12, 2024",
      readTime: "10 min read",
    },
    {
      id: 3,
      title: "Flutter vs React Native: Which Framework to Choose in 2024?",
      excerpt: "A comprehensive comparison of the two leading cross-platform mobile development frameworks.",
      category: "Mobile Development",
      author: "Michael Chen",
      date: "Jan 10, 2024",
      readTime: "12 min read",
    },
    {
      id: 4,
      title: "Introduction to Large Language Models and GPT-4",
      excerpt: "Understanding how LLMs work and how to integrate them into your applications.",
      category: "AI & Machine Learning",
      author: "Emily Davis",
      date: "Jan 8, 2024",
      readTime: "15 min read",
      featured: true,
    },
    {
      id: 5,
      title: "Smart Contract Development with Solidity",
      excerpt: "Learn how to build secure and efficient smart contracts for Ethereum and other EVM chains.",
      category: "Blockchain",
      author: "David Wilson",
      date: "Jan 5, 2024",
      readTime: "14 min read",
    },
    {
      id: 6,
      title: "Docker and Kubernetes: Container Orchestration Explained",
      excerpt: "Master containerization and orchestration for deploying scalable applications.",
      category: "DevOps",
      author: "Alex Turner",
      date: "Jan 3, 2024",
      readTime: "11 min read",
    },
    {
      id: 7,
      title: "UI/UX Design Principles for Developers",
      excerpt: "Essential design principles every developer should know to create beautiful user interfaces.",
      category: "Design",
      author: "Lisa Anderson",
      date: "Jan 1, 2024",
      readTime: "9 min read",
    },
    {
      id: 8,
      title: "Next.js 14: Server Actions and App Router Deep Dive",
      excerpt: "Master the new features in Next.js 14 including server actions and improved data fetching.",
      category: "Web Development",
      author: "John Smith",
      date: "Dec 28, 2023",
      readTime: "10 min read",
    },
    {
      id: 9,
      title: "Building Real-time Applications with WebSockets",
      excerpt: "Create interactive real-time features using WebSockets and Socket.io.",
      category: "Web Development",
      author: "Sarah Johnson",
      date: "Dec 25, 2023",
      readTime: "8 min read",
    },
    {
      id: 10,
      title: "iOS Development with SwiftUI: A Beginner's Guide",
      excerpt: "Start building beautiful iOS applications with SwiftUI and modern Swift programming.",
      category: "Mobile Development",
      author: "Michael Chen",
      date: "Dec 22, 2023",
      readTime: "12 min read",
    },
    {
      id: 11,
      title: "Introduction to Machine Learning with Python",
      excerpt: "Get started with ML using scikit-learn, TensorFlow, and practical examples.",
      category: "AI & Machine Learning",
      author: "Emily Davis",
      date: "Dec 20, 2023",
      readTime: "16 min read",
    },
    {
      id: 12,
      title: "Blockchain Beyond Crypto: Enterprise Use Cases",
      excerpt: "Explore how blockchain technology is transforming supply chain, healthcare, and finance.",
      category: "Blockchain",
      author: "David Wilson",
      date: "Dec 18, 2023",
      readTime: "10 min read",
    },
  ];

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
            <h1>NexaVibe Blog</h1>
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
                <div key={blog.id} className={styles.blogCard}>
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
              <div key={blog.id} className={styles.blogArticleCard}>
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

