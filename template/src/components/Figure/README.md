# Figure Component

A semantic HTML `<figure>` component with optional `<figcaption>` for displaying images with captions. Use this component when you need to associate descriptive text or captions with images, as it provides better semantic meaning than the standalone Image component.

## When to Use

- **Use Figure component when:**

  - You have an image that needs a caption or description
  - The image is content that should be referenced in text (e.g., "See Figure 1")
  - You want to provide additional context or attribution for an image
  - The image is part of an article, blog post, or documentation

- **Use Image component when:**
  - You need a standalone image without a caption
  - The image is decorative or functional (like icons, logos, or UI elements)
  - You're building layouts where the image is more of a design element

## Usage

```astro
---
import Figure from "@/components/Figure/Figure.astro";
---

<!-- Basic figure with caption -->
<Figure
  src="/images/chart.jpg"
  alt="Sales performance chart showing 25% growth"
  caption="Figure 1: Sales performance increased by 25% over the last quarter"
/>

<!-- Aligned figure -->
<Figure
  src="/images/diagram.jpg"
  alt="Process flow diagram"
  caption="The complete workflow from start to finish"
  align="right"
  size="medium"
/>

<!-- Figure without caption (still uses semantic figure element) -->
<Figure
  src="/images/hero.jpg"
  alt="Team collaboration in office"
  size="large"
  align="center"
/>
```

## Props

| Prop           | Type                                       | Default      | Description                                   |
| -------------- | ------------------------------------------ | ------------ | --------------------------------------------- |
| `src`          | `string`                                   | **required** | Image source path                             |
| `alt`          | `string`                                   | **required** | Alternative text for accessibility            |
| `caption`      | `string`                                   | `undefined`  | Caption text to display in figcaption         |
| `align`        | `"left" \| "right" \| "center"`            | `"left"`     | Image alignment                               |
| `size`         | `"small" \| "medium" \| "large" \| "auto"` | `"auto"`     | Maximum width constraint                      |
| `lazy`         | `boolean`                                  | `true`       | Enable lazy loading                           |
| `fallback`     | `string`                                   | `undefined`  | Fallback image URL if main image fails        |
| `placeholder`  | `boolean`                                  | `true`       | Show placeholder while loading                |
| `priority`     | `boolean`                                  | `false`      | Disable lazy loading for above-fold images    |
| `width`        | `number`                                   | `400`        | Image width                                   |
| `height`       | `number`                                   | `300`        | Image height                                  |
| `class`        | `string`                                   | `""`         | Additional CSS classes for the image          |
| `wrapperClass` | `string`                                   | `""`         | Additional CSS classes for the figure wrapper |

## Accessibility Features

- Uses semantic `<figure>` and `<figcaption>` elements
- Automatically links images to captions with `aria-describedby` (handled by global image handler)
- Proper alt text support
- Keyboard navigation support
- Screen reader optimized
- Relies on global image handler for loading states and error handling

## Styling

The component uses BEM methodology with the `.ast-figure` block:

- `.ast-figure` - Main figure container
- `.ast-figure__img` - Image element
- `.ast-figure__caption` - Caption text
- `.ast-figure--left/right/center` - Alignment modifiers
- `.ast-figure--small/medium/large/auto` - Size modifiers
- `.ast-figure--with-caption` - Applied when caption is present
- `.ast-figure--loaded` - Applied after image loads
- `.ast-figure--error` - Applied if image fails to load
