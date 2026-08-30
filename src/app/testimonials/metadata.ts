import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Client Testimonials & Reviews of Our Work",
  description: "Read what founders, CTOs and marketing leads say about working with W3Tech, in their own words, after their projects went live.",
  path: "/testimonials",
});
