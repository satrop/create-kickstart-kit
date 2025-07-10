# FiftyFifty Component

A responsive image and content layout component for creating engaging two-column sections.

## Features

- **Flexible layouts** with image left/right positioning
- **Responsive design** with mobile-first approach
- **Multiple variants** (default, contained, full-bleed)
- **Scroll animations** with intersection observer
- **Lazy loading** with loading states and error handling
- **Accessibility focused** with proper ARIA attributes
- **Analytics integration** for interaction tracking

## Usage

### Basic FiftyFifty

```astro
---
import FiftyFifty from '@components/FiftyFifty/FiftyFifty.astro';
---

<FiftyFifty
  imageSrc="/images/feature.jpg"
  imageAlt="Product feature demonstration"
  title="Amazing Feature"
  subtitle="New Feature"
>
  <p>This is a detailed description of the amazing feature that will help users accomplish their goals more effectively.</p>
</FiftyFifty>
```

### With Actions

```astro
<FiftyFifty
  imageSrc="/images/cta.jpg"
  imageAlt="Call to action"
  title="Get Started Today"
  subtitle="Ready to begin?"
  alignment="center"
>
  <p>Join thousands of satisfied customers who have transformed their workflow.</p>

  <Fragment slot="actions">
    <a href="/signup" class="btn btn--primary btn--large">Start Free Trial</a>
    <a href="/demo" class="btn btn--outline btn--large">Watch Demo</a>
  </Fragment>
</FiftyFifty>
```

### Image Right Position

```astro
<FiftyFifty
  imageSrc="/images/about.jpg"
  imageAlt="About our company"
  title="Our Story"
  imagePosition="right"
  variant="contained"
>
  <p>We started with a simple mission: to make complex tasks simple and intuitive.</p>
</FiftyFifty>
```

### Full Bleed Variant

```astro
<FiftyFifty
  imageSrc="/images/hero.jpg"
  imageAlt="Hero image"
  title="Transform Your Workflow"
  variant="full-bleed"
  priority={true}
>
  <p>Experience the future of productivity with our cutting-edge platform.</p>
</FiftyFifty>
```

### With Animations

```astro
<FiftyFifty
  imageSrc="/images/animated.jpg"
  imageAlt="Animated content"
  title="Smooth Animations"
  data-animate="true"
>
  <p>Watch as content smoothly animates into view as you scroll.</p>
</FiftyFifty>
```

## Props

| Prop            | Type                                       | Default     | Description                                 |
| --------------- | ------------------------------------------ | ----------- | ------------------------------------------- |
| `imageSrc`      | `string`                                   | _required_  | Image source URL                            |
| `imageAlt`      | `string`                                   | _required_  | Image alt text for accessibility            |
| `title`         | `string`                                   | _required_  | Main heading text                           |
| `subtitle`      | `string`                                   | `undefined` | Optional subtitle/eyebrow text              |
| `imagePosition` | `"left" \| "right"`                        | `"left"`    | Image position relative to content          |
| `alignment`     | `"left" \| "center"`                       | `"left"`    | Content text alignment                      |
| `variant`       | `"default" \| "contained" \| "full-bleed"` | `"default"` | Visual style variant                        |
| `lazy`          | `boolean`                                  | `true`      | Enable lazy loading for images              |
| `priority`      | `boolean`                                  | `false`     | Load image eagerly (for above-fold content) |

## Data Attributes

| Attribute       | Description                        |
| --------------- | ---------------------------------- |
| `data-animate`  | Enable scroll-triggered animations |
| `data-parallax` | Enable parallax scrolling effect   |

## Slots

| Slot      | Description                            |
| --------- | -------------------------------------- |
| `default` | Main content area (usually paragraphs) |
| `actions` | Action buttons or CTAs                 |

## Variants

### Default

Standard layout with basic styling.

### Contained

Adds background color and padding, contained within max-width.

```astro
<FiftyFifty variant="contained" ...props>
  <p>Content in a contained layout with background.</p>
</FiftyFifty>
```

### Full Bleed

Extends to full viewport width, breaking out of container.

```astro
<FiftyFifty variant="full-bleed" ...props>
  <p>Content that spans the full width of the viewport.</p>
</FiftyFifty>
```

## JavaScript API

### FiftyFiftyComponent Class

```javascript
// Get component instance
const element = document.querySelector(".ast-fifty-fifty");
const component = element.fiftyFiftyComponent;

// Methods
component.triggerAnimation(); // Manually trigger scroll animation
component.updateImage(src, alt); // Update image source and alt text
component.updateContent(title, subtitle, body); // Update text content
component.destroy(); // Clean up observers and events
```

## Events

The FiftyFifty component emits custom events:

```javascript
// Component comes into viewport
document.addEventListener("fifty-fifty:in-view", (event) => {
  console.log("FiftyFifty in view:", event.detail.title);
});

// Image loaded successfully
document.addEventListener("fifty-fifty:image:load", (event) => {
  console.log("Image loaded:", event.detail.src);
});

// Image failed to load
document.addEventListener("fifty-fifty:image:error", (event) => {
  console.log("Image error:", event.detail.src);
});

// Image interaction (click/keyboard)
document.addEventListener("fifty-fifty:image:interact", (event) => {
  console.log("Image interacted with");
});

// Analytics events
document.addEventListener("fifty-fifty:analytics", (event) => {
  console.log("FiftyFifty interaction:", event.detail);
});
```

## Styling

The component uses CSS classes that can be customized:

- `.ast-fifty-fifty` - Base component container
- `.ast-fifty-fifty--default` - Default variant
- `.ast-fifty-fifty--contained` - Contained variant
- `.ast-fifty-fifty--full-bleed` - Full bleed variant
- `.ast-fifty-fifty__image` - Image container
- `.ast-fifty-fifty__content` - Content container
- `.ast-fifty-fifty__title` - Main heading
- `.ast-fifty-fifty__subtitle` - Subtitle/eyebrow text
- `.ast-fifty-fifty__body` - Main content area
- `.ast-fifty-fifty__actions` - Action buttons container

### State Classes

- `.ast-fifty-fifty--in-view` - Applied when component enters viewport
- `.ast-fifty-fifty__image-wrapper--loading` - Loading state for images
- `.ast-fifty-fifty__ast-img--loaded` - Applied when image loads successfully
- `.ast-fifty-fifty__ast-img--error` - Applied when image fails to load

## Accessibility

- **Semantic HTML** with proper `<section>` and heading structure
- **Image accessibility** with required alt text
- **ARIA attributes** for screen reader support
- **Keyboard navigation** support for interactive elements
- **Focus management** with visible focus indicators
- **Responsive design** that works across all devices
- **High contrast mode** support
- **Reduced motion** support for animations

## Performance

- **Lazy loading** enabled by default for images
- **Priority loading** option for above-the-fold content
- **Optimized animations** with `requestAnimationFrame`
- **Intersection Observer** for efficient scroll tracking
- **Throttled parallax** effects for smooth performance
- **Automatic cleanup** of event listeners and observers

## Examples

### Product Feature Section

```astro
<FiftyFifty
  imageSrc="/images/dashboard.png"
  imageAlt="Dashboard interface showing analytics"
  title="Powerful Analytics Dashboard"
  subtitle="Insights"
  data-animate="true"
>
  <p>Get real-time insights into your business performance with our comprehensive analytics dashboard.</p>

  <ul>
    <li>Real-time data visualization</li>
    <li>Customizable reports</li>
    <li>Export and sharing capabilities</li>
  </ul>

  <Fragment slot="actions">
    <a href="/features/analytics" class="btn btn--primary">Explore Analytics</a>
  </Fragment>
</FiftyFifty>
```

### Team/About Section

```astro
<FiftyFifty
  imageSrc="/images/team.jpg"
  imageAlt="Our team working together"
  title="Meet Our Team"
  subtitle="About Us"
  imagePosition="right"
  variant="contained"
  alignment="left"
>
  <p>We're a passionate team of designers, developers, and strategists committed to creating exceptional digital experiences.</p>

  <p>With over <strong>50 years</strong> of combined experience, we bring deep expertise and fresh perspectives to every project.</p>

  <Fragment slot="actions">
    <a href="/about" class="btn btn--outline">Learn More About Us</a>
    <a href="/careers" class="btn btn--primary">Join Our Team</a>
  </Fragment>
</FiftyFifty>
```

### Call to Action Section

```astro
<FiftyFifty
  imageSrc="/images/cta-bg.jpg"
  imageAlt="Get started today"
  title="Ready to Get Started?"
  subtitle="Join Today"
  variant="full-bleed"
  alignment="center"
  priority={true}
>
  <p>Transform your workflow and boost productivity with our comprehensive platform.</p>

  <Fragment slot="actions">
    <a href="/signup" class="btn btn--primary btn--large">Start Free Trial</a>
    <a href="/contact" class="btn btn--outline btn--large">Contact Sales</a>
  </Fragment>
</FiftyFifty>
```

### With Parallax Effect

```astro
<FiftyFifty
  imageSrc="/images/parallax-bg.jpg"
  imageAlt="Parallax background"
  title="Immersive Experience"
  data-animate="true"
  data-parallax="true"
  class="ast-fifty-fifty__image--parallax"
>
  <p>Experience smooth parallax scrolling effects that bring your content to life.</p>
</FiftyFifty>
```
