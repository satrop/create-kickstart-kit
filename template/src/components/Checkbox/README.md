# Checkbox Component

A fully accessible and customizable checkbox component with advanced features.

## Features

- **Accessible by default** with proper ARIA attributes and keyboard support
- **Custom styling** with smooth animations and hover effects
- **Validation support** with custom rules and error display
- **Indeterminate state** for partial selections
- **Loading states** for async operations
- **Group management** with "select all" functionality
- **Size variants** (small, medium, large)
- **Dark mode support** with automatic theme adaptation
- **Mobile optimized** with larger touch targets

## Usage

### Basic Checkbox

```astro
---
import Checkbox from '@components/Checkbox/Checkbox.astro';
---

<Checkbox
  name="terms"
  label="I agree to the terms and conditions"
  required={true}
/>
```

### Checkbox with Help Text

```astro
<Checkbox
  name="newsletter"
  label="Subscribe to newsletter"
  helpText="You can unsubscribe at any time"
  value="yes"
/>
```

### Checkbox with Error

```astro
<Checkbox
  name="privacy"
  label="Accept privacy policy"
  error="You must accept the privacy policy to continue"
  required={true}
/>
```

### Checkbox Group

```astro
<div class="checkbox-group">
  <h3 class="checkbox-group__label">Select your interests:</h3>

  <Checkbox name="interests" value="web-dev" label="Web Development" />
  <Checkbox name="interests" value="design" label="UI/UX Design" />
  <Checkbox name="interests" value="mobile" label="Mobile Development" />
</div>
```

### Select All Checkbox

```astro
<div class="checkbox-group">
  <Checkbox
    name="select-all"
    label="Select All"
    data-select-all="true"
  />

  <Checkbox name="items" value="1" label="Item 1" />
  <Checkbox name="items" value="2" label="Item 2" />
  <Checkbox name="items" value="3" label="Item 3" />
</div>
```

## Props

| Prop       | Type      | Default     | Description              |
| ---------- | --------- | ----------- | ------------------------ |
| `name`     | `string`  | _required_  | Input name attribute     |
| `value`    | `string`  | `undefined` | Input value              |
| `checked`  | `boolean` | `false`     | Initial checked state    |
| `disabled` | `boolean` | `false`     | Disable the checkbox     |
| `required` | `boolean` | `false`     | Mark as required field   |
| `label`    | `string`  | _required_  | Checkbox label text      |
| `helpText` | `string`  | `undefined` | Help text below checkbox |
| `error`    | `string`  | `undefined` | Error message to display |

## Data Attributes

| Attribute            | Description                                |
| -------------------- | ------------------------------------------ |
| `data-indeterminate` | Set indeterminate state (`"true"/"false"`) |
| `data-loading`       | Show loading state (`"true"/"false"`)      |
| `data-select-all`    | Mark as "select all" checkbox              |
| `data-validation`    | Custom validation rule (JSON string)       |
| `data-role`          | Custom ARIA role                           |

## CSS Classes

### Size Variants

```astro
<div class="checkbox-field checkbox-field--small">
  <Checkbox name="small" label="Small checkbox" />
</div>

<div class="checkbox-field checkbox-field--large">
  <Checkbox name="large" label="Large checkbox" />
</div>
```

### Group Layouts

```astro
<!-- Vertical group (default) -->
<div class="checkbox-group">
  <!-- checkboxes -->
</div>

<!-- Horizontal group -->
<div class="checkbox-group checkbox-group--horizontal">
  <!-- checkboxes -->
</div>
```

## JavaScript API

### CheckboxComponent Class

```javascript
// Get checkbox component instance
const checkboxElement = document.querySelector(".checkbox-field");
const checkbox = checkboxElement.checkboxComponent;

// Methods
checkbox.check(); // Check the checkbox
checkbox.uncheck(); // Uncheck the checkbox
checkbox.toggle(); // Toggle checked state
checkbox.setIndeterminate(true); // Set indeterminate state
checkbox.setLoading(true); // Show loading state
checkbox.setError("Error message"); // Set error message
checkbox.setDisabled(true); // Disable checkbox
checkbox.isValid(); // Check if valid
checkbox.getValue(); // Get current value/state
```

### CheckboxGroupManager Class

```javascript
// Get group manager instance
const groupElement = document.querySelector(".checkbox-group");
const groupManager = groupElement.checkboxGroupManager;

// Methods
groupManager.checkAll(); // Check all checkboxes
groupManager.uncheckAll(); // Uncheck all checkboxes
groupManager.getCheckedCount(); // Get number of checked items
groupManager.getCheckedValues(); // Get array of checked values
groupManager.validate(); // Validate all checkboxes
```

## Events

The Checkbox component emits custom events:

```javascript
// Individual checkbox change
document.addEventListener("checkbox:change", (event) => {
  console.log("Checkbox changed:", event.detail);
  // { checked, value, name, element, valid, originalEvent }
});

// Group state change
document.addEventListener("checkbox:group:change", (event) => {
  console.log("Group changed:", event.detail);
  // { checkedCount, totalCount, allChecked, noneChecked, someChecked, group }
});

// Analytics events
document.addEventListener("checkbox:analytics", (event) => {
  console.log("Checkbox interaction:", event.detail);
  // { action, name, value, checked, element }
});
```

## Validation

### Built-in Validation

```astro
<!-- Required validation -->
<Checkbox name="required-field" label="Required" required={true} />
```

### Custom Validation

```astro
<Checkbox
  name="custom"
  label="Custom validation"
  data-validation='{"validate": "value.length > 0", "message": "Custom error"}'
/>
```

### JavaScript Validation

```javascript
const checkbox = checkboxElement.checkboxComponent;

// Add custom validation rule
checkbox.validationRules.push({
  validate: () => checkbox.input.checked && someCondition(),
  message: "Custom validation failed",
});

// Validate
const isValid = checkbox.isValid();
```

## Styling

The component uses CSS classes that can be customized:

- `.checkbox-field` - Base checkbox container
- `.checkbox-field__input` - Hidden input element
- `.checkbox-field__label` - Label container
- `.checkbox-field__box` - Visual checkbox box
- `.checkbox-field__checkmark` - Checkmark icon
- `.checkbox-field__text` - Label text
- `.checkbox-field__help` - Help text
- `.checkbox-field__error` - Error text
- `.checkbox-group` - Group container

### State Classes

- `.checkbox-field--focused` - Focus state
- `.checkbox-field--error` - Error state
- `.checkbox-field--loading` - Loading state
- `.checkbox-field--indeterminate` - Indeterminate state
- `.checkbox-field--disabled` - Disabled state

## Accessibility

- **Semantic HTML** with proper `<input type="checkbox">` and `<label>` association
- **ARIA attributes** including `aria-describedby`, `aria-invalid`, `aria-labelledby`
- **Keyboard navigation** with standard Space key interaction
- **Screen reader support** with proper announcements
- **Focus management** with visible focus indicators
- **Group semantics** with `role="group"` and group labeling
- **High contrast mode** support
- **Reduced motion** support for animations

## Examples

### Terms and Conditions

```astro
<Checkbox
  name="terms"
  label="I have read and agree to the Terms of Service and Privacy Policy"
  required={true}
  error={termsError}
/>
```

### Newsletter Subscription

```astro
<Checkbox
  name="newsletter"
  value="subscribe"
  label="Subscribe to our newsletter"
  helpText="Get updates about new features and releases"
/>
```

### Feature Selection

```astro
<div class="checkbox-group">
  <h3 class="checkbox-group__label">Choose features to enable:</h3>

  <Checkbox
    name="features"
    value="notifications"
    label="Push Notifications"
    helpText="Receive updates in real-time"
  />

  <Checkbox
    name="features"
    value="analytics"
    label="Analytics"
    helpText="Help us improve the product"
  />

  <Checkbox
    name="features"
    value="beta"
    label="Beta Features"
    helpText="Try experimental features (may be unstable)"
  />
</div>
```

### Bulk Actions with Select All

```astro
<div class="checkbox-group">
  <Checkbox
    name="bulk-select"
    label="Select All Items"
    data-select-all="true"
  />

  <div class="checkbox-group__divider"></div>

  <Checkbox name="items" value="1" label="Document 1.pdf" />
  <Checkbox name="items" value="2" label="Image 2.jpg" />
  <Checkbox name="items" value="3" label="Video 3.mp4" />
</div>
```
