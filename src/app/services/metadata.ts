import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Our Services — Web, Mobile, AI & Cloud Development",
  description: "Full-service development covering web applications, mobile apps, AI solutions, cloud infrastructure and design, delivered by senior engineers.",
  path: "/services",
});
