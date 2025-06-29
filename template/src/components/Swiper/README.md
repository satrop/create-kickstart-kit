# Swiper Component

A flexible and accessible carousel/slider component built with Swiper.js.

## Features

- **Responsive Design**: Automatically adapts to different screen sizes
- **Touch/Swipe Support**: Works on desktop and mobile devices
- **Keyboard Navigation**: Full keyboard accessibility support
- **ARIA Compliant**: Screen reader friendly
- **Multiple Effects**: Slide and fade transitions
- **Autoplay Support**: Optional auto-advancing slides
- **Navigation Controls**: Previous/next buttons and pagination dots
- **Lazy Loading**: Efficient image loading for better performance

## Basic Usage

```astro
---
import Swiper from "../components/Swiper";

const slides = [
  {
    id: "slide1",
    content: `<h3>Slide Title</h3><p>Slide content goes here.</p>`,
    image: "/path/to/image.jpg",
    alt: "Image description"
  },
  // ... more slides
];
---

<Swiper
  slides={slides}
  slidesPerView={1}
  spaceBetween={20}
  navigation={true}
  pagination={true}
/>
```

## Props

| Prop             | Type                        | Default   | Description                      |
| ---------------- | --------------------------- | --------- | -------------------------------- |
| `slides`         | `SwiperSlide[]`             | required  | Array of slide objects           |
| `slidesPerView`  | `number`                    | `1`       | Number of slides visible at once |
| `spaceBetween`   | `number`                    | `20`      | Space between slides in pixels   |
| `loop`           | `boolean`                   | `false`   | Enable infinite loop mode        |
| `autoplay`       | `boolean \| SwiperAutoplay` | `false`   | Auto-advance slides              |
| `navigation`     | `boolean`                   | `true`    | Show prev/next buttons           |
| `pagination`     | `boolean`                   | `true`    | Show pagination dots             |
| `centeredSlides` | `boolean`                   | `false`   | Center active slide              |
| `effect`         | `"slide" \| "fade"`         | `"slide"` | Transition effect                |
| `speed`          | `number`                    | `300`     | Transition speed in ms           |
| `height`         | `string`                    | `"auto"`  | Container height                 |

## Slide Object Structure

```typescript
interface SwiperSlide {
  id: string; // Unique identifier
  content: string; // HTML content for the slide
  image?: string; // Optional image URL
  alt?: string; // Image alt text
  title?: string; // Optional slide title
}
```

## Examples

### Basic Image Carousel

```astro
<Swiper
  slides={imageSlides}
  slidesPerView={1}
  autoplay={{ delay: 4000 }}
  navigation={true}
  pagination={true}
/>
```

### Multi-slide Responsive Carousel

```astro
<Swiper
  slides={slides}
  slidesPerView={3}
  spaceBetween={30}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }}
/>
```

### Text-only Carousel

```astro
<Swiper
  slides={textSlides}
  slidesPerView={1}
  effect="fade"
  autoplay={{ delay: 3000 }}
/>
```

## Responsive Behavior

The component automatically applies responsive breakpoints when no custom `breakpoints` are provided:

- **Mobile (320px+)**: 1 slide per view
- **Small (480px+)**: 1 slide per view
- **Tablet (768px+)**: 2 slides per view
- **Desktop (1024px+)**: 3 slides per view
- **Large (1280px+)**: 4 slides per view

**Note**: When `slidesPerView={1}` is explicitly set, it will be respected across all screen sizes.

## Accessibility Features

- Full keyboard navigation (arrow keys, tab, enter)
- ARIA labels and roles for screen readers
- Focus management and focus trapping
- Semantic HTML structure
- High contrast support

## Known Issues & Notes

### Swiper Loop Warning

You may see a console warning like:

```
Swiper Loop Warning: The number of slides is not enough for loop mode...
```

**This is expected behavior** when you have fewer slides than the `slidesPerView` count (e.g., 3 slides with `slidesPerView={3}`). The warning comes from Swiper.js being overly cautious about loop mode compatibility, but it doesn't affect functionality since loop mode is disabled by default.

**The carousel works perfectly** - this is just Swiper.js being extra protective. You can safely ignore this warning.

## Customization

### Styling

The component uses scoped CSS classes that can be overridden:

```scss
.swiper-container {
  // Container styles
}

.swiper-slide {
  // Individual slide styles
}

.swiper-button-next,
.swiper-button-prev {
  // Navigation button styles
}

.swiper-pagination {
  // Pagination dot styles
}
```

### Adding Custom Effects

To add more transition effects, update the JavaScript module imports and configuration.

## Performance Tips

- Enable `lazy={true}` for image-heavy carousels
- Use appropriate image sizes and formats
- Consider using `effect="fade"` for better performance on lower-end devices
- Limit the number of slides for better initial load times

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch and pointer events supported
