import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Client Portal — Project Updates & Deliverables",
  description: "Secure client portal for W3Tech projects. Track milestones, review deliverables, and access files for your active web, mobile and AI development work.",
  path: "/clients",
});
