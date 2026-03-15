"""
Pixabay Image Downloader & Integrator
Downloads images from Pixabay and integrates them into your website sections
"""

import os
import json
import requests
from pathlib import Path
from typing import Optional, List, Dict

# Configuration
PIXABAY_API_KEY = "54376552-34638ab03f61651c840239ef8"  # Get from https://pixabay.com/api/docs/
PROJECT_ROOT = Path(__file__).parent
PUBLIC_DIR = PROJECT_ROOT / "public" / "images"
SECTIONS_CONFIG = {
    "hero": {
        "keywords": ["business technology digital transformation"],
        "count": 2,
        "description": "Hero section background images"
    },
    "services": {
        "keywords": ["software development", "web design", "digital marketing", "cloud computing"],
        "count": 4,
        "description": "Service card icons/images"
    },
    "portfolio": {
        "keywords": ["website design", "mobile app", "startup", "innovation"],
        "count": 6,
        "description": "Portfolio project showcase images"
    },
    "testimonials": {
        "keywords": ["team success happy clients business"],
        "count": 4,
        "description": "Testimonial background images"
    },
    "about": {
        "keywords": ["team collaboration office culture"],
        "count": 3,
        "description": "About section team images"
    },
    "pricing": {
        "keywords": ["pricing plans value cost"],
        "count": 2,
        "description": "Pricing section images"
    }
}

class PixabayDownloader:
    """Download and manage images from Pixabay"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://pixabay.com/api/"
        self.downloaded_images = []
    
    def search_images(self, query: str, per_page: int = 3) -> List[Dict]:
        """Search for images on Pixabay"""
        # Pixabay API requires per_page to be between 3 and 200
        per_page = max(3, min(200, per_page))
        
        params = {
            "key": self.api_key,
            "q": query,
            "image_type": "photo",
            "per_page": per_page,
            "order": "popular"
        }
        
        try:
            response = requests.get(self.base_url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if data["hits"]:
                print(f"✓ Found {len(data['hits'])} images for: '{query}'")
                return data["hits"]
            else:
                print(f"✗ No images found for: '{query}'")
                return []
        except requests.exceptions.RequestException as e:
            print(f"✗ Error searching Pixabay: {e}")
            return []
    
    def download_image(self, image_url: str, save_path: Path) -> bool:
        """Download image from URL and save locally"""
        try:
            # Create directory if it doesn't exist
            save_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Download image
            response = requests.get(image_url, timeout=30)
            response.raise_for_status()
            
            # Save image
            with open(save_path, 'wb') as f:
                f.write(response.content)
            
            print(f"✓ Downloaded: {save_path.name}")
            self.downloaded_images.append(str(save_path.relative_to(PROJECT_ROOT)))
            return True
        except Exception as e:
            print(f"✗ Error downloading {image_url}: {e}")
            return False
    
    def download_section_images(self, section: str, config: Dict) -> List[str]:
        """Download all images for a section"""
        print(f"\n{'='*60}")
        print(f"Downloading images for: {section.upper()}")
        print(f"{'='*60}")
        
        section_images = []
        keywords = config["keywords"]
        per_keyword = max(1, config["count"] // len(keywords))
        
        for keyword in keywords:
            images = self.search_images(keyword, per_page=per_keyword)
            
            for idx, image in enumerate(images):
                # Get high quality image URL
                image_url = image["largeImageURL"]
                filename = f"{section}_{keyword.replace(' ', '_')}_{idx}.jpg"
                save_path = PUBLIC_DIR / section / filename
                
                if self.download_image(image_url, save_path):
                    section_images.append({
                        "filename": filename,
                        "path": f"/images/{section}/{filename}",
                        "title": image.get("tags", "").split(",")[0],
                        "photographer": image.get("user", "Unknown"),
                        "url": image.get("pageURL", "")
                    })
        
        return section_images

def create_image_manifest(images_by_section: Dict) -> None:
    """Create a JSON manifest of downloaded images"""
    manifest_path = PROJECT_ROOT / "public" / "images" / "manifest.json"
    
    manifest = {
        "generated": "2026-01-26",
        "description": "Image manifest for all downloaded Pixabay images",
        "sections": images_by_section
    }
    
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\n✓ Created image manifest: {manifest_path}")

def generate_component_code(images_by_section: Dict) -> str:
    """Generate React component code using the images"""
    code = """/**
 * Auto-generated component with Pixabay images
 * Images downloaded from: https://pixabay.com
 * Last updated: 2026-01-26
 */

import Image from 'next/image';

export const SECTION_IMAGES = {
"""
    
    for section, images in images_by_section.items():
        code += f"  {section}: [\n"
        for img in images:
            code += f"""    {{
      path: "{img['path']}",
      title: "{img['title']}",
      photographer: "{img['photographer']}"
    }},
"""
        code += "  ],\n"
    
    code += """};

// Example usage in components:
// import { SECTION_IMAGES } from '@/lib/images';
// 
// <Image
//   src={SECTION_IMAGES.services[0].path}
//   alt={SECTION_IMAGES.services[0].title}
//   width={800}
//   height={600}
//   className="rounded-lg"
// />
"""
    
    return code

def main():
    """Main execution"""
    print("\n" + "="*60)
    print("PIXABAY IMAGE DOWNLOADER & INTEGRATOR")
    print("="*60)
    
    # Check API key
    if PIXABAY_API_KEY == "YOUR_PIXABAY_API_KEY":
        print("\n⚠️  SETUP REQUIRED:")
        print("1. Go to: https://pixabay.com/api/docs/")
        print("2. Sign up for free account")
        print("3. Copy your API key")
        print("4. Replace PIXABAY_API_KEY in this script")
        print("\nℹ️  Free tier allows 50 requests/hour")
        return
    
    # Initialize downloader
    downloader = PixabayDownloader(PIXABAY_API_KEY)
    images_by_section = {}
    
    # Download images for each section
    for section, config in SECTIONS_CONFIG.items():
        images = downloader.download_section_images(section, config)
        images_by_section[section] = images
    
    # Create manifest
    create_image_manifest(images_by_section)
    
    # Generate component code
    component_code = generate_component_code(images_by_section)
    component_path = PROJECT_ROOT / "src" / "lib" / "images.ts"
    component_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(component_path, 'w') as f:
        f.write(component_code)
    
    print(f"\n✓ Generated component code: {component_path}")
    
    # Summary
    print("\n" + "="*60)
    print("DOWNLOAD SUMMARY")
    print("="*60)
    total_images = sum(len(images) for images in images_by_section.values())
    print(f"Total images downloaded: {total_images}")
    print(f"Sections updated: {len(images_by_section)}")
    print(f"Location: {PUBLIC_DIR}")
    print("\n✓ Ready to use in components!")
    print("\nNext steps:")
    print("1. Import from '@/lib/images'")
    print("2. Use in your components")
    print("3. Update CSS for image styling")

if __name__ == "__main__":
    main()
