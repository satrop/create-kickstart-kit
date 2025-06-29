# Button Component

A versatile, accessible button component with multiple variants and sizes.

## Usage

```astro
---
import { Button } from '@components/Button';
---

<!-- Basic button -->
<Button>Click me</Button>

<!-- Primary button with large size -->
<Button variant="primary" size="large">Submit</Button>

<!-- Secondary button -->
<Button variant="secondary">Cancel</Button>

<!-- Outline button -->
<Button variant="outline">Learn More</Button>

<!-- Disabled button -->
<Button disabled>Disabled</Button>

<!-- Submit button with loading state -->
<Button type="submit" data-loading-text="Submitting...">Submit Form</Button>

<!-- Button with confirmation -->
<Button data-confirm="Are you sure?">Delete</Button>
```

## Props

| Prop       | Type                                    | Default     | Description                    |
| ---------- | --------------------------------------- | ----------- | ------------------------------ |
| `variant`  | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Button style variant           |
| `size`     | `'small' \| 'medium' \| 'large'`        | `'medium'`  | Button size                    |
| `disabled` | `boolean`                               | `false`     | Whether the button is disabled |
| `type`     | `'button' \| 'submit' \| 'reset'`       | `'button'`  | Button type attribute          |

## Data Attributes

| Attribute           | Description                                  |
| ------------------- | -------------------------------------------- |
| `data-loading-text` | Text to show when button is in loading state |
| `data-confirm`      | Confirmation message to show before action   |

## JavaScript API

The button component automatically initializes with JavaScript functionality:

```javascript
import { ButtonComponent } from "@components/Button";

// Manual initialization
const button = document.querySelector(".btn");
const buttonInstance = new ButtonComponent(button);

// Control loading state
buttonInstance.setLoading(true);
buttonInstance.setLoading(false);

// Enable/disable
buttonInstance.enable();
buttonInstance.disable();

// Update content
buttonInstance.updateContent("New Text");
```

## Features

- **Accessibility**: Full keyboard navigation and ARIA support
- **Loading states**: Built-in loading state management for forms
- **Click debouncing**: Prevents rapid-fire clicks
- **Confirmation dialogs**: Optional confirmation before actions
- **Responsive**: Works on all screen sizes
- **High contrast support**: Adapts to user preferences
- **Reduced motion support**: Respects user motion preferences

## Variants

### Primary

The default button style for primary actions.

### Secondary

For secondary actions that are less prominent.

### Outline

A transparent button with a colored border, good for less prominent actions.

## Sizes

- **Small**: Compact button for tight spaces
- **Medium**: Standard button size (default)
- **Large**: Prominent button for important actions

## Accessibility

- Full keyboard navigation support (Tab, Enter, Space)
- Proper ARIA attributes for screen readers
- High contrast mode support
- Focus indicators that meet WCAG guidelines
- Loading state announcements

## Customization

The button component uses CSS custom properties and can be easily customized through SCSS variables or CSS overrides.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills for older features)
