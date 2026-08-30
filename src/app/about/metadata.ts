import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "About Us — The Team Behind Your Next Build",
  description: "Learn about W3Tech, a development company building websites, web applications and AI products. Meet the team, our process, and how we work with clients.",
  path: "/about",
});
