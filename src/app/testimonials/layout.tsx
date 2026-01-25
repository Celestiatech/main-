import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Client Testimonials",
  description: "Read testimonials from our satisfied clients. 98% client satisfaction rate. See what CEOs, CTOs, and founders say about working with NexaVibe Solutions.",
  path: "/testimonials",
});

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
