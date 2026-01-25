import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Pricing & Plans",
  description: "Transparent pricing for mobile app development, web development, and custom software solutions. Fixed-price and dedicated team models. Get a free quote today.",
  path: "/pricing",
});

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
