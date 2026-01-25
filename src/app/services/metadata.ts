import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Our Services",
  description: "Comprehensive IT services including mobile app development, web development, game development, AI solutions, blockchain, and DevOps. Expert team delivering premium solutions.",
  path: "/services",
});
