# Card Component

A flexible and accessible card component for displaying content in organized containers.

## Features

- **Multiple variants**: default, bordered, elevated
- **Flexible padding**: none, small, medium, large
- **Interactive states** with hover and focus effects
- **Clickable cards** with href support
- **Slot-based architecture** for header, content, and footer
- **Ripple effects** for visual feedback
- **Analytics integration** for tracking interactions
- **Full accessibility** with ARIA attributes and keyboard support
- **Dark mode support** with CSS custom properties
- **Responsive design** with mobile optimizations

## Usage

### Basic Card

```astro
---
import Card from '@components/Card/Card.astro';
---

<Card>
  <p>This is a basic card with default styling.</p>
</Card>
```

### Card with Header and Footer

```astro
<Card variant="bordered" padding="large">
  <Fragment slot="header">
    <h3>Card Title</h3>
  </Fragment>

  <p>Card content goes here with useful information.</p>

  <Fragment slot="footer">
    <button class="btn btn--primary">Action</button>
    <button class="btn btn--outline">Cancel</button>
  </Fragment>
</Card>
```

### Interactive Card

```astro
<Card variant="elevated" interactive={true}>
  <Fragment slot="header">
    <h3>🎯 Interactive Card</h3>
  </Fragment>
  <p>This card responds to clicks and has hover effects.</p>
</Card>
```

### Clickable Card (Link)

```astro
<Card variant="bordered" href="/details" padding="medium">
  <Fragment slot="header">
    <h3>Navigate to Details</h3>
  </Fragment>
  <p>Click anywhere on this card to navigate.</p>
</Card>
```

## Props

| Prop          | Type                                       | Default     | Description                            |
| ------------- | ------------------------------------------ | ----------- | -------------------------------------- |
| `variant`     | `"default" \| "bordered" \| "elevated"`    | `"default"` | Visual style variant                   |
| `padding`     | `"none" \| "small" \| "medium" \| "large"` | `"medium"`  | Internal padding size                  |
| `interactive` | `boolean`                                  | `false`     | Enable hover effects and interactivity |
| `href`        | `string`                                   | `undefined` | Make card clickable as a link          |

## Slots

| Slot      | Description                                  |
| --------- | -------------------------------------------- |
| `header`  | Optional header content (typically headings) |
| `default` | Main card content                            |
| `footer`  | Optional footer content (typically actions)  |

## JavaScript API

### CardComponent Class

```javascript
// Get card component instance
const cardElement = document.querySelector(".card");
const card = cardElement.cardComponent;

// Methods
card.activate(); // Programmatically activate card
card.setInteractive(true / false); // Toggle interactive state
card.updateContent("header", html); // Update section content
```

### Card Events

```javascript
// Listen for card interactions
document.addEventListener("card:activate", (event) => {
  console.log("Card activated:", event.detail.title);
});

document.addEventListener("card:hover:start", (event) => {
  console.log("Card hover started:", event.detail.title);
});

document.addEventListener("card:hover:end", (event) => {
  console.log("Card hover ended:", event.detail.title);
});

// Analytics events
document.addEventListener("card:analytics", (event) => {
  // Integrate with your analytics solution
  console.log("Card interaction:", event.detail);
});
```

## Styling

The component uses CSS classes that can be customized:

- `.card` - Base card styles
- `.card--default` - Default variant
- `.card--bordered` - Bordered variant
- `.card--elevated` - Elevated variant with shadow
- `.card--interactive` - Interactive hover states
- `.card--clickable` - Clickable card styles
- `.card__header` - Header section
- `.card__content` - Content section
- `.card__footer` - Footer section
- `.card--padding-{size}` - Padding modifiers

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- Keyboard navigation support (Enter/Space for activation)
- Focus management with visible focus indicators
- ARIA attributes for interactive and clickable cards
- High contrast mode support
- Screen reader friendly with proper labeling
- Respects reduced motion preferences

## Examples

### Feature Cards

```astro
<div class="feature-grid">
  <Card variant="bordered">
    <Fragment slot="header">
      <h3>🎨 Design</h3>
    </Fragment>
    <p>Beautiful and consistent design system.</p>
  </Card>

  <Card variant="bordered">
    <Fragment slot="header">
      <h3>♿ Accessibility</h3>
    </Fragment>
    <p>Built with accessibility in mind from the ground up.</p>
  </Card>
</div>
```

### Action Cards

```astro
<Card variant="elevated" padding="large">
  <Fragment slot="header">
    <h2>Get Started</h2>
  </Fragment>

  <p>Ready to begin your journey? Click the button below to start.</p>

  <Fragment slot="footer">
    <button class="btn btn--primary btn--large">Start Now</button>
    <button class="btn btn--outline">Learn More</button>
  </Fragment>
</Card>
```

### Interactive Dashboard Cards

```astro
<Card variant="elevated" interactive={true} data-analytics-section="dashboard">
  <Fragment slot="header">
    <h3>Total Revenue</h3>
  </Fragment>

  <div class="metric">
    <span class="value">$24,580</span>
    <span class="trend positive">+12%</span>
  </div>
</Card>
```

## Dark Mode

The Card component automatically adapts to dark mode based on the user's system preference using `prefers-color-scheme: dark`. Colors and borders are automatically adjusted for optimal contrast and readability.
