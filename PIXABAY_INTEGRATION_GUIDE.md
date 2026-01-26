# Pixabay Image Integration - Complete Guide

## Quick Setup (5 minutes)

### Step 1: Get Your Free API Key
1. Visit: https://pixabay.com/api/docs/
2. Click "Sign up for free"
3. Create account (email + password)
4. Go to your API keys page
5. Copy your API key

### Step 2: Setup Python Environment
```bash
# Windows
python scripts/setup_images.py

# macOS/Linux
python3 scripts/setup_images.py
```

### Step 3: Configure API Key
```bash
# Edit the file:
# scripts/pixabay_downloader.py

# Find this line:
PIXABAY_API_KEY = "YOUR_PIXABAY_API_KEY"

# Replace with your key:
PIXABAY_API_KEY = "12345678-abcdef123456"
```

### Step 4: Download Images
```bash
# Windows
python scripts/pixabay_downloader.py

# macOS/Linux
python3 scripts/pixabay_downloader.py
```

### Step 5: Use in Components
```jsx
import { useSectionImages } from '@/lib/useImages';
import Image from 'next/image';

export function ServiceCard() {
  const images = useSectionImages('services');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {images.map((img) => (
        <Image
          key={img.path}
          src={img.path}
          alt={img.title}
          width={800}
          height={600}
          className="w-full h-96 object-cover rounded-lg"
        />
      ))}
    </div>
  );
}
```

---

## What Gets Downloaded

The script automatically downloads images for:

### 1. Hero Section (2 images)
- Business technology & digital transformation
- Used as background or featured image

### 2. Services Section (4 images)
- Software development
- Web design
- Digital marketing
- Cloud computing

### 3. Portfolio Section (6 images)
- Website design examples
- Mobile apps
- Startups
- Innovation projects

### 4. Testimonials Section (4 images)
- Team & success
- Happy clients
- Business culture

### 5. About Section (3 images)
- Team collaboration
- Office culture
- Professional environment

### 6. Pricing Section (2 images)
- Pricing/value concepts
- Cost/benefit visuals

---

## File Structure After Download

```
your-project/
├── public/
│   └── images/
│       ├── hero/
│       │   ├── hero_business_0.jpg
│       │   └── hero_technology_0.jpg
│       ├── services/
│       │   ├── services_software_0.jpg
│       │   ├── services_web_design_0.jpg
│       │   ├── services_marketing_0.jpg
│       │   └── services_cloud_0.jpg
│       ├── portfolio/
│       │   ├── portfolio_website_0.jpg
│       │   └── ... (6 total)
│       ├── testimonials/
│       │   └── ... (4 images)
│       ├── about/
│       │   └── ... (3 images)
│       ├── pricing/
│       │   └── ... (2 images)
│       └── manifest.json (auto-generated)
├── src/
│   └── lib/
│       ├── useImages.ts (auto-generated hook)
│       └── images.ts (auto-generated manifest)
└── scripts/
    └── pixabay_downloader.py
```

---

## CSS Styling for Images

### Hero Section Images
```css
/* In your page.module.css or globals.css */
.heroImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.7) contrast(1.1);
  border-radius: 12px;
}

.heroImageWrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
```

### Service Card Images
```css
.serviceImage {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  transition: transform 0.3s ease;
}

.serviceCard:hover .serviceImage {
  transform: scale(1.05);
}

.serviceCardImageWrapper {
  position: relative;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}
```

### Portfolio Images
```css
.portfolioImage {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.portfolioCard:hover .portfolioImage {
  transform: scale(1.08);
  filter: brightness(1.2) saturate(1.1);
}

.portfolioImageOverlay {
  position: absolute;
  inset: 0;
  background: rgba(59, 130, 246, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portfolioCard:hover .portfolioImageOverlay {
  opacity: 1;
}
```

### Testimonial Section Images
```css
.testimonialBackground {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
  z-index: 0;
}

.testimonialCard {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}
```

### About Section Images
```css
.aboutImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
}

.aboutImageGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.aboutImageCard {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 1;
}

.aboutImageCard:hover .aboutImage {
  transform: scale(1.1);
}
```

### Pricing Section Images
```css
.pricingImage {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.pricingCardImage {
  position: relative;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}
```

---

## React Component Examples

### Hero Section with Image
```jsx
import Image from 'next/image';
import { useSectionImages } from '@/lib/useImages';

export function HeroSection() {
  const images = useSectionImages('hero');
  const heroImage = images[0];

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Image */}
      {heroImage && (
        <Image
          src={heroImage.path}
          alt={heroImage.title}
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover -z-10"
          sizes="100vw"
        />
      )}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          Transform Your Digital Presence
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Premium web development and design solutions
        </p>
        <button className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark">
          Get Started
        </button>
      </div>
    </section>
  );
}
```

### Service Cards with Images
```jsx
import Image from 'next/image';
import { useSectionImages } from '@/lib/useImages';

export function ServicesGrid() {
  const images = useSectionImages('services');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <div
          key={image.path}
          className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image.path}
              alt={image.title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-black mb-2">
              {image.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Professional {image.title.toLowerCase()} solutions
            </p>
            <a href="#" className="text-primary hover:underline">
              Learn more →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Portfolio Gallery
```jsx
import Image from 'next/image';
import { useSectionImages } from '@/lib/useImages';

export function PortfolioGallery() {
  const images = useSectionImages('portfolio');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div
          key={image.path}
          className="group relative overflow-hidden rounded-xl cursor-pointer"
        >
          <Image
            src={image.path}
            alt={image.title}
            width={500}
            height={400}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-white text-xl font-bold mb-2">
                {image.title}
              </h3>
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                View Project
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Testimonials with Background Images
```jsx
import Image from 'next/image';
import { useSectionImages } from '@/lib/useImages';

export function TestimonialCards() {
  const images = useSectionImages('testimonials');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {images.map((image, index) => (
        <div key={image.path} className="relative overflow-hidden rounded-lg">
          {/* Background Image */}
          <Image
            src={image.path}
            alt={image.title}
            width={600}
            height={400}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />

          {/* Card Content */}
          <div className="relative z-10 p-8 bg-white/95 backdrop-blur">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400">★★★★★</div>
            </div>
            
            <p className="text-gray-700 mb-6">
              "Amazing service! They delivered exactly what we needed. Highly recommended!"
            </p>
            
            <div className="font-semibold">
              <p className="text-black">Client Name</p>
              <p className="text-gray-500 text-sm">Company Name</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Attribution & Credits

All images are from Pixabay (https://pixabay.com):
- **Free to use** for personal and commercial projects
- **No attribution required** (but appreciated)
- Each image has photographer credit in the manifest.json

---

## Troubleshooting

### "API key not found" error
```
Solution: Replace PIXABAY_API_KEY in scripts/pixabay_downloader.py
```

### "No images downloaded"
```
Solution: 
1. Check API key is correct
2. Verify internet connection
3. Check Pixabay API rate limits (50/hour for free)
```

### Images not showing in browser
```
Solution:
1. Check if files exist in: public/images/
2. Use correct path: /images/section/filename.jpg
3. Rebuild Next.js: npm run build
```

### Image quality issues
```
Solution:
1. Pixabay downloader uses high-quality images
2. Optimize with Next.js Image component
3. Adjust CSS filters/brightness as needed
```

---

## Performance Optimization

### Next.js Image Optimization
```jsx
<Image
  src={image.path}
  alt={image.title}
  width={800}
  height={600}
  // Adds: automatic resizing, lazy loading, format optimization
  quality={85}  // Good balance between quality and size
  placeholder="blur"  // Blur while loading
  blurDataURL="data:image/..." // Optional blur placeholder
/>
```

### CSS for Loading States
```css
.imageLoading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Refresh Images

To download new images (e.g., different keywords):

1. Edit `SECTIONS_CONFIG` in `pixabay_downloader.py`
2. Run the script again:
   ```bash
   python scripts/pixabay_downloader.py
   ```
3. New images overwrite old ones

---

## Need Different Images?

Modify `SECTIONS_CONFIG` in `pixabay_downloader.py`:

```python
SECTIONS_CONFIG = {
    "hero": {
        "keywords": ["your custom keywords here"],
        "count": 3,  # How many images to download
        "description": "Your description"
    },
    # ... etc
}
```

Then re-run the script!
