#!/usr/bin/env python3
"""
Quick setup script for Pixabay image integration
Run: python scripts/setup_images.py
"""

import os
import sys
import subprocess
from pathlib import Path

def install_requirements():
    """Install required Python packages"""
    print("Installing required packages...")
    packages = ["requests"]
    
    for package in packages:
        try:
            __import__(package)
            print(f"✓ {package} already installed")
        except ImportError:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"✓ {package} installed")

def create_directories():
    """Create necessary image directories"""
    print("\nCreating image directories...")
    base_dir = Path(__file__).parent.parent / "public" / "images"
    
    sections = ["hero", "services", "portfolio", "testimonials", "about", "pricing"]
    
    for section in sections:
        section_dir = base_dir / section
        section_dir.mkdir(parents=True, exist_ok=True)
        print(f"✓ Created: {section_dir}")

def show_api_key_instructions():
    """Show instructions for getting Pixabay API key"""
    print("\n" + "="*60)
    print("PIXABAY API KEY SETUP")
    print("="*60)
    print("""
1. Open: https://pixabay.com/api/docs/
2. Click "Sign up for free"
3. Create your free account
4. Navigate to your API key page
5. Copy your API key
6. Update the PIXABAY_API_KEY in pixabay_downloader.py

FREE TIER LIMITS:
- 50 API requests per hour
- High-quality images
- Attribution required (included in downloader)

Example:
    PIXABAY_API_KEY = "12345678-1234567890abcdef"
""")

def main():
    print("\n" + "="*70)
    print("PIXABAY IMAGE INTEGRATION - SETUP WIZARD")
    print("="*70)
    
    # Install dependencies
    install_requirements()
    
    # Create directories
    create_directories()
    
    # Show instructions
    show_api_key_instructions()
    
    print("\n" + "="*70)
    print("SETUP COMPLETE!")
    print("="*70)
    print("""
Next steps:
1. Get your Pixabay API key (instructions above)
2. Open: scripts/pixabay_downloader.py
3. Replace PIXABAY_API_KEY with your key
4. Run: python scripts/pixabay_downloader.py
5. Images will download to: public/images/
""")

if __name__ == "__main__":
    main()
