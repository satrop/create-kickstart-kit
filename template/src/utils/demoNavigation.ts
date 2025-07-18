export interface NavItem {
  name: string;
  url: string;
  isActive?: boolean;
  isHeader?: boolean;
}

// All navigation items in one flat list with category headers
export const allNavigationItems: NavItem[] = [
  // Form Components
  { name: "Form Components", url: "", isHeader: true },
  { name: "Button", url: "./button.html" },
  { name: "Alert", url: "./alert.html" },
  { name: "Checkbox", url: "./checkbox.html" },
  { name: "Radio Group", url: "./radio-group.html" },
  { name: "Select", url: "./select.html" },
  { name: "Textarea", url: "./textarea.html" },
  { name: "Inputs", url: "./inputs.html" },
  
  // Content Components
  { name: "Content Components", url: "", isHeader: true },
  { name: "Card", url: "./card.html" },
  { name: "Accordion", url: "./accordion.html" },
  { name: "50/50 Layout", url: "./fifty-fifty.html" },
  { name: "Images", url: "./images.html" },
  { name: "Figures", url: "./figures.html" },
  { name: "Dialog", url: "./dialog.html" },
  { name: "Link List", url: "./link-list.html" },
  { name: "Table", url: "./table.html" },
  { name: "Tabs", url: "./tabs.html" },
  { name: "Slider", url: "./slider.html" },
  
  // Navigation Components
  { name: "Navigation", url: "", isHeader: true },
  { name: "Standard Navigation", url: "./navigation.html" },
  { name: "Mega Navigation", url: "./mega-nav.html" },
  { name: "Footer", url: "./footer.html" },
  
  // Layout & Design
  { name: "Layout & Design", url: "", isHeader: true },
  { name: "Grid System", url: "./grid.html" },
  { name: "Typography", url: "./typography.html" },
  { name: "Colors", url: "./colors.html" },
  { name: "Icons", url: "./icons.html" },
];

/**
 * Get all navigation items with active state based on current page
 */
export function getAllNavigationWithActiveState(currentPage?: string): NavItem[] {
  return allNavigationItems.map(item => ({
    ...item,
    isActive: currentPage && !item.isHeader ? item.url.includes(currentPage) : false,
  }));
}

/**
 * Get navigation items for a specific category (deprecated - kept for compatibility)
 */
export function getCategoryNavigation(categoryTitle: string, currentPath?: string): NavItem[] {
  // Return the full list since we now show everything
  return getAllNavigationWithActiveState(currentPath);
}

/**
 * Get all form component navigation items with active state (now returns all items)
 */
export function getFormComponentNavigation(currentPath?: string): NavItem[] {
  return getAllNavigationWithActiveState(currentPath);
}

/**
 * Get navigation items with active state based on current page
 */
export function getNavigationWithActiveState(items: NavItem[], currentPage: string): NavItem[] {
  return items.map(item => ({
    ...item,
    isActive: !item.isHeader && item.url.includes(currentPage),
  }));
}
