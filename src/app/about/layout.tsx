import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "About Us",
  description: "Learn about NexaVibe Solutions - a premium IT development company with 12+ years of experience, serving 2,500+ clients worldwide. Discover our team, mission, and expertise.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
