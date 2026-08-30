import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Terms of Service — Using the W3Tech Website",
  description: "The terms governing use of the W3Tech website and services, covering acceptable use, intellectual property, liability, and how disputes are resolved.",
  path: "/terms-of-service",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
