import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Request a Free Project Proposal & Fixed Quote",
  description: "Tell us about your project and get a free written proposal with scope, timeline and a fixed price. No obligation, and a clear answer if we are not the right fit.",
  path: "/proposal",
});
