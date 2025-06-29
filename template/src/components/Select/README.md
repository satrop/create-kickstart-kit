# Select Component

A fully accessible and customizable select dropdown component with enhanced features including search, multi-select, and clear functionality.

## Features

- ✅ **Fully Accessible**: WCAG 2.1 AA compliant with proper ARIA attributes
- ✅ **Enhanced Keyboard Navigation**: Arrow keys, search typing, clear shortcuts
- ✅ **Multi-Select Support**: Handle multiple selections with proper UI
- ✅ **Search Functionality**: Type-ahead search within options
- ✅ **Clear Functionality**: Optional clear button for easy value reset
- ✅ **Custom Styling**: Beautiful custom dropdown styling while maintaining accessibility
- ✅ **Form Integration**: Works seamlessly with forms and validation
- ✅ **TypeScript Support**: Full type definitions
- ✅ **Loading States**: Built-in loading indicator support

## Usage

### Basic Select

```astro
---
import Select from '../components/Select';

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' }
];
---

<Select
  name="color"
  label="Choose a color"
  options={colorOptions}
  placeholder="Select a color..."
/>
```

### Multi-Select

```astro
---
const skillOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' }
];
---

<Select
  name="skills"
  label="Select your skills"
  options={skillOptions}
  multiple
  value={['js', 'react']}
/>
```

> **Note**: Multi-select uses a list-box style interface instead of a dropdown. The dropdown arrow is automatically hidden for multi-select fields, and the styling adapts to show a scrollable list of options.

### Searchable Select

```astro
---
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  // ... many more options
];
---

<Select
  name="country"
  label="Select your country"
  options={countryOptions}
  searchable
  clearable
  placeholder="Type to search countries..."
/>
```

### With Validation

```astro
<Select
  name="category"
  label="Category"
  options={categoryOptions}
  required
  error="Please select a category"
  helpText="Choose the most appropriate category"
/>
```

### Disabled Options

```astro
---
const planOptions = [
  { value: 'free', label: 'Free Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise Plan', disabled: true }
];
---

<Select
  name="plan"
  label="Choose your plan"
  options={planOptions}
/>
```

## Props

| Prop          | Type                 | Default | Description                                 |
| ------------- | -------------------- | ------- | ------------------------------------------- |
| `name`        | `string`             | -       | **Required.** Name attribute for the select |
| `options`     | `SelectOption[]`     | -       | **Required.** Array of select options       |
| `label`       | `string`             | -       | Label for the select field                  |
| `value`       | `string \| string[]` | -       | Selected value(s)                           |
| `placeholder` | `string`             | -       | Placeholder text for empty select           |
| `required`    | `boolean`            | `false` | Whether the field is required               |
| `disabled`    | `boolean`            | `false` | Whether the select is disabled              |
| `error`       | `string`             | -       | Error message (adds error styling)          |
| `helpText`    | `string`             | -       | Helper text displayed below select          |
| `multiple`    | `boolean`            | `false` | Enable multi-select functionality           |
| `searchable`  | `boolean`            | `false` | Enable search/filter functionality          |
| `clearable`   | `boolean`            | `false` | Show clear button when value is selected    |
| `class`       | `string`             | -       | Additional CSS classes                      |

### SelectOption Interface

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Accessibility

### ARIA Labels and Descriptions

- Proper `<label>` association with select element
- `aria-describedby` for help text and error messages
- `aria-invalid` for error states
- `aria-expanded` and `aria-haspopup` for searchable selects

### Keyboard Navigation

- **Arrow Keys**: Navigate through options
- **Enter/Space**: Select option
- **Escape**: Close dropdown (searchable selects)
- **Tab**: Navigate to next form element
- **Type-ahead**: Type to search/filter options
- **Ctrl+Backspace**: Clear selection (when clearable)

### Screen Reader Support

- Announces field label and current selection
- Reads help text and error messages
- Indicates required fields and disabled options
- Proper focus management and navigation

## JavaScript API

The component provides a comprehensive JavaScript API for programmatic control:

```javascript
// Get the component instance
const selectElement = document.querySelector('[data-component="select"]');
const component = selectElement.selectComponent;

// Set value programmatically
component.setValue("blue");
component.setValue(["red", "blue"]); // For multi-select

// Get current value
const currentValue = component.getValue();

// Clear selection
component.clearSelection();

// Add/remove options dynamically
component.addOption({ value: "purple", label: "Purple" });
component.removeOption("red");

// Enable/disable
component.disable();
component.enable();

// Validation
const isValid = component.validate();
component.setError("Please select a valid option");

// Get selected options (useful for multi-select)
const selected = component.getSelectedOptions();

// Listen for changes
selectElement.addEventListener("select:change", (e) => {
  console.log("Selected:", e.detail.value);
});
```

## Styling

The component uses BEM methodology with CSS custom properties for easy customization:

```scss
.select-field {
  // Customize spacing
  --select-padding: 0.75rem;
  --select-border-radius: 0.375rem;

  // Customize colors
  --select-border-color: #e1e5e9;
  --select-focus-color: #007bff;
  --select-error-color: #dc3545;
  --select-disabled-bg: #f8f9fa;
}
```

### CSS Classes

- `.select-field` - Main container
- `.select-field__label` - Field label
- `.select-field__wrapper` - Select wrapper
- `.select-field__input` - Select element
- `.select-field__arrow` - Dropdown arrow
- `.select-field__clear` - Clear button
- `.select-field__help` - Help text
- `.select-field__error` - Error message
- `.select-field--error` - Error state
- `.select-field--focused` - Focused state
- `.select-field--has-value` - Has selected value
- `.select-field--disabled` - Disabled state

## Advanced Features

### Custom Dropdown (Searchable)

For searchable selects, the component can create a custom dropdown with enhanced features:

```astro
<Select
  name="advanced"
  label="Advanced Select"
  options={manyOptions}
  searchable
  clearable
  helpText="Type to filter options"
/>
```

### Async Option Loading

```javascript
// Load options dynamically
async function loadOptions(searchTerm) {
  const response = await fetch(`/api/options?search=${searchTerm}`);
  const options = await response.json();

  // Clear existing options
  component.select.innerHTML = "";

  // Add new options
  options.forEach((option) => {
    component.addOption(option);
  });
}

// Listen for search input
selectElement.addEventListener("search", (e) => {
  loadOptions(e.detail.searchTerm);
});
```

## Examples

### Form Integration

```astro
---
const categories = [
  { value: 'tech', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' }
];

const tags = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' }
];
---

<form>
  <Select
    name="category"
    label="Article Category"
    options={categories}
    required
    helpText="Choose the primary category for this article"
  />

  <Select
    name="tags"
    label="Tags"
    options={tags}
    multiple
    helpText="Select all applicable tags"
  />

  <button type="submit">Save Article</button>
</form>
```

### Conditional Options

```astro
---
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];

// States only available when US is selected
const stateOptions = [
  { value: 'ca', label: 'California' },
  { value: 'ny', label: 'New York' },
  { value: 'tx', label: 'Texas' }
];
---

<Select
  name="country"
  label="Country"
  options={countryOptions}
  value="us"
/>

<Select
  name="state"
  label="State"
  options={stateOptions}
  disabled={selectedCountry !== 'us'}
/>
```

## Best Practices

1. **Use clear, descriptive labels** for options
2. **Provide help text** for complex selections
3. **Group related options** using optgroups when needed
4. **Limit options** in basic selects (use searchable for many options)
5. **Use multi-select sparingly** - consider checkboxes for complex multi-selection
6. **Provide clear feedback** for validation errors
7. **Consider mobile experience** - native selects work well on mobile
8. **Test with screen readers** to ensure accessibility

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills for enhanced features)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for unsupported features

## Related Components

- `FormField` - For wrapping form controls
- `RadioGroup` - For single selection with visible options
- `Checkbox` - For multi-selection scenarios
- `Button` - For dropdown-style action selectors
