import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';
import { BLOG_POSTS } from '@/lib/blogs';
import { TOOLS } from '@/lib/tools-catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/pricing',
    '/portfolio',
    '/work',
    '/contact',
    '/blog',
    '/career',
    '/popular-tools',
    '/proposal',
    '/request-a-call',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/accessibility',
    // SEO landing pages
    '/startup-mvp-development',
    '/ai-development-company',
    '/hire-dedicated-developers',
    '/web-app-development-cost',
  ];

  // Generate sitemap entries
  const routes: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : path.includes('blog') ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path.includes('services') || path.includes('work') ? 0.9 : 0.8,
  }));

  // Add dynamic case study pages
  const caseStudies = ['healthtrack-pro']; // Add more as needed
  caseStudies.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  BLOG_POSTS.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  TOOLS.forEach((tool) => {
    routes.push({
      url: `${baseUrl}/popular-tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return routes;
}
