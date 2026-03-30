"use client";

import { useEffect } from "react";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import { usePathname } from "next/navigation";

export function AnalyticsInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics (GA4)
    // Replace with your actual GA4 Measurement ID
    const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-XXXXXXXXXX";
    
    if (measurementId && measurementId !== "G-XXXXXXXXXX") {
      initAnalytics("ga4", { measurementId });
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      trackPageView(pathname, document.referrer);
    }
  }, [pathname]);

  return null;
}
