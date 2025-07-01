# Figure Component

A semantic HTML5 figure component for displaying images with optional captions. Perfect for showcasing images, charts, diagrams, and other visual content that requires proper semantic markup and accessibility.

## Features

- **Semantic HTML**: Uses proper `<figure>` and `<figcaption>` elements
- **Multiple Sizes**: Small, medium, large, and full-width options
- **Flexible Alignment**: Left, center, and right alignment
- **Rich Captions**: Support for formatted text in captions
- **Responsive Design**: Adapts gracefully across all screen sizes
- **Lazy Loading**: Built-in performance optimization
- **Error Handling**: Graceful fallback for failed images
- **Accessibility**: Screen reader friendly with proper semantics
- **Dark Mode**: Automatic dark mode support

## Usage

```astro
---
import { Figure } from '../components/Figure';
---

<Figure
  src="/images/chart.jpg"
  alt="Sales data visualization"
  caption="Q4 sales performance showing 15% growth year-over-year"
  size="large"
  align="center"
/>
```

## Props

| Prop              | Type                                       | Default      | Description                                |
| ----------------- | ------------------------------------------ | ------------ | ------------------------------------------ |
| `src`             | `string`                                   | **required** | Image source URL                           |
| `alt`             | `string`                                   | **required** | Alt text for accessibility                 |
| `caption`         | `string`                                   | `undefined`  | Figure caption text (supports HTML)        |
| `size`            | `"small" \| "medium" \| "large" \| "full"` | `"medium"`   | Figure size preset                         |
| `align`           | `"left" \| "center" \| "right"`            | `"center"`   | Figure alignment                           |
| `lazy`            | `boolean`                                  | `true`       | Enable lazy loading                        |
| `fallback`        | `string`                                   | `undefined`  | Fallback image URL if main image fails     |
| `placeholder`     | `boolean`                                  | `true`       | Show placeholder on error                  |
| `priority`        | `boolean`                                  | `false`      | Disable lazy loading for above-fold images |
| `width`           | `number`                                   | `undefined`  | Explicit width                             |
| `height`          | `number`                                   | `undefined`  | Explicit height                            |
| `class`           | `string`                                   | `""`         | Additional CSS classes for image           |
| `figcaptionClass` | `string`                                   | `""`         | Additional CSS classes for caption         |

## Size Options

- **Small**: Max width 300px - Good for thumbnails or small diagrams
- **Medium**: Max width 600px - Standard figure images
- **Large**: Max width 900px - Featured images and detailed visuals
- **Full**: Full container width - Hero images and full-width visuals

## Alignment Options

- **Left**: Figure aligns to the left side
- **Center**: Figure centers in the container (default)
- **Right**: Figure aligns to the right side

## Examples

### Basic Figure

```astro
<Figure
  src="/images/product.jpg"
  alt="Product showcase"
/>
```

### Figure with Caption

```astro
<Figure
  src="/images/architecture.jpg"
  alt="System architecture diagram"
  caption="Our microservices architecture with API gateway and service mesh"
  size="large"
/>
```

### Left-Aligned Small Figure

```astro
<Figure
  src="/images/profile.jpg"
  alt="Team member photo"
  caption="<strong>Jane Doe</strong>, Lead Developer"
  size="small"
  align="left"
/>
```

### Full-Width Hero Figure

```astro
<Figure
  src="/images/hero-banner.jpg"
  alt="Company headquarters"
  caption="Our global headquarters in downtown"
  size="full"
  priority={true}
  lazy={false}
/>
```

### Figure with Fallback

```astro
<Figure
  src="/images/external-chart.jpg"
  alt="Performance metrics"
  fallback="/images/chart-placeholder.jpg"
  caption="Performance metrics for the last quarter"
/>
```

## Rich Caption Formatting

Captions support HTML formatting for enhanced presentation:

```astro
<Figure
  src="/images/team.jpg"
  alt="Development team"
  caption="Our amazing development team at the <em>annual conference</em>.
           Photo by <strong>John Smith</strong>.
           <a href='/about/team'>Meet the team</a>."
/>
```

## Responsive Behavior

- **Desktop**: Figures maintain their size and alignment settings
- **Tablet**: Large figures scale down appropriately
- **Mobile**: All figures become full-width for better readability
- **Print**: Optimized layout for print media

## Full-Bleed Option

On large screens (1200px+), the `full` size option creates a full-viewport-width figure that extends beyond container boundaries - perfect for hero images and impactful visuals.

## CSS Classes

The component generates the following CSS classes:

- `.figure`: Main figure wrapper
- `.figure--small` / `.figure--medium` / `.figure--large` / `.figure--full`: Size classes
- `.figure--left` / `.figure--center` / `.figure--right`: Alignment classes
- `.figure--with-caption`: Added when caption is present
- `.figure__image`: The image element
- `.figure__caption`: The figcaption element

## Accessibility Features

- **Semantic HTML**: Proper `<figure>` and `<figcaption>` structure
- **Alt Text**: Required alt attribute for screen readers
- **Focus Management**: Keyboard navigation support
- **High Contrast**: Adapts to high contrast mode
- **Screen Reader**: Optimized for assistive technologies

## Performance Features

- **Lazy Loading**: Images load as they enter the viewport
- **Asset Optimization**: Automatic image optimization through asset pipeline
- **Loading States**: Visual feedback during image loading
- **Error Handling**: Graceful degradation for failed images

## Best Practices

1. **Alt Text**: Write descriptive alt text that explains the image content
2. **Captions**: Use captions to provide additional context, not just repeat alt text
3. **Size Selection**: Choose appropriate sizes based on content importance
4. **Performance**: Use `priority={true}` only for above-fold images
5. **Semantics**: Reserve figures for content that adds meaning to your text
