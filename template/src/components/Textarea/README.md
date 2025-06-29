# Textarea Component

A flexible and accessible textarea component with character counting, auto-resize capabilities, and comprehensive styling options.

## Features

- **Accessibility**: Full ARIA support with proper labeling and error handling
- **Character Counting**: Real-time character count with visual warnings
- **Auto-resize**: Optional automatic height adjustment based on content
- **Flexible Sizing**: Configurable resize behavior (none, vertical, horizontal, both)
- **Validation States**: Built-in error and help text display
- **Keyboard Navigation**: Enhanced keyboard shortcuts and interactions
- **Responsive Design**: Mobile-friendly with touch-optimized interactions
- **Dark Mode**: Automatic dark mode support
- **High Contrast**: Enhanced visibility for accessibility

## Basic Usage

```astro
---
import Textarea from '../components/Textarea';
---

<Textarea
  label="Your Message"
  name="message"
  placeholder="Enter your message here..."
  required
/>
```

## Advanced Usage

```astro
<Textarea
  label="Product Description"
  name="description"
  value="Initial content..."
  placeholder="Describe your product..."
  rows={6}
  maxlength={500}
  resize="vertical"
  helpText="Provide a detailed description of your product"
  required
/>
```

## Props

| Prop           | Type                                             | Default      | Description                             |
| -------------- | ------------------------------------------------ | ------------ | --------------------------------------- |
| `label`        | `string`                                         | **Required** | Label text displayed above the textarea |
| `name`         | `string`                                         | **Required** | Input name attribute                    |
| `value`        | `string`                                         | `undefined`  | Initial/controlled value                |
| `placeholder`  | `string`                                         | `undefined`  | Placeholder text                        |
| `required`     | `boolean`                                        | `false`      | Whether the field is required           |
| `disabled`     | `boolean`                                        | `false`      | Whether the field is disabled           |
| `readonly`     | `boolean`                                        | `false`      | Whether the field is read-only          |
| `error`        | `string`                                         | `undefined`  | Error message to display                |
| `helpText`     | `string`                                         | `undefined`  | Help text to display                    |
| `rows`         | `number`                                         | `4`          | Number of visible text lines            |
| `cols`         | `number`                                         | `undefined`  | Width in characters                     |
| `maxlength`    | `number`                                         | `undefined`  | Maximum character limit                 |
| `minlength`    | `number`                                         | `undefined`  | Minimum character limit                 |
| `resize`       | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Resize behavior                         |
| `class`        | `string`                                         | `''`         | Additional CSS classes                  |
| `autocomplete` | `string`                                         | `undefined`  | Autocomplete attribute                  |
| `spellcheck`   | `boolean`                                        | `undefined`  | Enable/disable spellcheck               |

## Character Counting

When `maxlength` is specified, a character counter is automatically displayed:

```astro
<Textarea
  label="Tweet"
  name="tweet"
  maxlength={280}
  placeholder="What's happening?"
/>
```

The counter changes color:

- Default: Gray
- Warning (80%): Orange
- Error (100%): Red

## Auto-resize

Enable automatic height adjustment by adding `data-auto-resize="true"`:

```astro
<Textarea
  label="Auto-sizing Message"
  name="message"
  data-auto-resize="true"
  data-max-height="300"
  placeholder="This textarea will grow with your content..."
/>
```

## Validation States

### Error State

```astro
<Textarea
  label="Message"
  name="message"
  error="Message is required"
  required
/>
```

### Help Text

```astro
<Textarea
  label="Bio"
  name="bio"
  helpText="Tell us about yourself in a few sentences"
  maxlength={200}
/>
```

## Keyboard Shortcuts

- **Tab**: Move to next focusable element
- **Shift + Tab**: Move to previous focusable element
- **Escape**: Remove focus from textarea
- **Ctrl/Cmd + Enter**: Submit form (if textarea is in a form)

## JavaScript API

The component provides a JavaScript API for programmatic control:

```javascript
// Get the component instance
const textarea = document.querySelector('[data-component="textarea"]');
const component = textarea.textareaComponent;

// Methods
component.focus(); // Focus the textarea
component.blur(); // Remove focus
component.getValue(); // Get current value
component.setValue("text"); // Set value
component.clear(); // Clear and focus
component.disable(); // Disable the textarea
component.enable(); // Enable the textarea
component.destroy(); // Clean up event listeners
```

## Styling

The component uses CSS custom properties for easy customization:

```scss
.textarea-field {
  // Override default styles
  --textarea-border-color: #custom-color;
  --textarea-focus-color: #custom-focus;
  --textarea-error-color: #custom-error;
}
```

## Accessibility

The component follows WCAG 2.1 guidelines:

- Proper labeling with `<label>` elements
- ARIA attributes for enhanced screen reader support
- High contrast mode support
- Keyboard navigation
- Error announcement with `role="alert"`
- Focus management and visible focus indicators

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with modern JavaScript support

## Examples

### Contact Form Textarea

```astro
<Textarea
  label="Your Message *"
  name="message"
  placeholder="How can we help you?"
  rows={5}
  maxlength={1000}
  required
  helpText="Please provide as much detail as possible"
/>
```

### Code Input

```astro
<Textarea
  label="CSS Code"
  name="css"
  placeholder="Enter your CSS code..."
  rows={10}
  resize="both"
  spellcheck={false}
  class="font-mono"
/>
```

### Review Form

```astro
<Textarea
  label="Product Review"
  name="review"
  maxlength={500}
  rows={4}
  helpText="Share your experience with this product"
  placeholder="Write your review..."
/>
```
