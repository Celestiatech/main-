import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Website Development Services for Growing Brands",
  description: "Custom website development built to convert and to last. Fast, accessible, SEO-ready sites with a written scope, a fixed price and full code ownership.",
  path: "/website-development-services",
});
