# Standard Navigation Component

A clean, accessible, and responsive navigation component with dropdown support. Perfect for most websites that need a traditional navigation menu with dropdowns and mobile hamburger menu.

## Features

- ✅ **Fully Responsive**: Mobile-first design with hamburger menu
- ✅ **Accessible**: ARIA labels, keyboard navigation, focus management
- ✅ **Dropdown Support**: Multi-level dropdowns with smooth animations
- ✅ **Mobile Animations**: Choose from left, right, or top slide animations
- ✅ **CSS Grid Animations**: Modern grid-based dropdown transitions
- ✅ **Customizable**: CSS custom properties for easy theming
- ✅ **Self-Contained**: No external dependencies

## Quick Start

```astro
---
import StandardNavigation from '../components/StandardNavigation/StandardNavigation.astro';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Web Design', href: '/services/web-design' },
      { label: 'Development', href: '/services/development' },
      {
        label: 'Marketing',
        href: '/services/marketing',
        children: [
          { label: 'SEO', href: '/services/marketing/seo' },
          { label: 'Social Media', href: '/services/marketing/social' }
        ]
      }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

const logo = {
  src: '/path/to/logo.svg',
  alt: 'Your Company Logo',
  href: '/' // optional, defaults to '/'
};
---

<StandardNavigation
  items={navigationItems}
  logo={logo}
  mobileAnimation="left"
  maxWidth="1200px"
/>
```

## Props

### `items` (required)

Array of navigation items with the following structure:

```typescript
interface NavigationItem {
  label: string; // Display text
  href: string; // URL or path
  children?: NavigationItem[]; // Optional nested items (unlimited depth)
}
```

### `logo` (optional)

Logo configuration object:

```typescript
interface Logo {
  src: string; // Image source path
  alt: string; // Alt text for accessibility
  href?: string; // Link destination (defaults to '/')
}
```

### `mobileAnimation` (optional)

Animation direction for mobile menu:

- `"left"` - Slides in from left (default)
- `"right"` - Slides in from right
- `"top"` - Slides down from top

### `maxWidth` (optional)

Maximum width of the navigation container (e.g., "1200px", "100%")

## CSS Custom Properties

Customize the navigation appearance using CSS custom properties:

```scss
.navigation {
  // Layout
  --nav-max-width: 1200px;
  --nav-height: 80px;
  --nav-mobile-height: 60px;
  --nav-z-index: 1000;

  // Colors
  --nav-bg: var(--white-0);
  --nav-text: var(--gray-700);
  --nav-text-hover: var(--gray-900);
  --nav-border: var(--gray-200);
  --nav-dropdown-bg: var(--white-0);
  --nav-dropdown-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  --nav-overlay-bg: rgba(0, 0, 0, 0.5);

  // Transitions
  --nav-transition: all 0.3s ease;
  --nav-mobile-transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Styling

The component uses a complete set of CSS classes for customization:

```scss
.navigation                    // Main container
.navigation__container         // Inner container with max-width
.navigation__logo             // Logo wrapper
.navigation__logo-link        // Logo link
.navigation__logo-image       // Logo image
.navigation__mobile-toggle    // Mobile hamburger button
.navigation__menu             // Menu container
.navigation__list             // Main navigation list
.navigation__item             // Navigation item
.navigation__link             // Navigation link
.navigation__dropdown         // Dropdown container
.navigation__dropdown-content // Dropdown content wrapper
.navigation__dropdown-list    // Dropdown list
.navigation__dropdown-link    // Dropdown link
.navigation__submenu          // Nested dropdown
.navigation__overlay          // Mobile overlay
```

## JavaScript API

The navigation automatically initializes when the component loads. Manual control:

```javascript
// Get navigation instance
const nav = document.querySelector("[data-navigation-id]");

// Programmatically open/close mobile menu
nav.classList.add("navigation--open");
nav.classList.remove("navigation--open");

// Open specific dropdown (desktop)
const dropdown = nav.querySelector("[data-dropdown]");
dropdown.classList.add("navigation__dropdown--open");
```

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support with Tab/Arrow keys
- **Focus Management**: Visible focus indicators and logical tab order
- **Mobile Announcements**: Screen reader announcements for menu state
- **Semantic HTML**: Proper use of nav, ul, li elements
- **Skip Links**: Optional skip navigation link

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ with CSS Grid support
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lightweight**: ~15KB CSS minified
- **No JavaScript Dependencies**: Pure vanilla JS
- **CSS Grid Animations**: Hardware-accelerated transitions
- **Optimized Images**: Uses Astro's Image component

## Dark Mode

Automatic dark mode support using `prefers-color-scheme`:

```scss
@media (prefers-color-scheme: dark) {
  .navigation {
    --nav-bg: var(--gray-900);
    --nav-text: var(--gray-100);
    --nav-text-hover: var(--white-0);
    --nav-border: var(--gray-700);
    --nav-dropdown-bg: var(--gray-800);
  }
}
```

## Examples

### Basic Navigation

```astro
<StandardNavigation
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]}
/>
```

### With Logo

```astro
<StandardNavigation
  items={navigationItems}
  logo={{
    src: '/logo.svg',
    alt: 'Company Logo'
  }}
/>
```

### With Dropdowns

```astro
<StandardNavigation
  items={[
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      href: '/products',
      children: [
        { label: 'Product A', href: '/products/a' },
        { label: 'Product B', href: '/products/b' }
      ]
    }
  ]}
/>
```

### Mobile Right Slide

```astro
<StandardNavigation
  items={navigationItems}
  mobileAnimation="right"
/>
```

## Troubleshooting

### Mobile menu not closing

Ensure you're not preventing event bubbling on navigation links.

### Dropdowns not appearing

Check z-index conflicts with other page elements.

### Animations not smooth

Verify CSS Grid support in target browsers.

### Accessibility issues

Run automated accessibility tests and manual keyboard testing.

## Contributing

When modifying this component:

1. Test across all supported browsers
2. Verify keyboard navigation works
3. Run accessibility audits
4. Test responsive behavior
5. Update this README if adding features

## License

Part of the Create Kickstart component library.
