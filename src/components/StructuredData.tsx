"use client";

import React from "react";

/**
 * Component to render structured data as JSON-LD script
 * Client component for use in server components
 */
export function StructuredData({ data }: { data: object | object[] }) {
  const jsonLd = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
