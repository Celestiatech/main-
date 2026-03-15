#!/usr/bin/env python3
"""Create placeholder badge images for awards section"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# Create output directory
output_dir = Path(__file__).parent.parent / "public" / "images" / "awards"
output_dir.mkdir(parents=True, exist_ok=True)

AWARDS = {
    "upwork.png": {
        "title": "Upwork",
        "subtitle": "Top Rated Plus",
        "color": (14, 102, 102)  # Upwork green
    },
    "clutch.png": {
        "title": "Clutch",
        "subtitle": "B2B Leader 2024",
        "color": (0, 115, 170)  # Clutch blue
    },
    "techreviewer.png": {
        "title": "TechReviewer",
        "subtitle": "Best Developer",
        "color": (255, 102, 0)  # Orange
    },
    "goodfirms.png": {
        "title": "GoodFirms",
        "subtitle": "Excellence Award",
        "color": (68, 166, 67)  # GoodFirms green
    },
    "appfutura.png": {
        "title": "AppFutura",
        "subtitle": "Verified Partner",
        "color": (66, 133, 244)  # AppFutura blue
    }
}

def create_badge_image(filename, title, subtitle, color):
    """Create a placeholder badge image"""
    # Create a 300x300 image with rounded corners effect
    img = Image.new('RGBA', (300, 300), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw circle background
    circle_color = color + (255,)  # Add alpha channel
    draw.ellipse([10, 10, 290, 290], fill=circle_color)
    
    # Draw badge text
    try:
        font_title = ImageFont.truetype("arial.ttf", 28)
        font_subtitle = ImageFont.truetype("arial.ttf", 16)
    except:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
    
    # Draw title
    title_bbox = draw.textbbox((0, 0), title, font=font_title)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (300 - title_width) // 2
    draw.text((title_x, 100), title, fill=(255, 255, 255, 255), font=font_title)
    
    # Draw subtitle
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=font_subtitle)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (300 - subtitle_width) // 2
    draw.text((subtitle_x, 160), subtitle, fill=(255, 255, 255, 255), font=font_subtitle)
    
    # Save image
    filepath = output_dir / filename
    img.save(filepath, 'PNG')
    print(f"✓ Created: {filename}")

print("Creating placeholder award badge images...\n")

for filename, info in AWARDS.items():
    create_badge_image(filename, info["title"], info["subtitle"], info["color"])

print(f"\n✓ Created {len(AWARDS)} placeholder badges in {output_dir}")
print("\nImage paths for page.tsx:")
print("================================")
for filename in AWARDS.keys():
    badge_name = filename.replace('.png', '')
    print(f'{badge_name}: "/images/awards/{filename}"')
