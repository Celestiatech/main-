/**
 * Hook for managing and using downloaded images from Pixabay
 * Usage: const images = useSectionImages('services');
 */

'use client';

import { useMemo } from 'react';

export interface SectionImage {
  path: string;
  title: string;
  photographer: string;
}

export interface ImageManifest {
  [key: string]: SectionImage[];
}

// This will be populated by the pixabay_downloader.py script
const IMAGE_MANIFEST: ImageManifest = {
  hero: [],
  services: [],
  portfolio: [],
  testimonials: [],
  about: [],
  pricing: [],
};

/**
 * Hook to get images for a specific section
 * @param section - The section name (hero, services, etc.)
 * @returns Array of images for that section
 */
export function useSectionImages(section: keyof typeof IMAGE_MANIFEST) {
  return useMemo(() => {
    return IMAGE_MANIFEST[section] || [];
  }, [section]);
}

/**
 * Hook to get a random image from a section
 * Useful for rotating backgrounds or random cards
 */
export function useRandomImage(section: keyof typeof IMAGE_MANIFEST) {
  return useMemo(() => {
    const images = IMAGE_MANIFEST[section];
    if (images.length === 0) return null;
    return images[Math.floor(Math.random() * images.length)];
  }, [section]);
}

/**
 * Hook to get image by index
 */
export function getSectionImage(
  section: keyof typeof IMAGE_MANIFEST,
  index: number
): SectionImage | null {
  const images = IMAGE_MANIFEST[section];
  return images[index] || null;
}

/**
 * Utility: Get all available images
 */
export function getAllImages(): ImageManifest {
  return IMAGE_MANIFEST;
}

/**
 * Example Usage in Components:
 * 
 * import { useSectionImages, useRandomImage } from '@/lib/useImages';
 * import Image from 'next/image';
 * 
 * export function ServiceCard() {
 *   const images = useSectionImages('services');
 *   const randomImage = useRandomImage('testimonials');
 * 
 *   return (
 *     <div>
 *       {images.map((img) => (
 *         <Image
 *           key={img.path}
 *           src={img.path}
 *           alt={img.title}
 *           width={800}
 *           height={600}
 *           className="w-full h-96 object-cover rounded-lg"
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 */
