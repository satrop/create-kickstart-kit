# Dialog Component

A fully accessible modal dialog component with advanced animations, focus management, and keyboard navigation.

## Files Structure

```
Dialog/
├── Dialog.astro       # Main component markup and props
├── Dialog.scss        # Component styles with animations
├── Dialog.js          # JavaScript functionality and accessibility
├── index.js           # Export file for clean imports
└── README.md          # This documentation
```

## Features

### Accessibility ✨

- **Focus Management**: Automatically focuses first interactive element and traps focus within dialog
- **Keyboard Navigation**: ESC to close, Tab to cycle through focusable elements
- **Screen Reader Support**: Proper ARIA roles, labels, and live region announcements
- **Focus Restoration**: Returns focus to triggering element when closed
- **Background Scroll Prevention**: Prevents body scrolling while dialog is open

### Animations 🎨

- **Smooth Transitions**: Backdrop fade with blur effect
- **Spring-like Animation**: Dialog scales and slides in with modern easing
- **Reduced Motion Support**: Respects user's motion preferences
- **Progressive Enhancement**: Graceful fallbacks for older browsers

### Responsive Design 📱

- **Container Queries**: Advanced responsive behavior
- **Mobile Optimized**: Fullscreen on small screens when needed
- **Dark Mode Support**: Automatic dark theme adaptation
- **High Contrast**: Enhanced visibility for accessibility

## Props

| Prop                  | Type                                             | Default      | Description                        |
| --------------------- | ------------------------------------------------ | ------------ | ---------------------------------- |
| `id`                  | `string`                                         | **required** | Unique identifier for the dialog   |
| `title`               | `string`                                         | `undefined`  | Optional dialog title              |
| `size`                | `'small' \| 'medium' \| 'large' \| 'fullscreen'` | `'medium'`   | Dialog size variant                |
| `variant`             | `'default' \| 'alert' \| 'confirmation'`         | `'default'`  | Visual style variant               |
| `closeOnOutsideClick` | `boolean`                                        | `true`       | Allow closing by clicking backdrop |
| `closeOnEscape`       | `boolean`                                        | `true`       | Allow closing with ESC key         |
| `showCloseButton`     | `boolean`                                        | `true`       | Show the X close button            |
| `class`               | `string`                                         | `undefined`  | Additional CSS classes             |

## Usage

### Basic Usage

```astro
---
import Dialog from '../components/Dialog/Dialog.astro';
import Button from '../components/Button.astro';
---

<!-- Trigger Button -->
<Button data-dialog-trigger="my-dialog">Open Dialog</Button>

<!-- Dialog Component -->
<Dialog id="my-dialog" title="My Dialog">
  <p>This is the dialog content.</p>

  <Fragment slot="actions">
    <Button data-dialog-close="my-dialog" variant="outline">Cancel</Button>
    <Button data-dialog-close="my-dialog" variant="primary">Confirm</Button>
  </Fragment>
</Dialog>
```

### Different Sizes

```astro
<!-- Small Dialog -->
<Dialog id="small-dialog" title="Small Dialog" size="small">
  <p>Small dialog content</p>
</Dialog>

<!-- Large Dialog -->
<Dialog id="large-dialog" title="Large Dialog" size="large">
  <p>Large dialog with more space</p>
</Dialog>

<!-- Fullscreen Dialog -->
<Dialog id="fullscreen-dialog" title="Fullscreen" size="fullscreen">
  <p>Takes up most of the viewport</p>
</Dialog>
```

### Variants

```astro
<!-- Alert Dialog -->
<Dialog id="alert-dialog" title="Warning" variant="alert">
  <p>This is an important alert message.</p>
</Dialog>

<!-- Confirmation Dialog -->
<Dialog id="confirm-dialog" title="Confirm Delete" variant="confirmation">
  <p>Are you sure you want to delete this item?</p>
</Dialog>
```

### Form Dialog

```astro
<Dialog id="form-dialog" title="Contact Form" size="medium">
  <form id="contact-form">
    <FormField label="Name" name="name" required>
      <input type="text" name="name" autofocus />
    </FormField>

    <FormField label="Email" name="email" required>
      <input type="email" name="email" />
    </FormField>

    <Textarea label="Message" name="message" required />
  </form>

  <Fragment slot="actions">
    <Button data-dialog-close="form-dialog" variant="outline">Cancel</Button>
    <Button type="submit" variant="primary">Send</Button>
  </Fragment>
</Dialog>
```

## JavaScript API

The dialog component automatically initializes, but you can also control it programmatically:

### Import the Manager

```javascript
import { DialogManager } from "../components/Dialog/Dialog.js";

// Or use the global instance
const dialogManager = window.DialogManager;
```

### Methods

```javascript
// Open a dialog
dialogManager.open("my-dialog");

// Close a dialog
dialogManager.close("my-dialog");

// Close all open dialogs
dialogManager.closeAll();

// Check if a dialog is open
if (dialogManager.isOpen("my-dialog")) {
  console.log("Dialog is open");
}
```

### Events

Listen for dialog events:

```javascript
document.addEventListener("dialog:open", (e) => {
  console.log("Dialog opened:", e.detail.dialogId);
});

document.addEventListener("dialog:close", (e) => {
  console.log("Dialog closed:", e.detail.dialogId);
});
```

## Data Attributes

### Triggers

- `data-dialog-trigger="dialog-id"` - Opens the specified dialog

### Close Buttons

- `data-dialog-close="dialog-id"` - Closes the specified dialog

### Configuration

- `data-close-outside="true|false"` - Override closeOnOutsideClick prop
- `data-close-escape="true|false"` - Override closeOnEscape prop

## CSS Custom Properties

You can customize the dialog appearance using CSS custom properties:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Warning colors */
  --color-warning: #f59e0b;
  --color-warning-light: #fef3c7;
  --color-warning-dark: #92400e;

  /* Danger colors */
  --color-danger: #ef4444;
  --color-danger-light: #fee2e2;
  --color-danger-dark: #991b1b;
}
```

## Browser Support

### Modern Features

- **Backdrop Filter**: Blur effect (graceful fallback to solid background)
- **Container Queries**: Advanced responsive behavior (fallback to media queries)
- **CSS :has()**: Advanced selectors (fallback to JavaScript classes)

### Accessibility Standards

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA implementation
- **High Contrast Mode**: Enhanced visibility
- **Reduced Motion**: Respects user preferences

## Performance

- **Lazy Loading**: JavaScript only loads when needed
- **Event Delegation**: Efficient event handling
- **Mutation Observer**: Handles dynamic content
- **Memory Management**: Proper cleanup and garbage collection

## Best Practices

1. **Always provide a title** for screen reader users
2. **Use semantic actions** in the actions slot
3. **Include proper form labels** in form dialogs
4. **Test keyboard navigation** thoroughly
5. **Consider mobile experience** for all sizes
6. **Provide clear close options** for users

## Migration from Old Dialog

If you're upgrading from the previous dialog implementation:

1. **Update imports**: Change to `import Dialog from '../components/Dialog/Dialog.astro'`
2. **Update main.js**: Import from `../components/Dialog/Dialog.js`
3. **No breaking changes**: All existing props and usage patterns remain the same
