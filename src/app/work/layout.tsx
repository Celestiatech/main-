import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Case Studies",
  description: "Detailed case studies showcasing our development process, technical solutions, and measurable results. Learn how we've transformed businesses through innovative technology.",
  path: "/work",
});

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
