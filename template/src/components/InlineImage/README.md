# InlineImage Component

A flexible inline image component designed to be embedded within text content with text wrapping around it. Perfect for blog posts, articles, and content where images need to flow naturally with text.

## Features

- **Text Wrapping**: Images float left or right with text wrapping around them
- **Multiple Sizes**: Small, medium, large, and auto sizing options
- **Responsive**: Automatically adjusts on mobile devices
- **Lazy Loading**: Built-in lazy loading support
- **Error Handling**: Graceful fallback for failed image loads
- **Captions**: Optional caption support
- **Accessibility**: Proper alt text and semantic structure

## Usage

```astro
---
import { InlineImage } from '../components/InlineImage';
---

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <InlineImage
    src="/images/example.jpg"
    alt="Example image"
    align="left"
    size="medium"
    caption="This is an example image"
  />
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
</p>
```

## Props

| Prop          | Type                                       | Default      | Description                                |
| ------------- | ------------------------------------------ | ------------ | ------------------------------------------ |
| `src`         | `string`                                   | **required** | Image source URL                           |
| `alt`         | `string`                                   | **required** | Alt text for accessibility                 |
| `align`       | `"left" \| "right"`                        | `"left"`     | Float alignment for text wrapping          |
| `size`        | `"small" \| "medium" \| "large" \| "auto"` | `"medium"`   | Image size preset                          |
| `caption`     | `string`                                   | `undefined`  | Optional caption text                      |
| `lazy`        | `boolean`                                  | `true`       | Enable lazy loading                        |
| `fallback`    | `string`                                   | `undefined`  | Fallback image URL if main image fails     |
| `placeholder` | `boolean`                                  | `true`       | Show placeholder on error                  |
| `priority`    | `boolean`                                  | `false`      | Disable lazy loading for above-fold images |
| `width`       | `number`                                   | `undefined`  | Explicit width                             |
| `height`      | `number`                                   | `undefined`  | Explicit height                            |
| `class`       | `string`                                   | `""`         | Additional CSS classes                     |

## Size Presets

- **Small**: Max width 150px - Good for small thumbnails or icons
- **Medium**: Max width 250px - Standard inline images
- **Large**: Max width 400px - Featured inline images
- **Auto**: Max width 100% - Responsive to container

## Alignment

- **Left**: Image floats left, text wraps around the right side
- **Right**: Image floats right, text wraps around the left side

## Responsive Behavior

On mobile devices (< 768px):

- All aligned images become block-level and centered
- Size constraints are adjusted for better mobile viewing
- Text wrapping is disabled for better readability

## Examples

### Basic Usage

```astro
<InlineImage src="/images/photo.jpg" alt="A beautiful landscape" />
```

### With Caption and Alignment

```astro
<InlineImage
  src="/images/diagram.jpg"
  alt="Process diagram"
  align="right"
  size="large"
  caption="Figure 1: Our development process"
/>
```

### High Priority Image (Above Fold)

```astro
<InlineImage
  src="/images/hero-inline.jpg"
  alt="Featured content"
  priority={true}
  lazy={false}
/>
```

### With Fallback

```astro
<InlineImage
  src="/images/might-fail.jpg"
  alt="Experimental image"
  fallback="/images/placeholder.jpg"
/>
```

## CSS Classes

The component generates the following CSS classes:

- `.inline-img`: Main wrapper
- `.inline-img--left` / `.inline-img--right`: Alignment classes
- `.inline-img--small` / `.inline-img--medium` / `.inline-img--large` / `.inline-img--auto`: Size classes
- `.inline-img--with-caption`: Added when caption is present
- `.inline-img__image`: The actual image element
- `.inline-img__caption`: Caption text

## Global Image Enhancement

This component integrates with the global image handler (`src/utils/imageHandler.js`) which provides:

- Loading state management
- Error handling with placeholders
- Lazy loading intersection observer
- Image optimization support

## Best Practices

1. **Alt Text**: Always provide descriptive alt text for accessibility
2. **Performance**: Use `priority={true}` only for above-fold images
3. **Mobile**: Test text flow on mobile devices
4. **Content**: Keep captions concise and relevant
5. **Sizing**: Choose appropriate sizes for your content context
