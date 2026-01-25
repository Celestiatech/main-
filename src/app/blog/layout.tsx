import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Blog",
  description: "Latest insights on mobile app development, web development, AI, blockchain, and technology trends. Expert articles from NexaVibe Solutions team.",
  path: "/blog",
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
