import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Pricing & Plans — Transparent Development Costs",
  description: "Transparent pricing for web development, mobile apps and custom software. Fixed-price and dedicated team models, with a written scope before work begins.",
  path: "/pricing",
});
