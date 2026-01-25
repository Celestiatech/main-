import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Terms of Service",
  description: "Read NexaVibe Solutions Terms of Service. Understand the terms and conditions for using our services and website.",
  path: "/terms-of-service",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
