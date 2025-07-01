# Image System Documentation

## Overview

This documentation describes the comprehensive image handling system that replaces the individual image loading handlers in components like FiftyFifty with a global, reusable solution.

## Components Created

### 1. Global Image Handler (`src/utils/imageHandler.js`)

A centralized image management system that provides:

- **Global Loading States**: Consistent loading, loaded, and error states across all images
- **Lazy Loading**: Intersection Observer-based lazy loading with configurable thresholds
- **Error Handling**: Graceful fallback handling with placeholder generation
- **Performance Optimization**: Prevents duplicate processing and memory leaks

#### Key Features:

- Automatic enhancement of images with `data-enhanced` attribute
- Loading shimmer animation during image load
- Fallback image support via `data-fallback` attribute
- Customizable placeholder generation
- Support for manual image enhancement

#### Usage:

```javascript
// Images are automatically enhanced when they have data-enhanced attribute
<img src="/path/to/image.jpg" alt="Description" data-enhanced />

// For lazy loading
<img data-lazy data-src="/path/to/image.jpg" alt="Description" />

// With fallback
<img src="/path/to/image.jpg" data-fallback="/path/to/fallback.jpg" alt="Description" data-enhanced />
```

### 2. InlineImage Component (`src/components/InlineImage/`)

A flexible inline image component designed for embedding within text content with text wrapping.

#### Features:

- **Text Wrapping**: Images float left or right with text flowing around them
- **Multiple Sizes**: Small (150px), medium (250px), large (400px), auto (100%)
- **Alignment Options**: Left or right float positioning
- **Captions**: Optional caption support with proper styling
- **Responsive**: Automatic mobile adjustments
- **Accessibility**: Proper alt text and semantic structure

#### Props:

- `src` (required): Image source URL
- `alt` (required): Alt text for accessibility
- `align`: "left" | "right" (default: "left")
- `size`: "small" | "medium" | "large" | "auto" (default: "medium")
- `caption`: Optional caption text
- `lazy`: Enable lazy loading (default: true)
- `fallback`: Fallback image URL
- `placeholder`: Show placeholder on error (default: true)
- `priority`: Disable lazy loading for above-fold images
- `width`/`height`: Explicit dimensions
- `class`: Additional CSS classes

#### Example:

```astro
<p>
  Lorem ipsum dolor sit amet...
  <InlineImage
    src="/images/example.jpg"
    alt="Example image"
    align="left"
    size="medium"
    caption="This is an example"
  />
  ...continuing text wraps around the image naturally.
</p>
```

### 3. Figure Component (`src/components/Figure/`)

A semantic HTML5 figure component for standalone images with captions.

#### Features:

- **Semantic HTML**: Uses proper `<figure>` and `<figcaption>` elements
- **Multiple Sizes**: Small (300px), medium (600px), large (900px), full (100%)
- **Alignment Options**: Left, center, right alignment
- **Rich Captions**: HTML formatting support in captions
- **Full-Bleed Option**: Viewport-width figures on large screens
- **Dark Mode**: Automatic dark mode support
- **Print Optimization**: Print-friendly styling

#### Props:

- `src` (required): Image source URL
- `alt` (required): Alt text for accessibility
- `caption`: Figure caption (supports HTML)
- `size`: "small" | "medium" | "large" | "full" (default: "medium")
- `align`: "left" | "center" | "right" (default: "center")
- `lazy`: Enable lazy loading (default: true)
- `fallback`: Fallback image URL
- `placeholder`: Show placeholder on error (default: true)
- `priority`: Disable lazy loading for above-fold images
- `width`/`height`: Explicit dimensions
- `class`: Additional CSS classes for image
- `figcaptionClass`: Additional CSS classes for caption

#### Example:

```astro
<Figure
  src="/images/chart.jpg"
  alt="Sales data visualization"
  caption="Q4 sales performance showing <strong>15% growth</strong> year-over-year"
  size="large"
  align="center"
/>
```

## Integration with Existing Components

### FiftyFifty Component Updates

The FiftyFifty component has been updated to use the global image handler:

1. **Removed Duplicate Code**: Eliminated custom image loading handlers
2. **Added Global Integration**: Images now use `data-enhanced` attribute
3. **Improved Animation**: Added intersection observer for scroll animations
4. **Consistent States**: Uses global `img--loading`, `img--loaded`, `img--error` classes

### Benefits:

- **Reduced Code Duplication**: Single source of truth for image handling
- **Consistent UX**: All images behave the same way across the site
- **Better Performance**: Optimized loading and error handling
- **Easier Maintenance**: Changes to image behavior affect all components

## Global CSS Classes

The system introduces standardized CSS classes for image states:

- `.img--loading`: Applied during image loading (includes shimmer animation)
- `.img--loaded`: Applied when image successfully loads
- `.img--error`: Applied when image fails to load
- `.img-placeholder`: Generated placeholder for failed images

## Demo Pages

### Images Demo (`src/pages/demo/images.astro`)

Comprehensive showcase of both InlineImage and Figure components with various configurations and use cases.

### Updated Components Demo

The main components demo page now includes sections for both image components with interactive examples.

## Best Practices

### 1. Alt Text

Always provide descriptive alt text that explains the image content and context.

```astro
<!-- Good -->
<InlineImage src="/chart.jpg" alt="Q4 sales data showing 15% increase" />

<!-- Avoid -->
<InlineImage src="/chart.jpg" alt="Chart" />
```

### 2. Performance

- Use `priority={true}` only for above-fold images
- Let lazy loading handle below-fold images automatically
- Provide fallback images for external or unreliable sources

### 3. Responsive Design

- Choose appropriate sizes based on content importance
- Consider mobile behavior (all aligned images become block-level)
- Test text flow on various screen sizes

### 4. Accessibility

- Write descriptive alt text that adds value
- Use captions to provide additional context, not repeat alt text
- Ensure proper semantic markup with Figure component

### 5. Content Strategy

- Use InlineImage for supporting visuals within text
- Use Figure for standalone images that deserve focus
- Reserve full-width figures for hero images and major visuals

## Browser Support

- **Modern Browsers**: Full support with all features
- **Intersection Observer**: Graceful degradation for older browsers
- **CSS Grid/Flexbox**: Responsive layouts work across all supported browsers
- **Loading States**: Shimmer animations with CSS animation fallbacks

## Migration Guide

### For Existing Components:

1. Add `data-enhanced` attribute to existing images
2. Replace custom loading handlers with global classes
3. Import and use global image handler in main.js
4. Update SCSS to use global image state classes

### For New Development:

1. Use InlineImage for text-embedded images
2. Use Figure for standalone images with captions
3. Leverage global image handler for custom image implementations
4. Follow established patterns for consistency

## File Structure

```
src/
├── utils/
│   └── imageHandler.js          # Global image handling logic
├── components/
│   ├── InlineImage/
│   │   ├── InlineImage.astro    # Component definition
│   │   ├── index.js             # Component export
│   │   └── README.md            # Component documentation
│   ├── Figure/
│   │   ├── Figure.astro         # Component definition
│   │   ├── index.js             # Component export
│   │   └── README.md            # Component documentation
│   └── FiftyFifty/              # Updated to use global handler
│       ├── FiftyFifty.astro
│       ├── FiftyFifty.js        # Updated integration
│       └── FiftyFifty.scss      # Updated styles
├── pages/
│   └── demo/
│       ├── images.astro         # Image components demo
│       └── components.astro     # Updated with image sections
└── main.js                      # Updated to include global handler
```

This comprehensive image system provides a solid foundation for handling all image-related needs across the application while maintaining consistency, performance, and accessibility.
