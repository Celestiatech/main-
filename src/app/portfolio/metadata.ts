import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Portfolio",
  description: "Explore our portfolio of successful projects - mobile apps, web applications, games, and enterprise solutions. See how we've helped 2,500+ clients achieve their goals.",
  path: "/portfolio",
});
