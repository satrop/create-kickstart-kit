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

Flexible button component with variants and sizes.

- Variants: `primary`, `secondary`, `outline`
- Sizes: `small`, `medium`, `large`
- Supports all native button attributes

### Alert

Alert messages for different contexts.

- Types: `info`, `success`, `warning`, `error`
- Optional dismiss functionality
- ARIA compliant

### FormField

Input field wrapper with label, validation, and help text.

- Supports all input types (text, email, password, number, tel, url)
- Built-in error and help text display
- Required field indicators
- Focus and error states
- Full accessibility with ARIA attributes

### Select

Styled select dropdown component with custom appearance.

- Single and multiple selection modes
- Custom dropdown arrow styling
- Placeholder support
- Individual option disable support
- Error states and validation
- Full keyboard navigation

### Textarea

Multi-line text input component.

- Configurable rows and resize behavior
- Character limit support (maxlength)
- Resize options: none, vertical, horizontal, both
- Error states and validation
- Consistent styling with other form components
- Full accessibility with ARIA attributes

### Checkbox

Styled checkbox component with custom appearance.

- Custom styled checkbox with smooth animations
- Label association and help text support
- Error states and validation
- Disabled states
- Full keyboard and screen reader support

### RadioGroup

Radio button group with fieldset/legend structure.

- Horizontal and vertical orientations
- Proper fieldset/legend accessibility
- Individual option disable support
- Error states and validation
- Keyboard navigation between options

### Card

Flexible container with optional header and footer.

- Variants: `default`, `bordered`, `elevated`
- Padding options: `none`, `small`, `medium`, `large`
- Slot-based content areas

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

### FiftyFifty

Two-column layout component using your grid utility classes.

- Image positioning: `left` or `right`
- Content alignment: `left` or `center`
- Variants: `default`, `contained`, `full-bleed`
- Responsive behavior with mobile-first approach
- Action slot for buttons and CTAs
- Uses your existing grid classes (`col-4 md:col-4 lg:col-6`)

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
