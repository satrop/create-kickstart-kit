# Alert Component

A flexible and accessible alert component for displaying messages to users.

## Features

- **Multiple variants**: info, success, warning, error
- **Dismissible alerts** with close button
- **Auto-dismiss functionality** with configurable timeout
- **Smooth animations** with respect for reduced motion preferences
- **Full accessibility** with ARIA attributes and keyboard support
- **Programmatic API** for creating alerts dynamically
- **Alert Manager** for global alert handling

## Usage

### Basic Alert

```astro
---
import Alert from '@components/Alert/Alert.astro';
---

<Alert type="info">
  This is an informational message.
</Alert>
```

### Dismissible Alert

```astro
<Alert type="success" dismissible={true}>
  Your changes have been saved successfully!
</Alert>
```

### Alert Types

```astro
<Alert type="info">Information message</Alert>
<Alert type="success">Success message</Alert>
<Alert type="warning">Warning message</Alert>
<Alert type="error">Error message</Alert>
```

## Props

| Prop          | Type                                          | Default  | Description                    |
| ------------- | --------------------------------------------- | -------- | ------------------------------ |
| `type`        | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Alert variant/type             |
| `dismissible` | `boolean`                                     | `false`  | Whether alert can be dismissed |

## Data Attributes

| Attribute           | Description                               |
| ------------------- | ----------------------------------------- |
| `data-auto-dismiss` | Auto-dismiss timeout in milliseconds      |
| `data-focus`        | Focus alert on render (useful for errors) |

## JavaScript API

### AlertComponent Class

```javascript
// Get alert component instance
const alertElement = document.querySelector(".alert");
const alert = alertElement.alertComponent;

// Methods
alert.dismiss(); // Dismiss the alert
alert.show(); // Show the alert (if hidden)
alert.hide(); // Hide the alert
alert.updateContent(html); // Update alert content
```

### AlertManager (Global)

```javascript
import alertManager from "@components/Alert/Alert.js";

// Create alerts programmatically
alertManager.info("Information message");
alertManager.success("Success message");
alertManager.warning("Warning message");
alertManager.error("Error message");

// With options
alertManager.success("Saved!", {
  autoDismiss: 3000,
  dismissible: true,
});

// Dismiss all alerts
alertManager.dismissAll();
```

## Events

The Alert component emits custom events:

```javascript
// Listen for alert dismiss
document.addEventListener("alert:dismiss", (event) => {
  console.log("Alert dismissed:", event.detail.type);
});
```

## Styling

The component uses CSS classes that can be customized:

- `.alert` - Base alert styles
- `.alert--info` - Info variant
- `.alert--success` - Success variant
- `.alert--warning` - Warning variant
- `.alert--error` - Error variant
- `.alert__close` - Close button styles

## Accessibility

- Uses `role="alert"` for screen reader announcements
- Includes `aria-live="polite"` for dynamic alerts
- Close button has proper `aria-label`
- Keyboard navigation support (Enter/Space to dismiss)
- Focus management for error alerts
- High contrast mode support
- Respects reduced motion preferences

## Examples

### Auto-dismiss Alert

```astro
<Alert type="success" dismissible={true} data-auto-dismiss="5000">
  This alert will auto-dismiss after 5 seconds.
</Alert>
```

### Error Alert with Focus

```astro
<Alert type="error" dismissible={true} data-focus="true">
  Please correct the errors below.
</Alert>
```

### Dynamic Alerts

```javascript
// Show success message
alertManager.success("Profile updated successfully!", {
  autoDismiss: 3000,
});

// Show error with manual dismiss
alertManager.error("Failed to save changes. Please try again.", {
  dismissible: true,
});
```
