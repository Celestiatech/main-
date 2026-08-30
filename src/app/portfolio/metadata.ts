import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Portfolio — Web, Mobile & AI Projects We Built",
  description: "Explore our portfolio of delivered projects across web applications, mobile apps and AI products. See the problem, the approach and the outcome for each.",
  path: "/portfolio",
});
