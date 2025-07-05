# Mega Navigation Component

A sophisticated navigation system with a mega menu dropdown that provides rich, multi-column content display. Perfect for large websites with complex navigation structures, e-commerce sites, or applications that need to showcase multiple categories and content types.

## Features

- ✅ **Mega Menu**: Full-width dropdown with multi-column layouts
- ✅ **Dual Navigation**: Desktop mega menu + dedicated mobile navigation
- ✅ **Interactive Sidebar**: Left navigation panel with category switching
- ✅ **Rich Content**: Support for images, descriptions, and CTAs
- ✅ **Responsive Design**: Separate mobile navigation component
- ✅ **Advanced Styling**: Premium button designs and hover effects
- ✅ **Accessible**: Full keyboard navigation and screen reader support
- ✅ **Customizable**: CSS custom properties and modular structure

## Quick Start

```astro
---
import MegaNavigation from '../components/MegaNavigation/MegaNavigation.astro';
import MobileNavigation from '../components/MegaNavigation/MobileNavigation.astro';

const megaMenuData = {
  products: {
    title: 'Our Products',
    description: 'Explore our comprehensive product lineup',
    image: '/images/products-hero.jpg',
    sections: [
      {
        id: 'web-tools',
        title: 'Web Tools',
        description: 'Professional web development tools',
        links: [
          {
            title: 'Website Builder',
            description: 'Drag-and-drop website creation',
            href: '/products/website-builder'
          },
          {
            title: 'CMS Platform',
            description: 'Content management system',
            href: '/products/cms'
          }
        ]
      }
    ]
  },
  services: {
    title: 'Services',
    description: 'Professional services tailored to your needs',
    cta: {
      text: 'View All Services',
      href: '/services'
    }
  }
};
---

<!-- Desktop Navigation with Mega Menu -->
<div class="desktop-navigation">
  <MegaNavigation
    megaMenuData={megaMenuData}
    logo={{
      src: '/logo.svg',
      alt: 'Company Logo'
    }}
  />
</div>

<!-- Mobile Navigation -->
<div class="mobile-navigation">
  <MobileNavigation
    items={mobileNavigationItems}
    logo={{
      src: '/logo.svg',
      alt: 'Company Logo'
    }}
  />
</div>
```

## Component Structure

The Mega Navigation system consists of three main components:

### 1. MegaNavigation.astro

The main desktop navigation with mega menu functionality.

### 2. MobileNavigation.astro

A separate, optimized mobile navigation component.

### 3. SCSS Files

- `MegaNavigation.scss` - Complete standalone styles
- Responsive breakpoints automatically show/hide components

## Props

### MegaNavigation Props

#### `megaMenuData` (required)

Object containing mega menu content:

```typescript
interface MegaMenuData {
  [key: string]: {
    title: string;
    description: string;
    image?: string;
    cta?: {
      text: string;
      href: string;
    };
    sections?: Array<{
      id: string;
      title: string;
      description?: string;
      links: Array<{
        title: string;
        description?: string;
        href: string;
      }>;
    }>;
  };
}
```

#### `logo` (optional)

Logo configuration:

```typescript
interface Logo {
  src: string;
  alt: string;
  href?: string;
}
```

### MobileNavigation Props

#### `items` (required)

Standard navigation items array:

```typescript
interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}
```

## Mega Menu Data Structure

### Simple Mega Menu (CTA Only)

```javascript
const megaMenuData = {
  services: {
    title: "Our Services",
    description: "Professional solutions for your business",
    cta: {
      text: "Explore Services",
      href: "/services",
    },
  },
};
```

### Complex Mega Menu (Multi-Section)

```javascript
const megaMenuData = {
  products: {
    title: "Products",
    description: "Comprehensive product catalog",
    image: "/images/products.jpg",
    sections: [
      {
        id: "category-1",
        title: "Category One",
        description: "Description of category",
        links: [
          {
            title: "Product Name",
            description: "Product description",
            href: "/products/product-name",
          },
        ],
      },
    ],
  },
};
```

## CSS Custom Properties

Customize the mega navigation:

```scss
.navigation {
  // Layout
  --nav-max-width: var(--site-max-width, 2000px);
  --nav-height: 80px;
  --nav-mobile-height: 60px;
  --nav-z-index: 1000;

  // Colors
  --nav-bg: var(--white-0);
  --nav-text: var(--gray-700);
  --nav-text-hover: var(--gray-900);
  --nav-border: var(--gray-200);
  --nav-mega-bg: var(--white-0);
  --nav-mega-border: var(--gray-100);
  --nav-primary: var(--indigo-500);
  --nav-primary-hover: var(--indigo-600);

  // Transitions
  --nav-transition: all 0.3s ease;
  --nav-mobile-transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Mega Menu Styling Classes

### Main Container

```scss
.navigation__mega-menu         // Mega menu overlay
.navigation__mega-container    // Main grid container
.navigation__mega-nav          // Left sidebar navigation
.navigation__mega-content      // Right content area
```

### Left Navigation

```scss
.navigation__mega-left-header      // Header section
.navigation__mega-left-title       // Main title
.navigation__mega-left-description // Description text
.navigation__mega-left-list        // Navigation list
.navigation__mega-left-button      // Navigation buttons
```

### Content Area

```scss
.navigation__mega-right-header     // Content header
.navigation__mega-right-columns    // Two-column layout
.navigation__mega-right-list       // Link lists
.navigation__mega-right-cta        // Call-to-action section
```

## Advanced Features

### Interactive Sidebar

The left navigation panel allows users to switch between different mega menu sections with smooth transitions and active states.

### Premium Button Styling

Enhanced button designs with:

- Gradient backgrounds for active states
- Subtle animations and hover effects
- Shadow effects and depth
- Shine animations on active buttons

### Responsive Behavior

- **Desktop (769px+)**: Shows mega navigation
- **Mobile (768px and below)**: Shows mobile navigation
- Automatic component switching via CSS

## JavaScript API

### Mega Menu Control

```javascript
// Get mega navigation instance
const megaNav = document.querySelector(".navigation--mega");

// Programmatically open mega menu
megaNav.classList.add("navigation--mega-open");

// Switch active section
const leftButton = megaNav.querySelector('[data-section="products"]');
leftButton.classList.add("active");
```

### Mobile Navigation Control

```javascript
// Get mobile navigation instance
const mobileNav = document.querySelector(".mobile-navigation .navigation");

// Toggle mobile menu
mobileNav.classList.toggle("navigation--open");
```

## Accessibility Features

- **ARIA Expanded**: Dynamic aria-expanded attributes
- **Focus Management**: Logical tab order through mega menu
- **Keyboard Navigation**: Arrow keys for section switching
- **Screen Reader Support**: Proper labeling and announcements
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects prefers-reduced-motion

## Performance Optimizations

- **Lazy Loading**: Images in mega menu use lazy loading
- **CSS Containment**: Optimized rendering performance
- **Transform Animations**: Hardware-accelerated transitions
- **Efficient Selectors**: Optimized CSS for fast rendering

## Examples

### E-commerce Mega Menu

```javascript
const ecommerceMegaMenu = {
  products: {
    title: "Products",
    description: "Shop our latest collections",
    image: "/images/featured-products.jpg",
    sections: [
      {
        id: "clothing",
        title: "Clothing",
        links: [
          {
            title: "Men's Clothing",
            description: "Shirts, pants, accessories",
            href: "/products/mens",
          },
          {
            title: "Women's Clothing",
            description: "Dresses, tops, shoes",
            href: "/products/womens",
          },
        ],
      },
      {
        id: "electronics",
        title: "Electronics",
        links: [
          {
            title: "Smartphones",
            description: "Latest mobile devices",
            href: "/products/phones",
          },
        ],
      },
    ],
  },
};
```

### SaaS Platform Menu

```javascript
const saasPlatformMenu = {
  solutions: {
    title: "Solutions",
    description: "Powerful tools for your business",
    sections: [
      {
        id: "analytics",
        title: "Analytics",
        description: "Data insights and reporting",
        links: [
          {
            title: "Real-time Analytics",
            description: "Live data monitoring",
            href: "/solutions/analytics",
          },
        ],
      },
    ],
  },
  pricing: {
    title: "Pricing",
    description: "Choose the plan that fits your needs",
    cta: {
      text: "View All Plans",
      href: "/pricing",
    },
  },
};
```

## Best Practices

### Content Organization

- Keep mega menu sections focused and logical
- Use clear, descriptive titles and descriptions
- Limit the number of sections to prevent overwhelming users
- Group related items together

### Performance

- Optimize images used in mega menus
- Use appropriate image sizes for different viewports
- Consider lazy loading for non-critical content
- Test on slower connections

### Accessibility

- Provide keyboard navigation for all interactive elements
- Use semantic HTML structure
- Test with screen readers
- Ensure sufficient color contrast

## Troubleshooting

### Mega menu positioning issues

Check CSS containment and z-index conflicts.

### Mobile navigation not switching

Verify CSS breakpoints and display properties.

### Button animations not working

Ensure CSS custom properties are properly defined.

### Focus trap not working

Check JavaScript event listeners and focus management.

## Browser Support

- Modern browsers (Chrome 88+, Firefox 87+, Safari 14+, Edge 88+)
- CSS Grid and Custom Properties support required
- Graceful degradation for older browsers

## Contributing

When extending this component:

1. Test both desktop and mobile experiences
2. Verify accessibility across all interactions
3. Maintain consistent styling patterns
4. Update documentation for new features
5. Test performance impact of changes

## License

Part of the Create Kickstart component library.
