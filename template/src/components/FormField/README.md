# FormField Component

A flexible form input wrapper with label, validation, and help text support.

## Files Structure

```
FormField/
├── FormField.astro    # Main component markup and props
├── FormField.scss     # Component styles
├── FormField.js       # JavaScript functionality (minimal for now)
├── index.js           # Export file for clean imports
└── README.md          # This documentation
```

## Features

### Accessibility ✨

- **Semantic HTML**: Proper label association with `for`/`id` attributes
- **ARIA Support**: `aria-describedby` for help text and errors
- **Error States**: `aria-invalid` and `role="alert"` for errors
- **Required Fields**: Visual and semantic indication with `*`
- **High Contrast**: Enhanced visibility for accessibility
- **Keyboard Navigation**: Full keyboard support

### Form Integration 📝

- **Validation Ready**: Built-in error state styling
- **Help Text**: Optional descriptive text below input
- **Required Indicators**: Clear visual indication for required fields
- **Disabled States**: Proper styling and cursor for disabled inputs
- **Input Types**: Support for text, email, password, number, tel, url

### Responsive Design 📱

- **Full Width**: Takes full width of container
- **Reduced Motion**: Respects user's motion preferences
- **Consistent Spacing**: Standardized margins and padding

## Props

| Prop          | Type                                                            | Default      | Description                 |
| ------------- | --------------------------------------------------------------- | ------------ | --------------------------- |
| `label`       | `string`                                                        | **required** | Label text for the input    |
| `name`        | `string`                                                        | **required** | Input name and ID attribute |
| `type`        | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'`     | HTML input type             |
| `placeholder` | `string`                                                        | `undefined`  | Placeholder text            |
| `required`    | `boolean`                                                       | `false`      | Mark field as required      |
| `disabled`    | `boolean`                                                       | `false`      | Disable the input           |
| `error`       | `string`                                                        | `undefined`  | Error message to display    |
| `helpText`    | `string`                                                        | `undefined`  | Help text below input       |

## Usage

### Basic Usage

```astro
---
import FormField from '../components/FormField';
---

<FormField
  label="Email Address"
  name="email"
  type="email"
  placeholder="Enter your email"
  required
/>
```

### With Help Text

```astro
<FormField
  label="Password"
  name="password"
  type="password"
  helpText="Must be at least 8 characters long"
  required
/>
```

### With Error State

```astro
<FormField
  label="Username"
  name="username"
  error="Username is already taken"
  required
/>
```

### Different Input Types

```astro
<!-- Email -->
<FormField
  label="Email"
  name="email"
  type="email"
  placeholder="user@example.com"
/>

<!-- Phone -->
<FormField
  label="Phone Number"
  name="phone"
  type="tel"
  placeholder="(555) 123-4567"
/>

<!-- URL -->
<FormField
  label="Website"
  name="website"
  type="url"
  placeholder="https://example.com"
/>

<!-- Number -->
<FormField
  label="Age"
  name="age"
  type="number"
  placeholder="25"
/>
```

### Complete Form Example

```astro
---
import FormField from '../components/FormField';
import Button from '../components/Button';
---

<form>
  <FormField
    label="Full Name"
    name="fullName"
    placeholder="Enter your full name"
    required
  />

  <FormField
    label="Email Address"
    name="email"
    type="email"
    placeholder="Enter your email"
    helpText="We'll never share your email with anyone"
    required
  />

  <FormField
    label="Phone Number"
    name="phone"
    type="tel"
    placeholder="(555) 123-4567"
  />

  <FormField
    label="Password"
    name="password"
    type="password"
    helpText="Must be at least 8 characters"
    required
  />

  <Button type="submit" variant="primary">Submit</Button>
</form>
```

## JavaScript API

The FormField component includes a manager for future enhancements:

### Import the Manager

```javascript
import { FormFieldManager } from "../components/FormField";

// Or use the global instance
const formFieldManager = window.FormFieldManager;
```

### Future Methods (Planned)

```javascript
// Validate a specific field
formFieldManager.validateField("email");

// Clear error states
formFieldManager.clearErrors("email");

// Set error dynamically
formFieldManager.setError("email", "Invalid email format");
```

## CSS Classes

### Base Classes

- `.form-field` - Container wrapper
- `.form-field__label` - Label styling
- `.form-field__input` - Input styling
- `.form-field__help` - Help text styling
- `.form-field__error` - Error message styling

### Modifier Classes

- `.form-field__input--error` - Error state styling
- `.form-field__required` - Required indicator styling

## Customization

### CSS Custom Properties

```css
:root {
  /* You can override these in your main stylesheet */
  --form-field-border-color: #ccc;
  --form-field-focus-color: #007bff;
  --form-field-error-color: #dc3545;
  --form-field-help-color: #6c757d;
}
```

### Override Styles

```scss
// Custom form field styles
.form-field__input {
  border-radius: 8px; // More rounded corners
  font-size: 1.1rem; // Larger text
}

.form-field__label {
  font-weight: 600; // Bolder labels
  color: #2d3748; // Custom color
}
```

## Accessibility Features

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full tab and focus support
- **Screen Readers**: Proper label and description association
- **High Contrast Mode**: Enhanced border visibility
- **Error Announcements**: Screen readers announce errors
- **Required Field Indication**: Both visual and semantic

## Browser Support

- **Modern Browsers**: Full feature support
- **Fallbacks**: Graceful degradation for older browsers
- **Progressive Enhancement**: Works without JavaScript

## Best Practices

1. **Always provide meaningful labels** - avoid placeholder-only forms
2. **Use appropriate input types** - helps with mobile keyboards and validation
3. **Provide helpful error messages** - be specific about what's wrong
4. **Include help text for complex fields** - guide users proactively
5. **Test with keyboard navigation** - ensure full accessibility
6. **Consider mobile experience** - test on various screen sizes

## Migration from Old FormField

If upgrading from the previous FormField:

1. **Update imports**: Change to `import FormField from '../components/FormField'`
2. **No prop changes**: All existing props work the same way
3. **Styles preserved**: All styling behavior is identical
