import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Book a Free Consultation Call With Our Team",
  description: "Book a free consultation call with a senior W3Tech engineer. Discuss your project, get honest technical guidance, and find out what it will realistically cost.",
  path: "/request-a-call",
});
