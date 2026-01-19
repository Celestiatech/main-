"use client";

import Image from "next/image";
import { useState } from "react";

interface ServiceIconProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ServiceIcon({ src, alt, className = "" }: ServiceIconProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`serviceIcon ${className}`}>
      <div style={{ 
        width: "100%", 
        height: "100%", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isLoaded ? "transparent" : "#f0f0f0",
        borderRadius: "8px"
      }}>
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          onLoad={() => setIsLoaded(true)}
          style={{
            objectFit: "contain",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out"
          }}
        />
      </div>
    </div>
  );
}

