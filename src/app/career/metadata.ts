import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Careers — Join Our Engineering & Design Team",
  description: "Explore career opportunities at W3Tech in web development, mobile development, AI and design. See our open roles and how our hiring process works.",
  path: "/career",
});
