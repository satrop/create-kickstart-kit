# Hero Component

A flexible, accessible, and mobile-first hero component that uses CSS Grid to position content over a full-width background image. The component is designed to work seamlessly with CMS systems by using actual `<img>` elements instead of CSS background images.

## Features

- **Full-width background images** positioned using CSS Grid (not CSS background-image)
- **Multiple content layouts**: 50/50, 70/30, and center
- **Flexible content positioning**: left, right, or center
- **Vertical alignment options**: top, center, or bottom
- **Multiple height variants**: very-short, short, small, medium, large, or viewport
- **Overlay options**: none, light, dark, or gradient
- **Text color variants**: light, dark, or auto
- **Mobile-first and responsive design**
- **Accessibility features** including proper ARIA labels and keyboard navigation
- **Animation support** with respect for `prefers-reduced-motion`
- **CMS-friendly** with dynamic content updating capabilities

## Basic Usage

```astro
---
import Hero from '@/components/Hero/Hero.astro';
import Button from '@/components/Button/Button.astro';
---

<Hero
  imageSrc="/images/hero-background.jpg"
  imageAlt="Beautiful landscape"
  title="Welcome to Our Site"
  subtitle="Discover Amazing Content"
  description="This is a compelling description that explains what we offer."
  contentLayout="center"
  minHeight="large"
  overlay="dark"
  textColor="light"
>
  <p>Additional content can be placed here using the default slot.</p>

  <Fragment slot="actions">
    <Button variant="primary" size="large">Get Started</Button>
    <Button variant="secondary" size="large">Learn More</Button>
  </Fragment>
</Hero>
```

## Props

| Prop                | Type                                                                      | Default      | Description                                     |
| ------------------- | ------------------------------------------------------------------------- | ------------ | ----------------------------------------------- |
| `imageSrc`          | `string`                                                                  | **Required** | Path to the background image                    |
| `imageAlt`          | `string`                                                                  | **Required** | Alt text for the background image               |
| `title`             | `string`                                                                  | **Required** | Main heading text                               |
| `subtitle`          | `string`                                                                  | `undefined`  | Optional subtitle text (appears above title)    |
| `description`       | `string`                                                                  | `undefined`  | Optional description text (appears below title) |
| `contentLayout`     | `"50-50" \| "70-30" \| "center"`                                          | `"center"`   | Content width and positioning                   |
| `contentPosition`   | `"left" \| "right" \| "center"`                                           | `"center"`   | Horizontal alignment of content                 |
| `verticalAlignment` | `"top" \| "center" \| "bottom"`                                           | `"center"`   | Vertical alignment of content                   |
| `minHeight`         | `"very-short" \| "short" \| "small" \| "medium" \| "large" \| "viewport"` | `"large"`    | Height of the hero                              |
| `overlay`           | `"none" \| "light" \| "dark" \| "gradient"`                               | `"dark"`     | Overlay style over the background image         |
| `textColor`         | `"light" \| "dark" \| "auto"`                                             | `"light"`    | Text color theme                                |
| `priority`          | `boolean`                                                                 | `true`       | Whether to prioritize image loading             |
| `lazy`              | `boolean`                                                                 | `false`      | Whether to lazy load the image                  |

## Layout Examples

### 50/50 Layout - Left Content

```astro
<Hero
  imageSrc="/images/hero.jpg"
  imageAlt="Hero background"
  title="Split Layout"
  contentLayout="50-50"
  contentPosition="left"
  overlay="gradient"
>
  <p>Content takes up half the width and is positioned on the left side.</p>
</Hero>
```

### 70/30 Layout - Right Content

```astro
<Hero
  imageSrc="/images/hero.jpg"
  imageAlt="Hero background"
  title="Asymmetric Layout"
  contentLayout="70-30"
  contentPosition="right"
  overlay="dark"
>
  <p>Content takes up 30% width and is positioned on the right side.</p>
</Hero>
```

### Centered Content

```astro
<Hero
  imageSrc="/images/hero.jpg"
  imageAlt="Hero background"
  title="Centered Hero"
  subtitle="Perfect for Landing Pages"
  description="This layout centers the content for maximum impact."
  contentLayout="center"
  minHeight="viewport"
  overlay="gradient"
>
  <Fragment slot="actions">
    <Button variant="primary">Primary Action</Button>
    <Button variant="outline">Secondary Action</Button>
  </Fragment>
</Hero>
```

## Height Variants

- **`very-short`**: 200-300px fixed height (perfect for inner page headers)
- **`short`**: 300-400px fixed height (compact hero for content pages)
- **`small`**: 40vh minimum height
- **`medium`**: 60vh minimum height
- **`large`**: 80vh minimum height
- **`viewport`**: 100vh minimum height

## Overlay Options

- **`none`**: No overlay, image shows through completely
- **`light`**: Light semi-transparent overlay (30% white)
- **`dark`**: Dark semi-transparent overlay (40% black)
- **`gradient`**: Gradient overlay (dark at top and bottom, lighter in middle)

## Text Color Options

- **`light`**: White text (good for dark backgrounds/overlays)
- **`dark`**: Dark gray text (good for light backgrounds/overlays)
- **`auto`**: Automatically chooses based on overlay type

## Slots

### Default Slot

Use the default slot to add additional content below the description:

```astro
<Hero title="My Hero">
  <p>This content appears in the body area.</p>
  <ul>
    <li>Feature 1</li>
    <li>Feature 2</li>
  </ul>
</Hero>
```

### Actions Slot

Use the `actions` slot to add buttons or other call-to-action elements:

```astro
<Hero title="My Hero">
  <Fragment slot="actions">
    <Button variant="primary">Primary CTA</Button>
    <Button variant="secondary">Secondary CTA</Button>
    <a href="#learn-more" class="ast-link">Learn More</a>
  </Fragment>
</Hero>
```

## Accessibility Features

- Proper semantic HTML structure with `<h1>` for the main title
- ARIA labels and roles for screen readers
- Keyboard navigation support for action buttons
- Skip link for keyboard users
- High contrast mode support
- Respects `prefers-reduced-motion` settings
- Focus management and visible focus indicators

## Animation

The component supports scroll-triggered animations. To enable them, add the `data-animate="true"` attribute:

```astro
<Hero
  data-animate="true"
  imageSrc="/images/hero.jpg"
  imageAlt="Hero background"
  title="Animated Hero"
>
  <p>This hero will animate in when it comes into view.</p>
</Hero>
```

The animations respect the user's motion preferences and will be disabled if `prefers-reduced-motion: reduce` is set.

## CMS Integration

The component is designed to work well with CMS systems:

1. **Image handling**: Uses actual `<img>` elements that can be easily managed by CMS
2. **Dynamic content**: JavaScript methods available for updating content dynamically
3. **Flexible structure**: All text content can be easily bound to CMS fields
4. **SEO-friendly**: Proper heading structure and alt text support

## Grid System Integration

The Hero component uses the existing grid system:

- Uses `.layout-full` to span the full width
- Content uses the `.section-grid` for proper column alignment
- Responsive column spans: 4 cols (mobile), 8 cols (tablet), 12 cols (desktop)
- Respects the site's margin and padding system

## Browser Support

- Modern browsers with CSS Grid support
- Graceful degradation for older browsers
- Progressive enhancement for JavaScript features

## Styling Customization

The component uses CSS custom properties and can be customized through the design token system. Key variables include:

- Spacing tokens for padding and margins
- Typography tokens for font sizes and weights
- Color tokens for overlays and text colors
- Breakpoint tokens for responsive behavior
