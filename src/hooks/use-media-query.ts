"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a CSS media query without setting state inside an effect, so the value
 * is already correct on the first client render instead of flipping after mount.
 * Returns false during SSR, where there is no viewport to measure.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True when the visitor has asked the OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on phone-sized viewports and on touch devices without hover. */
export function useIsSmallScreen(maxWidth = 767): boolean {
  return useMediaQuery(`(max-width: ${maxWidth}px), (hover: none) and (pointer: coarse)`);
}
