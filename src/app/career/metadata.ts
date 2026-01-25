import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Careers",
  description: "Join NexaVibe Solutions - a premium IT development company. Explore career opportunities in mobile development, web development, AI, blockchain, and more.",
  path: "/career",
});
