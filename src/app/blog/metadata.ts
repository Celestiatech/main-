import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Blog — Web Development, AI & SEO Insights",
  description: "Practical articles on web development, AI, SEO and technology from the W3Tech engineering team. Real costs, real trade-offs, and how we actually build.",
  path: "/blog",
});
