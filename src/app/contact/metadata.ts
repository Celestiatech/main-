import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Contact Us — Start Your Project Conversation",
  description: "Get in touch with W3Tech about your web, mobile or AI project. Tell us what you are building and we will come back with scope, timeline and a fixed price.",
  path: "/contact",
});
