# 🎨 Design Enhancement Quick Reference

## Color System
```
Primary Blue:     #3B82F6 (rgb(59, 130, 246))
Secondary Purple: #8B5CF6 (rgb(139, 92, 246))
Success Green:    #10B981 (rgb(16, 185, 129))
Text Dark:        #1F2937
Text Light:       #64748B
Background:       #F9FAFB
```

## Shadow Effects

### Standard Shadow
```css
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
```

### Premium Double Shadow
```css
box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2),
            0 0 40px rgba(139, 92, 246, 0.1);
```

### Button Shadow
```css
box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4),
            0 0 20px rgba(139, 92, 246, 0.2);
```

## Gradient System

### Background Gradient
```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 255, 0.95) 100%);
```

### Text Gradient
```css
background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Glow Gradient
```css
background: radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
```

## Border Styles

### Default Border
```css
border: 1px solid rgba(59, 130, 246, 0.2);
```

### Premium Border
```css
border: 2px solid rgba(59, 130, 246, 0.2);
```

### Hover Border
```css
border-color: rgba(59, 130, 246, 0.5);
```

## Hover Effects

### Standard Lift
```css
transform: translateY(-8px);
```

### Premium Lift with Scale
```css
transform: translateY(-12px) scale(1.03);
```

### Icon Hover
```css
transform: scale(1.15) rotate(10deg);
```

## Transition Timing

### Standard
```css
transition: all 0.3s ease;
```

### Premium (Cubic Bezier)
```css
transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

## Component Quick Guide

### Service Cards
- Background: Light gradient (white to light blue)
- Hover: Lift 12px + Scale 1.02
- Border: 1px, blue with 0.2 opacity, increases to 0.5 on hover
- Border-radius: 28px

### Pricing Cards
- Background: Light gradient (white to light blue)
- Hover: Lift 8px + Scale 1.03
- Popular: Scale 1.05 + Enhanced shadow
- Border-radius: 24px

### Portfolio Cards
- Background: Light gradient (white to light blue)
- Image height: 250px
- Hover: Image zoom 1.08x
- Border-radius: 24px

### Award Cards
- Size: 80x80px
- Background: Circular gradient
- Hover: Lift 8px + Scale 1.05
- Border-radius: 50% (circular)

### Buttons
- Background: Blue to purple gradient
- Padding: 14px minimum
- Border-radius: 12px
- Hover: Lift 3px + Enhanced shadow
- Font-weight: 700 (bold)

### Form Inputs
- Background: Semi-transparent white (0.5)
- Border: 1px blue with 0.2 opacity
- Focus: Increase opacity + Add glow shadow
- Border-radius: 12px

## Animation Keyframes

### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

### Pulse Animation
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
```

### Shimmer Loading
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

## Border Radius Sizes
- Cards: 24px (modern)
- Buttons: 12px
- Inputs: 12px
- Icons: 50% (circular)
- Small elements: 8px

## Spacing Scale
- Base unit: 12px
- Padding variants: 8px, 12px, 16px, 20px, 24px, 32px, 40px
- Margin variants: 12px, 16px, 20px, 24px, 40px, 60px, 80px, 100px

## Font Weights
- Body text: 400-500
- Labels: 600
- Headers: 700
- Emphasis: 700

## Letter Spacing
- Normal: 0px
- Subtle: 0.3px
- Emphasis: 0.5px
- Caps: 0.5-1px

## Z-Index Scale
- Header: 1000
- Dropdowns: 900
- Modal: 800
- Overlay: 700
- Content: 1-100

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Accessibility
- All animations support `prefers-reduced-motion`
- Minimum color contrast ratio: 4.5:1
- Focus states clearly visible
- Keyboard navigation supported

## File Organization
```
src/app/
├── page.module.css          (Main styles + premium enhancements)
├── globals.css              (Global utilities + buttons)
├── design-tokens.css        (Color variables)
├── pricing/page.module.css  (Pricing page specific)
└── components/
    ├── Header.module.css
    ├── Footer.module.css
    └── etc.
```

---

**Last Updated**: January 26, 2026  
**Version**: 2.0 - Premium Design System
