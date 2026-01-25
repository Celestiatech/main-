"use client";

import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  onClick,
}: CardProps) {
  const baseClasses = `${styles.card} ${styles[variant]} ${styles[`padding-${padding}`]} ${className}`;
  
  const Component = onClick ? "button" : "div";
  const props = onClick ? { onClick, role: "button", tabIndex: 0 } : {};

  return (
    <Component className={baseClasses} {...props}>
      {children}
    </Component>
  );
}
