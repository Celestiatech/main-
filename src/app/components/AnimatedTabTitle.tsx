"use client";

import { useEffect, useMemo, useRef } from "react";

export function AnimatedTabTitle({
  baseTitle,
  frames,
  intervalMs = 1800,
}: {
  baseTitle: string;
  frames?: string[];
  intervalMs?: number;
}) {
  const computedFrames = useMemo(() => {
    const fallback = [
      baseTitle,
      "W3Tech — Web • App • UI/UX",
      "W3Tech — SEO • Growth • Performance",
      "W3Tech — Get a Free Consultation",
    ];
    const list = (frames && frames.length ? frames : fallback).filter(Boolean);
    return list.length ? list : [baseTitle];
  }, [baseTitle, frames]);

  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.title = baseTitle;
      return;
    }

    const setTitle = (value: string) => {
      document.title = value;
    };

    const stop = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };

    const start = () => {
      stop();
      setTitle(computedFrames[indexRef.current % computedFrames.length]);
      timerRef.current = window.setInterval(() => {
        indexRef.current = (indexRef.current + 1) % computedFrames.length;
        setTitle(computedFrames[indexRef.current]);
      }, intervalMs);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stop();
        setTitle(baseTitle);
      } else {
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
      setTitle(baseTitle);
    };
  }, [baseTitle, computedFrames, intervalMs]);

  return null;
}

