import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Case Studies — Real Projects & Measurable Results",
  description: "Detailed case studies showing our development process, technical decisions and measurable results for clients across web, mobile and AI projects.",
  path: "/work",
});
