# CSS to Tailwind Quick Conversion - Cheat Sheet

## Module Import Removal
```jsx
// DELETE THIS LINE:
import styles from "./Component.module.css"
```

## Common CSS Property Conversions

| CSS Property | Tailwind Class | Usage |
|---|---|---|
| `display: flex` | `flex` | `className="flex"` |
| `flex-direction: column` | `flex-col` | `className="flex-col"` |
| `justify-content: center` | `justify-center` | `className="justify-center"` |
| `align-items: center` | `items-center` | `className="items-center"` |
| `gap: 16px` | `gap-4` | `className="gap-4"` |
| `padding: 24px` | `p-6` | `className="p-6"` |
| `margin: 12px` | `m-3` | `className="m-3"` |
| `width: 100%` | `w-full` | `className="w-full"` |
| `height: 100vh` | `h-screen` | `className="h-screen"` |
| `background-color: #3b82f6` | `bg-primary` | `className="bg-primary"` |
| `color: white` | `text-white` | `className="text-white"` |
| `font-size: 24px` | `text-2xl` | `className="text-2xl"` |
| `font-weight: bold` | `font-bold` | `className="font-bold"` |
| `border-radius: 8px` | `rounded-lg` | `className="rounded-lg"` |
| `box-shadow: ...` | `shadow-lg` | `className="shadow-lg"` |
| `position: absolute` | `absolute` | `className="absolute"` |
| `position: fixed` | `fixed` | `className="fixed"` |
| `position: relative` | `relative` | `className="relative"` |
| `top: 0; left: 0` | `inset-0` | `className="inset-0"` |
| `transition: all 0.3s` | `transition-all duration-300` | `className="transition-all duration-300"` |
| `opacity: 0.5` | `opacity-50` | `className="opacity-50"` |
| `z-index: 50` | `z-50` | `className="z-50"` |

## Spacing Scale Reference

| Tailwind | Pixels | Tailwind | Pixels |
|----------|--------|----------|--------|
| p-1, m-1 | 4px | p-6, m-6 | 24px |
| p-2, m-2 | 8px | p-8, m-8 | 32px |
| p-3, m-3 | 12px | p-10, m-10 | 40px |
| p-4, m-4 | 16px | p-12, m-12 | 48px |
| p-5, m-5 | 20px | p-16, m-16 | 64px |

## Font Size Scale

| Tailwind | Size | Line Height |
|----------|------|-------------|
| text-xs | 12px | 16px |
| text-sm | 14px | 20px |
| text-base | 16px | 24px |
| text-lg | 18px | 28px |
| text-xl | 20px | 28px |
| text-2xl | 24px | 32px |
| text-3xl | 30px | 36px |
| text-4xl | 36px | 40px |
| text-5xl | 48px | 52px |
| text-6xl | 60px | 64px |

## Hover State Patterns

```jsx
// Hover with color change
<button className="bg-blue-500 hover:bg-blue-600">

// Hover with shadow
<div className="shadow-md hover:shadow-2xl transition-shadow">

// Hover with scale
<div className="transform hover:scale-105 transition-transform">

// Hover with translate
<div className="hover:-translate-y-2 transition-transform">

// Combined
<div className="hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
```

## Responsive Design Patterns

```jsx
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">

// Different padding on mobile vs desktop
<div className="px-4 md:px-8 py-6 md:py-12">

// Hide on mobile
<div className="hidden md:block">

// Different grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Text size responsive
<h1 className="text-3xl md:text-4xl lg:text-5xl">
```

## Glass Effect (Frosted Glass)

```jsx
<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl">
  {/* Content */}
</div>
```

## Gradient Backgrounds

```jsx
// Using custom gradient from tailwind.config.ts
<div className="bg-gradient-primary">

// Using Tailwind gradient
<div className="bg-gradient-to-r from-blue-500 to-black">

// Using Tailwind gradient with angle
<div className="bg-gradient-to-br from-primary via-transparent to-secondary">
```

## Text Styling

```jsx
// Basic text styling
<p className="text-base text-gray-600 font-semibold leading-relaxed">

// Truncate text
<p className="truncate">Long text that gets cut off...</p>

// Line clamp (multiple lines)
<p className="line-clamp-3">Text limited to 3 lines...</p>

// Text decoration
<p className="underline">Underlined text</p>
<p className="line-through">Strikethrough text</p>
```

## Border Utilities

```jsx
// Basic border
<div className="border border-gray-300">

// Border color
<div className="border-2 border-primary">

// Border on specific sides
<div className="border-t border-l border-red-500">

// Rounded corners
<div className="rounded-lg">
<div className="rounded-full"> {/* Circle */}
```

## Display Utilities

```jsx
<div className="block">Block element</div>
<div className="inline">Inline element</div>
<div className="inline-block">Inline-block</div>
<div className="grid">Grid layout</div>
<div className="flex">Flex layout</div>
<div className="hidden">Hidden</div>
```

## Z-Index (Stacking)

```jsx
<div className="z-10">Above</div>
<div className="z-0">Below</div>
<div className="z-50">Top layer</div>
<div className="z-auto">Auto</div>
```

## Cursor Utilities

```jsx
<button className="cursor-pointer">
<div className="cursor-default">
<a className="cursor-pointer">
```

## Flexbox Alignment

```jsx
{/* Horizontal centering */}
<div className="flex justify-center">

{/* Vertical centering */}
<div className="flex items-center">

{/* Both directions */}
<div className="flex items-center justify-center h-screen">

{/* Space between */}
<div className="flex justify-between">

{/* Space around */}
<div className="flex justify-around">

{/* Space evenly */}
<div className="flex justify-evenly">
```

## Grid Layout

```jsx
{/* 2 columns */}
<div className="grid grid-cols-2 gap-4">

{/* 3 columns */}
<div className="grid grid-cols-3 gap-6">

{/* Auto columns */}
<div className="grid grid-cols-auto gap-4">

{/* Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{/* Rows */}
<div className="grid grid-rows-4 gap-2">
```

## Transform & Transition

```jsx
// Scale
<div className="hover:scale-105 transition-transform">

// Rotate
<div className="rotate-45">

// Translate
<div className="translate-x-2 translate-y-4">

// Skew
<div className="skew-x-12">

// Transitions
<div className="transition duration-300">
<div className="transition-all duration-500 ease-in-out">
```

## Before/After Pseudo-elements

```jsx
// In custom CSS using @layer
@layer components {
  .card::after {
    @apply absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent;
  }
}
```

## Overflow Utilities

```jsx
<div className="overflow-hidden">No scrollbars</div>
<div className="overflow-auto">Scrollbar if needed</div>
<div className="overflow-x-hidden">Hide horizontal scroll</div>
<div className="overflow-y-auto">Vertical scroll only</div>
```

## Object Fit (Images)

```jsx
<img className="w-full h-64 object-cover" />
<img className="w-full h-64 object-contain" />
<img className="w-full h-64 object-fill" />
```

## Quick Conversion Template

**Before:**
```jsx
import styles from "./Component.module.css"

export function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
      <p className={styles.description}>Description</p>
      <button className={styles.button}>Click me</button>
    </div>
  )
}
```

**After:**
```jsx
// No import needed!

export function Component() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-black mb-4">Title</h1>
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">Description</p>
      <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:shadow-lg transition-all">
        Click me
      </button>
    </div>
  )
}
```

---

## Pro Tips

1. **Mobile First**: Always start with base styles, then add `md:`, `lg:` prefixes
2. **Use VSCode Extension**: Install "Tailwind CSS IntelliSense" for autocomplete
3. **Hover States**: Add `hover:` prefix to almost any class
4. **Dark Mode**: Use `dark:` prefix (enable in tailwind.config.ts)
5. **Custom Classes**: Use `@apply` in CSS for repeated patterns
6. **Class Ordering**: Use Prettier plugin for consistent class ordering
7. **Arbitrary Values**: Use `[value]` for custom values like `w-[340px]`

---

## Installation Checklist (Already Done ✓)

- [x] Install tailwindcss, postcss, autoprefixer
- [x] Create tailwind.config.ts
- [x] Create postcss.config.ts
- [x] Update globals.css with @tailwind directives
- [x] Custom colors and animations added to config
- [ ] Start converting components!
