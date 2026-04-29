import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "W3Tech",
    short_name: "W3Tech",
    description:
      "Premium IT and software development company for web, mobile, AI, and growth-focused digital products.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff8c00",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
