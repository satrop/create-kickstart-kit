# Image Component

A flexible and feature-rich image component with support for lazy loading, fallbacks, captions, and multiple alignment options.

## Features

- **Asset Optimization**: Automatic asset path optimization
- **Lazy Loading**: Built-in lazy loading support with priority override
- **Fallback Images**: Support for fallback images on load failure
- **Captions**: Optional image captions
- **Alignment**: Left, right alignment with text wrapping
- **Responsive Sizing**: Multiple size presets and auto-sizing
- **Loading States**: Integration with global image loading states
- **Accessibility**: Proper alt text and semantic structure

## Basic Usage

```astro
---
import Image from "../../components/Image/Image.astro";
---

<Image
  src="/images/example.jpg"
  alt="Description of the image"
  caption="This is an image caption"
/>
```

## Props

| Prop          | Type                                       | Default     | Description                               |
| ------------- | ------------------------------------------ | ----------- | ----------------------------------------- |
| `src`         | `string`                                   | Required    | Source URL for the image                  |
| `alt`         | `string`                                   | Required    | Alt text for accessibility                |
| `align`       | `"left" \| "right"`                        | `"left"`    | Image alignment with text wrapping        |
| `size`        | `"small" \| "medium" \| "large" \| "auto"` | `"medium"`  | Predefined size constraints               |
| `caption`     | `string`                                   | `undefined` | Optional caption text                     |
| `lazy`        | `boolean`                                  | `true`      | Enable lazy loading                       |
| `fallback`    | `string`                                   | `undefined` | Fallback image URL                        |
| `placeholder` | `boolean`                                  | `true`      | Show placeholder during loading           |
| `priority`    | `boolean`                                  | `false`     | Override lazy loading for critical images |
| `width`       | `number`                                   | `400`       | Image width                               |
| `height`      | `number`                                   | `300`       | Image height                              |
| `class`       | `string`                                   | `""`        | Additional CSS classes                    |

## Examples

### With Caption

```astro
<Image
  src="/images/landscape.jpg"
  alt="Beautiful mountain landscape"
  caption="The stunning Swiss Alps at sunset"
/>
```

### Aligned Images

```astro
<!-- Left-aligned with text wrapping -->
<Image
  src="/images/portrait.jpg"
  alt="Person portrait"
  align="left"
  size="small"
/>

<!-- Right-aligned with text wrapping -->
<Image
  src="/images/product.jpg"
  alt="Product showcase"
  align="right"
  size="medium"
/>
```

### Priority Loading

```astro
<!-- For above-the-fold images -->
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  priority={true}
  size="large"
/>
```

### With Fallback

```astro
<Image
  src="/images/might-not-exist.jpg"
  alt="Content image"
  fallback="/images/placeholder.jpg"
/>
```

## Size Options

- **small**: Max width 200px
- **medium**: Max width 400px
- **large**: Max width 600px
- **auto**: Full width of container

## Loading States

The component integrates with the global image loading system that provides:

- `.ast-img--loading`: Applied during image load
- `.ast-img--loaded`: Applied when image loads successfully
- `.ast-img--error`: Applied when image fails to load

These classes are automatically managed by the global `imageHandler.js`.

## Accessibility

- Requires `alt` text for all images
- Semantic HTML structure
- Proper focus handling
- Screen reader friendly captions

## CSS Custom Properties

The component respects global CSS custom properties:

- `--gray-100`: Light gray for placeholders
- `--gray-200`: Medium gray for loading states

## Browser Support

- Modern browsers with CSS Grid support
- Progressive enhancement for older browsers
- Graceful degradation for disabled JavaScript
