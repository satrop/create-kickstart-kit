# Accordion Component

A fully accessible accordion/collapsible content component with keyboard navigation and smooth animations.

## Files Structure

```
Accordion/
├── Accordion.astro    # Main component markup and props
├── Accordion.scss     # Component styles and animations
├── Accordion.js       # JavaScript functionality and accessibility
├── index.js           # Export file for clean imports
└── README.md          # This documentation
```

## Features

### Accessibility ✨

- **Keyboard Navigation**: Full arrow key navigation (up/down, home/end)
- **ARIA Support**: Proper `aria-expanded`, `aria-controls`, and `aria-labelledby` attributes
- **Screen Reader Support**: Semantic HTML with proper headings and regions
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Enhanced visibility for accessibility
- **Reduced Motion**: Respects user's motion preferences

### Functionality 🎛️

- **Single/Multiple Mode**: Control whether multiple panels can be open
- **Smooth Animations**: CSS-based expand/collapse animations
- **Dynamic Content**: Supports both plain text and HTML content
- **Event System**: Custom events for expand/collapse actions
- **Public API**: Programmatic control of accordion state

### Responsive Design 📱

- **Mobile Optimized**: Touch-friendly interface
- **Variant System**: Default, bordered, and flush styles
- **Flexible Content**: Adapts to any content length

## Props

| Prop            | Type                                 | Default      | Description                      |
| --------------- | ------------------------------------ | ------------ | -------------------------------- |
| `items`         | `AccordionItem[]`                    | **required** | Array of accordion items         |
| `allowMultiple` | `boolean`                            | `false`      | Allow multiple panels to be open |
| `variant`       | `'default' \| 'bordered' \| 'flush'` | `'default'`  | Visual style variant             |

### AccordionItem Interface

| Property      | Type     | Required | Description                                |
| ------------- | -------- | -------- | ------------------------------------------ |
| `id`          | `string` | ✅       | Unique identifier for the item             |
| `title`       | `string` | ✅       | Panel header text                          |
| `content`     | `string` | ❌       | Plain text content                         |
| `htmlContent` | `string` | ❌       | HTML content (takes priority over content) |

## Usage

### Basic Usage

```astro
---
import Accordion from '../components/Accordion';

const items = [
  {
    id: 'item1',
    title: 'What is this?',
    content: 'This is a basic accordion item with plain text content.'
  },
  {
    id: 'item2',
    title: 'How does it work?',
    content: 'Click the header to expand or collapse the content panel.'
  }
];
---

<Accordion items={items} />
```

### Multiple Panels Open

```astro
---
const faqItems = [
  {
    id: 'faq1',
    title: 'Can I open multiple panels?',
    content: 'Yes! Set allowMultiple to true.'
  },
  {
    id: 'faq2',
    title: 'Is it accessible?',
    content: 'Absolutely! Full keyboard navigation and screen reader support.'
  }
];
---

<Accordion items={faqItems} allowMultiple={true} />
```

### HTML Content

```astro
---
const richItems = [
  {
    id: 'rich1',
    title: 'Rich Content Example',
    htmlContent: `
      <p>This panel contains <strong>HTML content</strong>:</p>
      <ul>
        <li>Lists and formatting</li>
        <li>Links and images</li>
        <li>Any HTML elements</li>
      </ul>
    `
  }
];
---

<Accordion items={richItems} />
```

### Different Variants

```astro
<!-- Default - single border around entire accordion -->
<Accordion items={items} variant="default" />

<!-- Bordered - each panel has its own border -->
<Accordion items={items} variant="bordered" />

<!-- Flush - no borders, minimal styling -->
<Accordion items={items} variant="flush" />
```

## JavaScript API

The accordion component provides a comprehensive API for programmatic control:

### Import the Manager

```javascript
import { AccordionManager } from "../components/Accordion";

// Or use the global instance
const accordionManager = window.AccordionManager;
```

### Methods

```javascript
// Expand a specific item
accordionManager.expandItem(".my-accordion", "item1");

// Collapse a specific item
accordionManager.collapseItem(".my-accordion", "item1");

// Collapse all items in an accordion
accordionManager.collapseAll(".my-accordion");
```

### Events

Listen for accordion events:

```javascript
document.addEventListener("accordion:initialized", (e) => {
  console.log("Accordion ready:", e.detail);
});

document.addEventListener("accordion:expand", (e) => {
  console.log("Panel expanded:", e.detail.itemId);
});

document.addEventListener("accordion:collapse", (e) => {
  console.log("Panel collapsed:", e.detail.itemId);
});
```

### Instance API

Access individual accordion instances:

```javascript
const accordion = document.querySelector(".accordion");
const instance = accordion._accordionInstance;

// Control individual accordion
instance.expandItem("item1");
instance.collapseItem("item1");
instance.collapseAll();
instance.expandAll(); // Only works if allowMultiple is true

// Check state
if (instance.isExpanded("item1")) {
  console.log("Item 1 is expanded");
}
```

## Keyboard Navigation

| Key               | Action                                  |
| ----------------- | --------------------------------------- |
| `↓` / `ArrowDown` | Move focus to next accordion header     |
| `↑` / `ArrowUp`   | Move focus to previous accordion header |
| `Home`            | Move focus to first accordion header    |
| `End`             | Move focus to last accordion header     |
| `Enter` / `Space` | Toggle the focused accordion panel      |
| `Tab`             | Move focus to next focusable element    |

## CSS Classes

### Base Classes

- `.accordion` - Main container
- `.accordion__item` - Individual accordion item
- `.accordion__header` - Header container (h3)
- `.accordion__trigger` - Clickable button
- `.accordion__title` - Title text
- `.accordion__icon` - Expand/collapse icon
- `.accordion__content` - Content container
- `.accordion__body` - Content wrapper with padding

### Variant Classes

- `.accordion--default` - Default styling with border
- `.accordion--bordered` - Each item has individual borders
- `.accordion--flush` - Minimal styling without borders

### State Classes

- `[aria-expanded="true"]` - Expanded trigger state
- `[data-expanded="true"]` - Expanded content state

## Customization

### CSS Custom Properties

```css
:root {
  /* Override these in your main stylesheet */
  --accordion-border-color: #e0e0e0;
  --accordion-bg-hover: #f8f9fa;
  --accordion-focus-color: #007bff;
  --accordion-text-color: #333;
  --accordion-icon-color: #666;
}
```

### Override Styles

```scss
// Custom accordion styles
.accordion__trigger {
  font-size: 1.1rem; // Larger text
  padding: 1.5rem; // More padding

  &:hover {
    background: #f0f8ff; // Custom hover color
  }
}

.accordion__content {
  transition: max-height 0.5s ease; // Slower animation
}
```

## Advanced Examples

### Mixed Content Types

```astro
---
const mixedItems = [
  {
    id: 'text',
    title: 'Plain Text Panel',
    content: 'Simple text content here.'
  },
  {
    id: 'html',
    title: 'HTML Content Panel',
    htmlContent: `
      <div style="padding: 1rem; background: #f8f9fa; border-radius: 4px;">
        <h4>Rich Content</h4>
        <p>This panel contains formatted HTML with:</p>
        <ul>
          <li><strong>Bold text</strong></li>
          <li><em>Italic text</em></li>
          <li><a href="#">Links</a></li>
        </ul>
      </div>
    `
  }
];
---

<Accordion items={mixedItems} />
```

### Integration with Forms

```astro
---
const formSections = [
  {
    id: 'personal',
    title: 'Personal Information',
    htmlContent: `
      <div class="form-section">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email Address" />
      </div>
    `
  },
  {
    id: 'preferences',
    title: 'Preferences',
    htmlContent: `
      <div class="form-section">
        <label><input type="checkbox" /> Email notifications</label>
        <label><input type="checkbox" /> SMS updates</label>
      </div>
    `
  }
];
---

<form>
  <Accordion items={formSections} allowMultiple={true} />
  <button type="submit">Submit</button>
</form>
```

## Browser Support

- **Modern Browsers**: Full feature support
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: WCAG 2.1 AA compliant
- **Animation Fallbacks**: Reduced motion support

## Best Practices

1. **Provide meaningful titles** that describe the content
2. **Keep content concise** for better user experience
3. **Use HTML content** for rich formatting when needed
4. **Test keyboard navigation** thoroughly
5. **Consider mobile experience** for touch interaction
6. **Limit nesting** - avoid accordions inside accordions

## Migration from Old Accordion

If upgrading from the previous Accordion:

1. **Update imports**: Change to `import Accordion from '../components/Accordion'`
2. **No prop changes**: All existing props work the same way
3. **Enhanced API**: New JavaScript methods available
4. **Better events**: More detailed event information
