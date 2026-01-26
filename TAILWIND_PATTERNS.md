# Tailwind CSS Conversion - Code Patterns & Examples

## 1. HEADER COMPONENT - Conversion Examples

### Pattern 1: Navigation Container
**Before (Module CSS):**
```jsx
<header className={styles.header}>
  <nav className={styles.headerMain}>
```

**After (Tailwind):**
```jsx
<header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-lg border-b border-blue-500/20 shadow-lg">
  <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
```

### Pattern 2: Navigation Links
**Before:**
```jsx
<Link href="/services" className={styles.navLink}>
  Services
</Link>
```

**After:**
```jsx
<Link 
  href="/services" 
  className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200"
>
  Services
</Link>
```

### Pattern 3: Mobile Menu Button
**Before:**
```jsx
<button className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}>
```

**After:**
```jsx
<button 
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className={`md:hidden flex flex-col gap-1 p-2 transition-all ${
    isMobileMenuOpen ? 'gap-2' : 'gap-1'
  }`}
>
  <span className="w-6 h-0.5 bg-black"></span>
  <span className="w-6 h-0.5 bg-black"></span>
  <span className="w-6 h-0.5 bg-black"></span>
</button>
```

### Pattern 4: Dropdown Menu
**Before:**
```jsx
<div className={`${styles.navDropdown} ${isServicesDropdownOpen ? styles.active : ''}`}>
```

**After:**
```jsx
<div className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${
  isServicesDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
}`}>
```

---

## 2. HERO SECTION - Conversion Examples

### Hero Container
**Before:**
```jsx
<section className={`${styles.hero} hero-enhanced`}>
  <div className={styles.heroBg}>
    <video autoPlay loop muted playsInline>
```

**After:**
```jsx
<section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20">
  {/* Background video wrapper */}
  <div className="absolute inset-0 w-full h-full">
    <video 
      autoPlay 
      loop 
      muted 
      playsInline
      className="w-full h-full object-cover"
    >
```

### Hero Overlay
**Before:**
```jsx
<div className={styles.heroOverlay}></div>
```

**After:**
```jsx
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
```

### Hero Content
**Before:**
```jsx
<div className={styles.heroContent}>
  <h1 className={styles.heroTitle}>
```

**After:**
```jsx
<div className="relative z-10 text-center max-w-4xl mx-auto px-6">
  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
    Transform Your Digital Presence
  </h1>
```

### Hero Subtitle
**Before:**
```jsx
<p className={`${styles.heroSubtitle} heroSubtitleAnimate`}>
```

**After:**
```jsx
<p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
```

### Hero Actions (CTA Buttons)
**Before:**
```jsx
<div className={`${styles.heroActions} heroActionsAnimate`}>
  <button className={styles.btn}>
```

**After:**
```jsx
<div className="flex gap-4 justify-center flex-wrap animate-fade-in">
  <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:shadow-lg transition-all duration-300 transform hover:scale-105">
```

---

## 3. SERVICE CARDS - Conversion Examples

### Service Card Container
**Before:**
```jsx
<div className={`${styles.serviceCard} service-card-enhanced animate-on-scroll stagger-${(index % 4) + 1}`}>
```

**After:**
```jsx
<div className={`group relative bg-white/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 stagger-${(index % 4) + 1}`}>
  {/* Animated gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
```

### Service Icon
**Before:**
```jsx
<div className={styles.serviceIcon}>
```

**After:**
```jsx
<div className="relative z-10 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
  {/* Icon content */}
</div>
```

### Service Title & Description
**Before:**
```jsx
<h3 className={styles.serviceTitle}>
<p className={styles.serviceDescription}>
```

**After:**
```jsx
<h3 className="text-xl md:text-2xl font-bold text-black mb-3 relative z-10">
  {service.title}
</h3>
<p className="text-gray-600 text-sm md:text-base relative z-10 mb-4">
  {service.description}
</p>
```

---

## 4. FOOTER SECTION - Conversion Examples

### Footer Container
**Before:**
```jsx
<footer className={styles.footer}>
  <div className={styles.container}>
    <div className={styles.footerGrid}>
```

**After:**
```jsx
<footer className="bg-black text-white py-16 border-t border-blue-500/20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```

### Footer Column
**Before:**
```jsx
<div className={styles.footerColumn}>
  <h4 className={styles.footerTitle}>
```

**After:**
```jsx
<div>
  <h4 className="text-lg font-bold mb-4 text-white">
    Company
  </h4>
  <ul className="space-y-3">
```

### Footer Links
**Before:**
```jsx
<Link href="/about" className={styles.footerLink}>
```

**After:**
```jsx
<Link 
  href="/about"
  className="text-gray-300 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
>
  About Us
</Link>
```

---

## 5. BUTTON VARIATIONS - All Tailwind

### Primary Button
```jsx
<button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:shadow-lg transition-all duration-300 transform hover:scale-105">
  Get Started
</button>
```

### Secondary Button
```jsx
<button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
  Learn More
</button>
```

### Ghost Button (Transparent)
```jsx
<button className="px-6 py-3 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-300">
  View Details
</button>
```

### Button with Icon
```jsx
<button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:shadow-lg transition-all">
  <svg className="w-5 h-5" />
  Get Started
</button>
```

---

## 6. FORM ELEMENTS - Tailwind Patterns

### Input Field
```jsx
<input
  type="email"
  placeholder="your@email.com"
  className="w-full px-4 py-3 bg-white/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
/>
```

### Textarea
```jsx
<textarea
  placeholder="Your message..."
  className="w-full px-4 py-3 bg-white/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
  rows={5}
/>
```

### Form Group
```jsx
<div className="mb-6">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Full Name
  </label>
  <input
    type="text"
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
  />
</div>
```

---

## 7. GRID & LAYOUT PATTERNS

### 2-Column Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</div>
```

### 3-Column Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</div>
```

### 4-Column Responsive Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</div>
```

---

## 8. RESPONSIVE UTILITIES QUICK REFERENCE

### Common Breakpoints
- `sm:` - 640px (small tablets)
- `md:` - 768px (tablets)
- `lg:` - 1024px (desktops)
- `xl:` - 1280px (large desktops)
- `2xl:` - 1536px (extra large)

### Mobile-First Pattern (RECOMMENDED)
```jsx
{/* Mobile: full width, flex column */}
<div className="w-full flex flex-col gap-4
             md:flex-row md:w-2/3
             lg:w-1/2 lg:gap-8">
```

### Hide/Show Based on Screen Size
```jsx
<div className="hidden md:block">
  {/* Only visible on medium and larger screens */}
</div>

<div className="block md:hidden">
  {/* Only visible on mobile */}
</div>
```

---

## 9. ANIMATION UTILITIES

### Fade In
```jsx
<div className="animate-fade-in">Content fades in</div>
```

### Slide In
```jsx
<div className="animate-slide-in-right">Content slides from right</div>
<div className="animate-slide-in-left">Content slides from left</div>
```

### Float Effect
```jsx
<div className="animate-float">Content floats up and down</div>
```

### Pulse
```jsx
<div className="animate-pulse-custom">Pulsing element</div>
```

### Delay Animations
```jsx
<div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
  {/* Delayed by 200ms */}
</div>
```

---

## 10. SHADOW & GLOW EFFECTS

### Basic Shadows
```jsx
<div className="shadow-sm">Subtle shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-2xl">Extra large shadow</div>
```

### Hover Shadow
```jsx
<div className="shadow-md hover:shadow-2xl transition-shadow duration-300">
  Card with hover shadow
</div>
```

### Glow Effect (Custom CSS)
Add to `globals.css`:
```css
@layer components {
  .glow-primary {
    @apply shadow-lg;
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
  }
}
```

Usage:
```jsx
<div className="glow-primary">Glowing element</div>
```

---

## CONVERSION CHECKLIST

Use this when converting each component:

- [ ] Remove `import styles from "./Component.module.css"`
- [ ] Find all `className={styles.xxx}` references
- [ ] Replace with appropriate Tailwind classes
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Check hover/active states
- [ ] Verify animations work smoothly
- [ ] Test on dark mode (if applicable)
- [ ] Delete the `.module.css` file once converted
- [ ] Run `npm run build` to verify

---

## PERFORMANCE TIPS

1. Use `@apply` in CSS only for repeated patterns
2. Avoid inline styles when Tailwind class exists
3. Use responsive classes instead of media queries
4. Leverage Tailwind's purging (unused styles removed in production)
5. Keep component JSX clean and readable
