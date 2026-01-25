"use client";

import Image from "next/image";

interface IconImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Optimized icon image component for inline use
 * Replaces inline <img> tags with Next.js Image component
 */
export function IconImage({ 
  src, 
  alt, 
  width = 16, 
  height = 16, 
  className = "" 
}: IconImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      style={{ display: "inline", verticalAlign: "middle" }}
    />
  );
}
