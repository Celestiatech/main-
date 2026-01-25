"use client";

import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  asLink = false,
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  if (asLink && href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}
