# Table Component

A responsive table component with horizontal scrolling and a simple visual indicator.

## Features

- **Responsive Design**: Automatically handles overflow content with horizontal scrolling
- **Simple Visual Indicator**: Shows "Scroll to see more" with left/right chevrons when content overflows
- **Mobile-Friendly**: Single indicator positioned above the table, optimized for touch devices
- **Accessible**: Maintains proper table semantics and keyboard navigation
- **Smooth Scrolling**: Custom scrollbar styling for better user experience

## Usage

```astro
---
import TableComponent from "@/components/Table/Table.astro";
import TableRow from "@/components/Table/TableRow.astro";
import TableCell from "@/components/Table/TableCell.astro";
import TableHeaderCell from "@/components/Table/TableHeaderCell.astro";
---

<TableComponent>
  <Fragment slot="header">
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Age</TableHeaderCell>
      <TableHeaderCell>Location</TableHeaderCell>
    </TableRow>
  </Fragment>

  <Fragment slot="body">
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>30</TableCell>
      <TableCell>New York</TableCell>
    </TableRow>
  </Fragment>
</TableComponent>
```

## Props

- `class`: Optional CSS class name to override default wrapper class

## Behavior

- **Simple Detection**: Shows a single scroll indicator when table content overflows horizontally
- **Always Visible**: When active, the indicator remains visible regardless of scroll position
- **Auto-detection**: Automatically detects when scrolling is needed on load and resize
- **Mobile Optimized**: Single indicator reduces complexity and improves mobile experience

## Scroll Indicator

The component shows a simple indicator that:

- Appears above the table when content overflows
- Displays "Scroll to see more" with left and right chevrons
- Remains visible while scrolling is possible
- Automatically hides when no scrolling is needed

## Styling

The component includes:

- Clean, minimal scroll indicator design
- Custom scrollbar styling for better UX
- Responsive sizing for mobile devices
- Subtle background and border styling

## Accessibility

- Maintains proper table structure
- Scroll indicator is marked as `aria-hidden="true"`
- Keyboard navigation is preserved
- Screen reader friendly table semantics
- No complex positioning that interferes with screen readers

## Scroll Indicators

The component automatically shows visual indicators when:

- Content overflows horizontally
- User can scroll in either direction
- Indicators hide when scrolling reaches the end

## Styling

The component includes:

- Custom scrollbar styling
- Hover effects for better interaction
- Responsive breakpoints for mobile devices
- Smooth transitions for indicator visibility

## Accessibility

- Maintains proper table structure
- Scroll indicators are marked as `aria-hidden="true"`
- Keyboard navigation is preserved
- Screen reader friendly table semantics
