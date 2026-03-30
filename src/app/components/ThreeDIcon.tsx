"use client";

import { useState } from "react";
import styles from "./ThreeDIcon.module.css";

interface ThreeDIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
}

export default function ThreeDIcon({ 
  color = "#3b82f6", 
  secondaryColor = "#f97316",
  size = 60 
}: ThreeDIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`${styles.iconContainer} ${isHovered ? styles.hovered : ""}`}
      style={{ 
        "--icon-color": color,
        "--secondary-color": secondaryColor,
        "--size": `${size}px`
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.icon3D}>
        <div className={styles.face + " " + styles.front}>
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            width="60%" 
            height="60%"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className={styles.face + " " + styles.back}></div>
        <div className={styles.face + " " + styles.right}></div>
        <div className={styles.face + " " + styles.left}></div>
        <div className={styles.face + " " + styles.top}></div>
        <div className={styles.face + " " + styles.bottom}></div>
      </div>
      <div className={styles.accentSphere}></div>
    </div>
  );
}

