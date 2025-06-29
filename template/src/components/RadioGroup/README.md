# RadioGroup Component

A fully accessible radio button group component with enhanced keyboard navigation and customizable styling.

## Features

- ✅ **Fully Accessible**: WCAG 2.1 AA compliant with proper ARIA attributes
- ✅ **Enhanced Keyboard Navigation**: Arrow keys, Home/End navigation
- ✅ **Flexible Layout**: Vertical or horizontal orientation
- ✅ **Error Handling**: Built-in validation and error states
- ✅ **Custom Styling**: Customizable radio button appearance
- ✅ **TypeScript Support**: Full type definitions
- ✅ **Form Integration**: Works seamlessly with forms

## Usage

### Basic Example

```astro
---
import RadioGroup from '../components/RadioGroup';

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' }
];
---

<RadioGroup
  name="color"
  label="Choose a color"
  options={colorOptions}
  value="blue"
/>
```

### With Help Text

```astro
<RadioGroup
  name="size"
  label="T-shirt size"
  options={sizeOptions}
  helpText="Select your preferred size"
  required
/>
```

### With Error State

```astro
<RadioGroup
  name="plan"
  label="Subscription plan"
  options={planOptions}
  error="Please select a subscription plan"
  orientation="horizontal"
/>
```

### Disabled Options

```astro
---
const subscriptionOptions = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise', disabled: true }
];
---

<RadioGroup
  name="subscription"
  label="Plan"
  options={subscriptionOptions}
/>
```

## Props

| Prop          | Type                         | Default      | Description                                      |
| ------------- | ---------------------------- | ------------ | ------------------------------------------------ |
| `name`        | `string`                     | -            | **Required.** Name attribute for the radio group |
| `options`     | `RadioOption[]`              | -            | **Required.** Array of radio options             |
| `label`       | `string`                     | -            | **Required.** Label for the radio group          |
| `value`       | `string`                     | -            | Currently selected value                         |
| `required`    | `boolean`                    | `false`      | Whether the field is required                    |
| `helpText`    | `string`                     | -            | Helper text displayed below options              |
| `error`       | `string`                     | -            | Error message (adds error styling)               |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation                               |

### RadioOption Interface

```typescript
interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Accessibility

### ARIA Labels and Descriptions

- Uses `<fieldset>` and `<legend>` for proper grouping
- `aria-describedby` links help text and errors
- `aria-invalid` indicates error states
- `role="alert"` for error messages

### Keyboard Navigation

- **Arrow Keys**: Navigate between options
- **Space**: Select focused option
- **Home/End**: Jump to first/last option
- **Tab**: Enter/exit the radio group

### Screen Reader Support

- Announces group label and current selection
- Reads help text and error messages
- Indicates required fields and disabled options

## JavaScript API

The component provides a JavaScript API for programmatic control:

```javascript
// Get the component instance
const radioGroup = document.querySelector('[data-component="radio-group"]');
const component = radioGroup.radioGroupComponent;

// Set value programmatically
component.setValue("blue");

// Get current value
const currentValue = component.getValue();

// Set error state
component.setError(true);

// Listen for changes
radioGroup.addEventListener("radiogroup:change", (e) => {
  console.log("Selected:", e.detail.value);
});
```

## Styling

The component uses BEM methodology with CSS custom properties for easy customization:

```scss
.radio-group {
  // Customize spacing
  --radio-group-gap: 1rem;

  // Customize colors
  --radio-color-primary: #007bff;
  --radio-color-error: #dc3545;
  --radio-color-disabled: #6c757d;
}
```

### CSS Classes

- `.radio-group` - Main container
- `.radio-group__legend` - Group label
- `.radio-group__options` - Options container
- `.radio-field` - Individual radio field
- `.radio-field__input` - Hidden radio input
- `.radio-field__label` - Visible label
- `.radio-field__button` - Custom radio button
- `.radio-field__dot` - Radio dot indicator
- `.radio-group__help` - Help text
- `.radio-group__error` - Error message

## Examples

### Survey Form

```astro
---
const satisfactionOptions = [
  { value: '1', label: 'Very Dissatisfied' },
  { value: '2', label: 'Dissatisfied' },
  { value: '3', label: 'Neutral' },
  { value: '4', label: 'Satisfied' },
  { value: '5', label: 'Very Satisfied' }
];
---

<form>
  <RadioGroup
    name="satisfaction"
    label="How satisfied are you with our service?"
    options={satisfactionOptions}
    orientation="horizontal"
    required
  />
</form>
```

### Settings Panel

```astro
---
const themeOptions = [
  { value: 'light', label: 'Light theme' },
  { value: 'dark', label: 'Dark theme' },
  { value: 'auto', label: 'Follow system preference' }
];
---

<RadioGroup
  name="theme"
  label="Appearance"
  options={themeOptions}
  value="auto"
  helpText="Choose how the interface should appear"
/>
```

## Best Practices

1. **Use clear, descriptive labels** for each option
2. **Provide help text** for complex choices
3. **Group related options** logically
4. **Use horizontal layout** for short lists (2-4 items)
5. **Use vertical layout** for longer lists or detailed options
6. **Always include a legend** that describes the group
7. **Handle validation** and show clear error messages

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- `FormField` - For wrapping form controls
- `Checkbox` - For multiple selection scenarios
- `Select` - For dropdown selection with many options
