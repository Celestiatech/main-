"use client";

import { useState } from "react";
import styles from "./ThreeDSpinningBadge.module.css";

interface ThreeDSpinningBadgeProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
}

export default function ThreeDSpinningBadge({ 
  children, 
  color = "var(--primary)",
  size = 100 
}: ThreeDSpinningBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.badgeContainer} ${isHovered ? styles.hovered : ""}`}
      style={{ 
        width: size, 
        height: size,
        "--badge-color": color
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.badge3D}>
        <div className={styles.badgeFace + " " + styles.front}>
          {children}
        </div>
        <div className={styles.badgeFace + " " + styles.back}>
          <div className={styles.innerContent}>★</div>
        </div>
        <div className={styles.badgeFace + " " + styles.right}></div>
        <div className={styles.badgeFace + " " + styles.left}></div>
        <div className={styles.badgeFace + " " + styles.top}></div>
        <div className={styles.badgeFace + " " + styles.bottom}></div>
      </div>
    </div>
  );
}

