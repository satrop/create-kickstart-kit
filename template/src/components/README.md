# Components

This directory contains reusable Astro components designed for easy customization and minimal styling overhead.

## Design Philosophy

These components follow a "functional-first" approach:

- **Minimal styling**: Only essential styles for functionality
- **Easy to override**: Predictable class names and CSS structure
- **Variant system**: Built-in options for common use cases
- **Accessible**: ARIA attributes and semantic HTML
- **TypeScript support**: Full type definitions for props

## Available Components

### Button

**✅ REFACTORED TO MODULAR STRUCTURE**

Flexible button component with variants and sizes.

- **Structure**: `components/Button/` with Button.astro, Button.scss, Button.js, index.js, README.md
- **Variants**: `primary`, `secondary`, `outline`
- **Sizes**: `small`, `medium`, `large`
- **Features**: Loading states, click debouncing, accessibility enhancements
- **JavaScript API**: ButtonComponent class for programmatic control
- **Data attributes**: `data-loading-text`, `data-confirm`
- **Import**: `import Button from '@components/Button/Button.astro'`

### Alert

**✅ REFACTORED TO MODULAR STRUCTURE**

Alert messages for different contexts.

- **Structure**: `components/Alert/` with Alert.astro, Alert.scss, Alert.js, index.js, README.md
- **Types**: `info`, `success`, `warning`, `error`
- **Features**: Dismissible alerts, auto-dismiss, smooth animations
- **JavaScript API**: AlertComponent class and AlertManager for programmatic control
- **Data attributes**: `data-auto-dismiss`, `data-focus`
- **Events**: Custom `alert:dismiss` event
- **Import**: `import Alert from '@components/Alert/Alert.astro'`

### FormField

Input field wrapper with label, validation, and help text.

- Supports all input types (text, email, password, number, tel, url)
- Built-in error and help text display
- Required field indicators
- Focus and error states
- Full accessibility with ARIA attributes

**Structure**: Located in `FormField/` folder with separate files for markup, styles, and functionality.

### Select

Styled select dropdown component with enhanced features and accessibility.

- **Structure**: `Select/` folder with `.astro`, `.scss`, `.js`, `index.js`, `README.md`
- **Features**: Single/multi-select, searchable, clearable, custom styling
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Functionality**: Type-ahead search, keyboard navigation, validation
- **API**: JavaScript API for programmatic control
- **Styling**: Custom dropdown appearance with native fallback
- **Import**: `import Select from '@components/Select'`

### Textarea

Multi-line text input component.

- Configurable rows and resize behavior
- Character limit support (maxlength)
- Resize options: none, vertical, horizontal, both
- Error states and validation
- Consistent styling with other form components
- Full accessibility with ARIA attributes

### Checkbox

**✅ REFACTORED TO MODULAR STRUCTURE**

Styled checkbox component with custom appearance.

- **Structure**: `components/Checkbox/` with Checkbox.astro, Checkbox.scss, Checkbox.js, index.js, README.md
- **Features**: Custom styling, indeterminate states, loading states, validation
- **Group management**: Select all functionality, bulk operations
- **JavaScript API**: CheckboxComponent and CheckboxGroupManager classes
- **Size variants**: small, medium, large
- **Data attributes**: `data-indeterminate`, `data-loading`, `data-select-all`
- **Events**: Custom checkbox change and group events
- **Import**: `import Checkbox from '@components/Checkbox/Checkbox.astro'`

### RadioGroup

Radio button group with fieldset/legend structure and enhanced accessibility.

- **Structure**: `RadioGroup/` folder with `.astro`, `.scss`, `.js`, `index.js`, `README.md`
- **Features**: Enhanced keyboard navigation, ARIA support, custom styling
- **Layout**: Horizontal and vertical orientations
- **Accessibility**: WCAG 2.1 AA compliant with proper fieldset/legend structure
- **States**: Error states, disabled options, validation
- **API**: JavaScript API for programmatic control
- **Import**: `import RadioGroup from '@components/RadioGroup'`

### Card

**✅ REFACTORED TO MODULAR STRUCTURE**

Flexible container with optional header and footer.

- **Structure**: `components/Card/` with Card.astro, Card.scss, Card.js, index.js, README.md
- **Variants**: `default`, `bordered`, `elevated`
- **Padding options**: `none`, `small`, `medium`, `large`
- **Features**: Interactive states, clickable cards (href), ripple effects
- **JavaScript API**: CardComponent class for programmatic control
- **Events**: Custom card interaction events and analytics integration
- **Slots**: header, content (default), footer
- **Import**: `import Card from '@components/Card/Card.astro'`

### Navigation

Horizontal and vertical navigation component.

- Orientations: `horizontal`, `vertical`
- Active state support
- Accessible navigation structure
- ARIA current page indicators

### Accordion

Fully accessible accordion/collapsible content component.

- Variants: `default`, `bordered`, `flush`
- Single or multiple panel opening modes
- Full keyboard navigation (Arrow keys, Home, End)
- ARIA expanded states and proper labeling
- Smooth animations with reduced motion support

### Dialog

Fully accessible modal dialog component with advanced features.

- Sizes: `small`, `medium`, `large`, `fullscreen`
- Variants: `default`, `alert`, `confirmation`
- Advanced accessibility features:
  - Focus trap and restoration
  - Keyboard navigation (ESC to close, Tab cycling)
  - Screen reader announcements
  - ARIA roles and properties
- Background scroll prevention
- Smooth animations with spring-like easing
- Reduced motion support
- Click outside to close (configurable)
- Custom close buttons and actions
- JavaScript API for programmatic control

### FiftyFifty

**✅ REFACTORED TO MODULAR STRUCTURE**

Two-column layout component using your grid utility classes.

- **Structure**: `components/FiftyFifty/` with FiftyFifty.astro, FiftyFifty.scss, FiftyFifty.js, index.js, README.md
- **Image positioning**: `left` or `right` with responsive reordering
- **Content alignment**: `left` or `center`
- **Variants**: `default`, `contained`, `full-bleed`
- **Features**: Scroll animations, parallax effects, lazy loading with error handling
- **JavaScript API**: FiftyFiftyComponent class for dynamic updates
- **Data attributes**: `data-animate`, `data-parallax`
- **Events**: Intersection observer, image load/error events
- **Import**: `import FiftyFifty from '@components/FiftyFifty/FiftyFifty.astro'`

### Dialog

Fully accessible modal dialog component with advanced animations and focus management.

- Sizes: `small`, `medium`, `large`, `fullscreen`
- Variants: `default`, `alert`, `confirmation`
- Complete accessibility: focus trapping, keyboard navigation, screen reader support
- Advanced animations with reduced motion support
- Background scroll prevention
- Progressive enhancement with fallbacks

**Structure**: Located in `Dialog/` folder with separate files for markup, styles, and functionality.

## Customization

### Method 1: Override CSS Variables

```scss
:root {
  --btn-primary-bg: #your-color;
  --btn-primary-border: #your-color;
}
```

### Method 2: Override Component Classes

```scss
.btn--primary {
  background-color: #your-color;
  border-color: #your-color;
}
```

### Method 3: Create New Variants

```scss
.btn--custom {
  background-color: #your-color;
  color: white;
  // your custom styles
}
```

## Usage Examples

See `/src/pages/components.astro` for comprehensive examples of all components in action.

## Adding New Components

When adding new components to this collection:

1. Follow the existing naming conventions
2. Include TypeScript interfaces for props
3. Use minimal, functional styling
4. Add variants for common use cases
5. Include accessibility attributes
6. Update the showcase page with examples
