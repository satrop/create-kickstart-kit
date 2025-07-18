# Demo Navigation System

This navigation system provides a unified sidebar that shows all component links organized with category headers.

## Features

- **Single Navigation List**: All components shown in one list for easy scanning
- **Category Headers**: Visual headers separate different component types
- **Active State**: Current page is automatically highlighted
- **Responsive Design**: Works across different screen sizes
- **Accessibility**: Proper semantic structure

## Components

### DemoNavigation Component

Location: `src/components/DemoNavigation/DemoNavigation.astro`

A reusable navigation component that creates a sidebar with:

- Category title (now shows "Components")
- List of navigation items with category headers
- Active state highlighting
- Optional back link button

### Navigation Utility

Location: `src/utils/demoNavigation.ts`

Contains:

- Single flat navigation list with header items
- Helper functions to get navigation items with active states
- Category headers mixed into the navigation items

## Usage

### 1. Basic Usage in Demo Pages

```astro
---
import Layout from "@/layouts/Layout.astro";
import DemoNavigation from "../../components/DemoNavigation/DemoNavigation.astro";
import { getAllNavigationWithActiveState } from "../../utils/demoNavigation";

// Get all navigation items with current page marked as active
const navigationItems = getAllNavigationWithActiveState("current-page");
---

<Layout title="Component Demo">
  <Fragment slot="main">
    <main id="main" class="layout-main" aria-label="Main content">
      <div class="section-grid owl-32">
        <DemoNavigation
          title="Components"
          items={navigationItems}
          backLink={{
            url: "./components.html",
            text: "Back to Components"
          }}
        />
        <div class="col-4 md:col-4 lg:col-9">
          <!-- Your component demo content -->
        </div>
      </div>
    </main>
  </Fragment>
</Layout>
```

### 2. Available Navigation Functions

```typescript
// Get all navigation items (recommended)
const allNav = getAllNavigationWithActiveState("current-page");

// Legacy functions (still work but return all items now)
const formNav = getFormComponentNavigation("current-page");
const categoryNav = getCategoryNavigation("any-category", "current-page");
```

### 3. Navigation Structure

The navigation automatically includes:

- **Form Components**

  - Button, Alert, Checkbox, Radio Group, Select, Textarea, Form Field

- **Content Components**

  - Card, Accordion, 50/50 Layout, Images, Figures, Dialog, Link List, Table, Tabs, Slider

- **Navigation**

  - Standard Navigation, Mega Navigation, Footer

- **Layout & Design**
  - Grid System, Typography, Colors

## Adding New Components

### 1. Add to Navigation Data

Edit `src/utils/demoNavigation.ts` and add your component to the appropriate section:

```typescript
export const allNavigationItems: NavItem[] = [
  // Form Components
  { name: "Form Components", url: "", isHeader: true },
  { name: "Button", url: "./button.html" },
  // ... existing items
  { name: "New Form Component", url: "./new-form-component.html" },

  // Content Components
  { name: "Content Components", url: "", isHeader: true },
  // ... existing items
  { name: "New Content Component", url: "./new-content-component.html" },
];
```

### 2. Create Demo Page

Follow the usage pattern above in your new demo page.

### 3. Automatic Active States

The navigation automatically highlights the current page based on the URL parameter passed to the navigation functions.

## Styling

The DemoNavigation component includes styles for:

- **Headers**: Category headers with uppercase styling and spacing
- **Links**: Standard link styling with hover effects
- **Active States**: Highlighted current page with arrow indicator
- **Responsive Layout**: Proper sidebar behavior

You can customize by editing the `<style>` section in `DemoNavigation.astro`.

## Benefits

- **Better Overview**: See all components at once instead of just one category
- **Easy Navigation**: Jump between any components without going back to index
- **Consistent Organization**: Visual headers keep things organized
- **Maintainable**: Single place to manage all navigation
- **Scalable**: Easy to add new components and categories
