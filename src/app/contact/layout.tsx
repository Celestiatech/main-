import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Contact Us",
  description: "Get in touch with NexaVibe Solutions. Offices in Dubai, UAE and Mohali, India. Contact us for mobile app development, web development, and custom software solutions.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
