# CSS Debug Utilities

Comprehensive CSS debugging tools to help diagnose layout, spacing, and styling issues during development.

## Quick Start

### Enable Debug Mode (Browser Console)

```javascript
// In browser DevTools console
window.debugCSS.enable()  // Enable full debug mode
window.debugCSS.disable() // Disable debug mode
```

## Debug Modes

### 1. **outline-all** (Default)
Shows outlines on all elements
```javascript
window.debugCSS.enable('outline-all')
```

### 2. **border**
Highlights elements with colored borders
```javascript
window.debugCSS.enable('border')
```

### 3. **flex**
Shows flex containers and children
```javascript
window.debugCSS.enable('flex')
```

### 4. **grid**
Highlights grid containers with visual grid
```javascript
window.debugCSS.enable('grid')
```

### 5. **spacing**
Shows padding and margin information
```javascript
window.debugCSS.enable('spacing')
```

### 6. **text**
Highlights all text elements with background
```javascript
window.debugCSS.enable('text')
```

### 7. **z-index**
Shows z-index values on elements
```javascript
window.debugCSS.enable('z-index')
```

### 8. **overflow**
Reveals overflow with visible property
```javascript
window.debugCSS.enable('overflow')
```

### 9. **slow-animations**
Slows down all animations (5s duration)
```javascript
window.debugCSS.enable('slow-animations')
```

### 10. **pause-animations**
Pauses all animations for inspection
```javascript
window.debugCSS.enable('pause-animations')
```

### 11. **responsive**
Shows current viewport size in bottom-right corner
```javascript
window.debugCSS.enable('responsive')
```

### 12. **grid-bg**
Adds a grid pattern background for alignment checking
```javascript
window.debugCSS.enable('grid-bg')
```

### 13. **a11y**
Highlights accessibility issues (focus states, links, buttons)
```javascript
window.debugCSS.enable('a11y')
```

### 14. **scroll-stack**
Special debugging for ScrollStack component
```javascript
window.debugCSS.enable('scroll-stack')
```

## Available Functions

### `window.debugCSS.enable(mode?)`
Enable a specific debug mode or full debug mode

**Example:**
```javascript
window.debugCSS.enable()              // Full debug
window.debugCSS.enable('grid')        // Grid debug
window.debugCSS.enable('scroll-stack') // ScrollStack debug
```

### `window.debugCSS.disable()`
Disable all debug modes

**Example:**
```javascript
window.debugCSS.disable()
```

### `window.debugCSS.addClass(element, debugClass)`
Add a debug class to a specific element

**Example:**
```javascript
const card = document.querySelector('.scroll-stack-card')
window.debugCSS.addClass(card, 'debug-border')
```

**Available Debug Classes:**
- `debug-border` - Red border
- `debug-bg` - Semi-transparent red background
- `debug-grid` - Show grid lines
- `debug-flex` - Highlight flex containers
- `debug-spacing` - Show margins/padding
- `debug-text` - Highlight text elements
- `debug-z-index` - Show z-index values
- `debug-overflow` - Show overflow
- `debug-slow` - Slow animations
- `debug-pause` - Pause animations
- `debug-visible` - Make hidden elements visible
- `debug-responsive` - Show viewport info
- `debug-grid-bg` - Add grid pattern
- `debug-scroll-stack` - ScrollStack debug

### `window.debugCSS.removeClass(element, debugClass)`
Remove a debug class from an element

**Example:**
```javascript
const card = document.querySelector('.scroll-stack-card')
window.debugCSS.removeClass(card, 'debug-border')
```

### `window.debugCSS.toggleClass(element, debugClass)`
Toggle a debug class on an element

**Example:**
```javascript
const card = document.querySelector('.scroll-stack-card')
window.debugCSS.toggleClass(card, 'debug-border') // Add or remove
```

### `window.debugCSS.logLayout(element)`
Log detailed layout information about an element

**Example:**
```javascript
const card = document.querySelector('.scroll-stack-card')
window.debugCSS.logLayout(card)

// Output includes:
// - Display type
// - Position
// - Width/Height
// - Top/Left offsets
// - Padding/Margin
// - Z-index
```

### `window.debugCSS.watch(element)`
Watch an element for DOM changes (mutations)

**Example:**
```javascript
const card = document.querySelector('.scroll-stack-card')
const observer = window.debugCSS.watch(card)

// To stop watching:
// observer.disconnect()
```

## React Usage

### Using Hook

```tsx
import { useCSSDebug } from '@/lib/use-debug'

export default function MyComponent() {
  // Enable debug in development only
  useCSSDebug(process.env.NODE_ENV === 'development')
  
  return <div>My Component</div>
}
```

### Using Wrapper Component

```tsx
import { DebugBoundary } from '@/lib/use-debug'

export default function Layout() {
  return (
    <DebugBoundary enabled={true} mode="scroll-stack">
      <YourApp />
    </DebugBoundary>
  )
}
```

### Using Debug Class Hook

```tsx
import { useDebugClass } from '@/lib/use-debug'
import { useRef } from 'react'

export default function Card() {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Add debug border in development
  useDebugClass(cardRef, 'debug-border', process.env.NODE_ENV === 'development')
  
  return <div ref={cardRef}>Card Content</div>
}
```

## HTML Attribute Method

Enable debug mode for entire page using HTML attribute:

```html
<html data-debug="true">
  <!-- All elements will have outlines -->
</html>
```

## CSS Classes Reference

### Container Debug
```css
.debug-containers    /* Highlight containers with 3px red outline */
.debug-outline-all   /* Outline all children elements */
```

### Layout Debug
```css
.debug-layout        /* Show block/inline behavior */
.debug-layout--block /* Highlight block elements */
.debug-layout--inline /* Highlight inline elements */
.debug-layout--flex  /* Highlight flex containers */
.debug-layout--grid  /* Highlight grid containers */
```

### Performance Debug
```css
.debug-perf         /* Highlight repaints with background */
```

### View/Viewport Debug
```css
.debug-viewport     /* Show current viewport size */
```

## ScrollStack Debug

Special debugging for ScrollStack component:

```javascript
window.debugCSS.enable('scroll-stack')
```

Shows:
- ScrollStack cards with magenta borders
- Cards container with green borders
- Main container with orange borders
- Helps identify positioning and layering issues

## Tips & Tricks

### 1. **Debug Multiple Elements**
```javascript
// Add debug class to all cards
document.querySelectorAll('.scroll-stack-card').forEach(card => {
  window.debugCSS.addClass(card, 'debug-border')
})
```

### 2. **Check Element Layout**
```javascript
const element = document.querySelector('.your-selector')
window.debugCSS.logLayout(element)
```

### 3. **Slow-Motion Debugging**
```javascript
// Slow down animations to see what's happening
window.debugCSS.enable('slow-animations')
```

### 4. **Accessibility Audit**
```javascript
// Check focus states and accessibility
window.debugCSS.enable('a11y')
```

### 5. **Responsive Testing**
```javascript
// See viewport size as you resize
window.debugCSS.enable('responsive')
```

### 6. **Grid Alignment**
```javascript
// Add background grid for alignment
document.body.classList.add('debug-grid-bg')
```

## Disable All Debug Modes

```javascript
window.debugCSS.disable()
```

## Performance Impact

Debug modes add:
- Outlines/borders (CSS only, minimal performance impact)
- Color overlays (CSS only, minimal performance impact)
- Observer (light performance impact)
- Slow animations (intentional slowdown)

**Recommendation:** Only enable during active debugging sessions. Disable before deploying to production.

## Troubleshooting

### Debug Utilities Not Available?
Make sure the debug helper is initialized:
```javascript
// In your component or app initialization
import { initializeDebugGlobals } from '@/lib/debug-helper'
initializeDebugGlobals()
```

### CSS Not Applying?
Ensure `/src/lightswind.css` is imported in your main CSS file:
```css
@import '../lightswind.css';
```

### Z-Index Issues?
Use the z-index debug mode:
```javascript
window.debugCSS.enable('z-index')
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE: ❌ Not supported

## Advanced Usage

### Create Custom Debug Mode

Add to `/src/lightswind.css`:
```css
.debug-custom {
  outline: 2px dashed #your-color !important;
  background-color: rgba(...) !important;
}
```

Then use:
```javascript
document.body.classList.add('debug-custom')
```

## Examples

### Debug ScrollStack Layout
```javascript
// 1. Enable scroll-stack debug
window.debugCSS.enable('scroll-stack')

// 2. Log element info
const card = document.querySelector('.scroll-stack-card')
window.debugCSS.logLayout(card)

// 3. Watch for changes
const observer = window.debugCSS.watch(card)
```

### Performance Profile
```javascript
// 1. Pause animations to prevent timing issues
window.debugCSS.enable('pause-animations')

// 2. Open DevTools Performance tab
// 3. Record session
// 4. Analyze results
```

### Accessibility Check
```javascript
// Check all focus states and links
window.debugCSS.enable('a11y')

// Tab through page to see focus indicators
```

---

**Last Updated:** March 30, 2026
**Version:** 1.0.0
