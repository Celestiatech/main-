/**
 * NexaVibe Solutions - Analytics & Tracking
 * Centralized analytics implementation
 */

type AnalyticsProvider = "ga4" | "posthog";

interface AnalyticsConfig {
  measurementId?: string;
  apiKey?: string;
}

let analyticsInitialized = false;
let currentProvider: AnalyticsProvider | null = null;

/**
 * Initialize analytics provider
 */
export function initAnalytics(provider: AnalyticsProvider, config: AnalyticsConfig) {
  if (analyticsInitialized) return;

  currentProvider = provider;

  if (provider === "ga4" && config.measurementId) {
    // Initialize Google Analytics 4
    if (typeof window !== "undefined") {
      // Load gtag script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.measurementId}');
      `;
      document.head.appendChild(script2);
    }
  } else if (provider === "posthog" && config.apiKey) {
    // Initialize PostHog
    if (typeof window !== "undefined") {
      // PostHog initialization would go here
      console.log("PostHog initialization not implemented yet");
    }
  }

  analyticsInitialized = true;
}

/**
 * Track page view
 */
export function trackPageView(path: string, referrer?: string) {
  if (!analyticsInitialized || !currentProvider) return;

  if (currentProvider === "ga4" && typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
      page_path: path,
      page_referrer: referrer,
    });
  }
}

/**
 * Track custom event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (!analyticsInitialized || !currentProvider) return;

  if (currentProvider === "ga4" && typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaText: string, location: string, pathname?: string) {
  trackEvent("cta_click", {
    cta_text: ctaText,
    cta_location: location,
    page_path: pathname,
  });
}

/**
 * Track form step completion
 */
export function trackFormStep(formName: string, step: number, totalSteps: number) {
  trackEvent("form_step", {
    form_name: formName,
    step: step,
    total_steps: totalSteps,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, step?: number) {
  trackEvent("form_submit", {
    form_name: formName,
    form_step: step,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number, path: string) {
  if (depth === 25 || depth === 50 || depth === 75 || depth === 100) {
    trackEvent("scroll_depth", {
      depth: depth,
      page_path: path,
    });
  }
}

/**
 * Hook for scroll tracking
 */
export function useScrollTracking(path: string) {
  if (typeof window === "undefined") return;

  let maxScroll = 0;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      trackScrollDepth(maxScroll, path);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }
}
