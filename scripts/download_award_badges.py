#!/usr/bin/env python3
"""Download award badge images from Pixabay API"""

import os
import json
import requests
from pathlib import Path

# Pixabay API key
PIXABAY_API_KEY = "54376552-34638ab03f61651c840239ef8"
PIXABAY_API_URL = "https://pixabay.com/api/"

# Awards to download with search queries
AWARDS = {
    "upwork": {
        "query": "award badge",
        "filename": "upwork.png"
    },
    "clutch": {
        "query": "certificate award",
        "filename": "clutch.png"
    },
    "techreviewer": {
        "query": "best developer",
        "filename": "techreviewer.png"
    },
    "goodfirms": {
        "query": "excellence award",
        "filename": "goodfirms.png"
    },
    "appfutura": {
        "query": "verified badge",
        "filename": "appfutura.png"
    }
}

def download_image(search_query, filename, output_dir):
    """Download image from Pixabay API"""
    try:
        # Search for image
        params = {
            "key": PIXABAY_API_KEY,
            "q": search_query,
            "per_page": 1
        }
        
        print(f"Searching Pixabay for: {search_query}...")
        response = requests.get(PIXABAY_API_URL, params=params, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        
        if data["hits"]:
            image_url = data["hits"][0]["webformatURL"]
            print(f"  Found image, downloading...")
            
            # Download the image
            img_response = requests.get(image_url, timeout=10)
            img_response.raise_for_status()
            
            # Save to file
            filepath = os.path.join(output_dir, filename)
            with open(filepath, "wb") as f:
                f.write(img_response.content)
            
            file_size = os.path.getsize(filepath) / 1024
            print(f"  ✓ Saved: {filename} ({file_size:.1f} KB)")
            return filepath
        else:
            print(f"  ✗ No images found for: {search_query}")
            return None
            
    except Exception as e:
        print(f"  ✗ Error downloading {search_query}: {str(e)}")
        return None

def main():
    # Create output directory
    output_dir = Path(__file__).parent.parent / "public" / "images" / "awards"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Downloading award badge images to: {output_dir}\n")
    
    downloaded_files = {}
    
    # Download each award image
    for award_name, award_info in AWARDS.items():
        result = download_image(
            award_info["query"],
            award_info["filename"],
            str(output_dir)
        )
        if result:
            downloaded_files[award_name] = f"/images/awards/{award_info['filename']}"
    
    print(f"\n✓ Downloaded {len(downloaded_files)}/{len(AWARDS)} images\n")
    
    # Display mapping for page.tsx
    print("Image paths for page.tsx awards array:")
    print("==========================================")
    for award_name, path in downloaded_files.items():
        print(f"{award_name}: {path}")
    
    return downloaded_files

if __name__ == "__main__":
    main()
