# Tabs Component

A fully accessible tab component that follows ARIA best practices and supports keyboard navigation.

## Features

- ✅ **Full Accessibility**: Follows WAI-ARIA Tab Panel pattern
- ✅ **Keyboard Navigation**: Arrow keys, Home, End, Enter, and Space
- ✅ **Multiple Variants**: Default, underline, and pills styles
- ✅ **Orientation Support**: Horizontal and vertical layouts
- ✅ **Responsive Design**: Mobile-friendly with overflow handling
- ✅ **Flexible Content**: Supports text, HTML, images, lists, buttons, etc.
- ✅ **TypeScript Support**: Full type definitions
- ✅ **Custom Events**: Dispatches `tabchange` events

## Basic Usage

```astro
---
import Tabs from '../components/Tabs/Tabs.astro';

const tabItems = [
  {
    id: 'tab1',
    label: 'First Tab',
    content: 'This is the content of the first tab.'
  },
  {
    id: 'tab2',
    label: 'Second Tab',
    htmlContent: '<p>This tab contains <strong>HTML content</strong>.</p>'
  },
  {
    id: 'tab3',
    label: 'Third Tab',
    htmlContent: `
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    `
  }
];
---

<Tabs items={tabItems} />
```

## Advanced Usage

```astro
---
const complexTabItems = [
  {
    id: 'overview',
    label: 'Overview',
    htmlContent: `
      <h3>Welcome to our service</h3>
      <p>This is an overview of what we offer.</p>
      <img src="/images/overview.jpg" alt="Service overview" />
    `
  },
  {
    id: 'features',
    label: 'Features',
    htmlContent: `
      <h3>Key Features</h3>
      <ul>
        <li>Feature one</li>
        <li>Feature two</li>
        <li>Feature three</li>
      </ul>
      <button type="button" class="btn btn--primary">Learn More</button>
    `
  },
  {
    id: 'pricing',
    label: 'Pricing',
    htmlContent: `
      <h3>Pricing Plans</h3>
      <ol>
        <li>Basic - $10/month</li>
        <li>Pro - $25/month</li>
        <li>Enterprise - Contact us</li>
      </ol>
    `
  }
];
---

<Tabs
  items={complexTabItems}
  activeTab="features"
  variant="pills"
  orientation="vertical"
/>
```

## Props

### `items` (required)

Array of tab items with the following structure:

- `id` (string): Unique identifier for the tab
- `label` (string): Display text for the tab button
- `content` (string, optional): Plain text content
- `htmlContent` (string, optional): HTML content (takes precedence over content)

### `activeTab` (optional)

- Type: `string`
- Default: First tab's ID
- The ID of the initially active tab

### `variant` (optional)

- Type: `"default" | "underline" | "pills"`
- Default: `"default"`
- Visual style variant

### `orientation` (optional)

- Type: `"horizontal" | "vertical"`
- Default: `"horizontal"`
- Layout orientation

## Accessibility Features

- **ARIA Roles**: Uses proper `tablist`, `tab`, and `tabpanel` roles
- **ARIA States**: Manages `aria-selected`, `aria-controls`, and `aria-labelledby`
- **Keyboard Navigation**:
  - Arrow keys navigate between tabs
  - Home/End jump to first/last tab
  - Enter/Space activate the focused tab
  - Tab key moves focus in/out of the tab list
- **Focus Management**: Proper tab index management and focus indication
- **Screen Reader Support**: Announces tab changes and states

## Keyboard Shortcuts

| Key               | Action                                 |
| ----------------- | -------------------------------------- |
| `←` / `→`         | Navigate tabs (horizontal orientation) |
| `↑` / `↓`         | Navigate tabs (vertical orientation)   |
| `Home`            | Focus first tab                        |
| `End`             | Focus last tab                         |
| `Enter` / `Space` | Activate focused tab                   |
| `Tab`             | Move focus to/from tab list            |

## Events

The component dispatches a `tabchange` event when a tab is activated:

```javascript
document.addEventListener("tabchange", (event) => {
  console.log("Active tab:", event.detail.activeTab);
});
```

## JavaScript API

Access the tab instance to control it programmatically:

```javascript
const tabsElement = document.querySelector("[data-tabs]");
const tabsInstance = tabsElement.tabsInstance;

// Get the currently active tab
const activeTab = tabsInstance.getActiveTab();

// Set a specific tab as active
tabsInstance.setActiveTab("tab2");
```

## Styling

The component includes three built-in variants and is fully customizable via CSS custom properties and SCSS variables. It also supports:

- High contrast mode
- Reduced motion preferences
- Responsive design
- Focus indicators
- Smooth animations

## Content Examples

The tabs can contain any type of content:

```astro
{
  id: 'multimedia',
  label: 'Media & Interactive',
  htmlContent: `
    <h3>Rich Content Example</h3>
    <figure>
      <img src="/images/example.jpg" alt="Example image" />
      <figcaption>An example image with caption</figcaption>
    </figure>

    <h4>Interactive Elements</h4>
    <form>
      <input type="text" placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>

    <details>
      <summary>Expandable Section</summary>
      <p>This content is initially hidden.</p>
    </details>
  `
}
```
