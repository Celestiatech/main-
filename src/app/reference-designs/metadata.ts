import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Reference Design Library for Web Projects",
  description: "An internal reference library of imported page layouts used to explore design directions during project discovery with W3Tech clients.",
  path: "/reference-designs",
  noIndex: true,
});
