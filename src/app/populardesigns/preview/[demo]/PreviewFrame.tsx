"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./page.module.css";

type PreviewFrameProps = {
  src: string;
  title: string;
};

const BLOCKED_SELECTORS = [
  ".DZ-bt-buy-now",
  ".DZ-bt-support-now",
  ".DZ-theme-btn",
  ".DZBuyNowBtn",
  ".DZSupportBtn",
  ".DZBuyNowRegularBtn",
  ".DZBuyNowExtendedBtn",
  "#DZScript",
  'a[href*="1.envato.market"]',
  'a[href*="support.w3itexperts.com"]',
];

export function PreviewFrame({ src, title }: PreviewFrameProps) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const sanitizeFrame = useCallback(() => {
    const doc = frameRef.current?.contentDocument;

    if (!doc) {
      return;
    }

    const existingStyle = doc.getElementById("celestiatech-preview-cleanup");

    if (!existingStyle) {
      const style = doc.createElement("style");
      style.id = "celestiatech-preview-cleanup";
      style.textContent = `
        ${BLOCKED_SELECTORS.join(",\n")} {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      doc.head.appendChild(style);
    }

    doc.querySelectorAll(BLOCKED_SELECTORS.join(",")).forEach((node) => {
      node.remove();
    });
  }, []);

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const handleLoad = () => {
      sanitizeFrame();

      const doc = frame.contentDocument;
      const body = doc?.body;

      if (!body) {
        return;
      }

      const observer = new MutationObserver(() => {
        sanitizeFrame();
      });

      observer.observe(body, {
        childList: true,
        subtree: true,
      });

      frame.dataset.cleanupObserver = "attached";
      (frame as HTMLIFrameElement & { __cleanupObserver?: MutationObserver }).__cleanupObserver = observer;
    };

    frame.addEventListener("load", handleLoad);

    return () => {
      frame.removeEventListener("load", handleLoad);
      (frame as HTMLIFrameElement & { __cleanupObserver?: MutationObserver }).__cleanupObserver?.disconnect();
    };
  }, [sanitizeFrame]);

  return <iframe ref={frameRef} className={styles.frame} src={src} title={title} />;
}
