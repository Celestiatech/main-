"use client";

import React from "react";
import styles from "./Section.module.css";

export interface SectionProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "dark";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
  id?: string;
}

export function Section({
  children,
  variant = "default",
  padding = "lg",
  className = "",
  id,
}: SectionProps) {
  const baseClasses = `${styles.section} ${styles[variant]} ${styles[`padding-${padding}`]} ${className}`;

  return (
    <section className={baseClasses} id={id}>
      {children}
    </section>
  );
}
