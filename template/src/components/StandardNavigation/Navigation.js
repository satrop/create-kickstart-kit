/**
 * Navigation Component JavaScript
 * Handles mobile menu, dropdown interactions, and keyboard accessibility
 * For standard dropdown navigation (not mega menus)
 */

class Navigation {
  constructor(element) {
    // Prevent duplicate initialization
    if (element.dataset.navigationInitialized === 'true') {
      return;
    }
    
    // Skip initialization if this is a mega menu (handled by MegaNavigation)
    if (element.classList.contains('navigation--mega')) {
      return;
    }
    
    this.nav = element;
    this.navigationId = this.nav.dataset.navigationId;
    this.mobileAnimation = this.nav.dataset.mobileAnimation || 'left';
    
    // Mark as initialized
    this.nav.dataset.navigationInitialized = 'true';
    
    // Elements
    this.mobileToggle = this.nav.querySelector('[data-nav-toggle]');
    this.mobileClose = this.nav.querySelector('[data-nav-close]');
    this.menu = this.nav.querySelector('[data-nav-menu]');
    this.overlay = this.nav.querySelector('[data-nav-overlay]');
    this.dropdowns = this.nav.querySelectorAll('[data-dropdown]');
    this.submenus = this.nav.querySelectorAll('[data-submenu]');
    
    // State
    this.isOpen = false;
    this.activeDropdown = null;
    this.focusedElement = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupKeyboardNavigation();
  }
  
  bindEvents() {
    // Mobile toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobile());
    }
    
    // Mobile close
    if (this.mobileClose) {
      this.mobileClose.addEventListener('click', () => this.closeMobile());
    }
    
    // Overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMobile());
    }
    
    // Dropdown triggers
    this.dropdowns.forEach((dropdown, index) => {
      const trigger = dropdown.querySelector('[data-dropdown-trigger]');
      const content = dropdown.querySelector('[data-dropdown-content]');
      
      if (trigger && content) {
        // Desktop hover
        dropdown.addEventListener('mouseenter', () => {
          if (window.innerWidth >= 768) {
            this.openDropdown(dropdown);
          }
        });
        dropdown.addEventListener('mouseleave', () => {
          if (window.innerWidth >= 768) {
            this.closeDropdown(dropdown);
          }
        });
        
        // Click toggle (mobile and desktop)
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleDropdown(dropdown);
        });

        // Focus management for accessibility
        trigger.addEventListener('focusout', (e) => {
          setTimeout(() => {
            if (!dropdown.contains(document.activeElement)) {
              this.closeDropdown(dropdown);
            }
          }, 0);
        });

        content.addEventListener('focusout', (e) => {
          setTimeout(() => {
            if (!dropdown.contains(document.activeElement)) {
              this.closeDropdown(dropdown);
            }
          }, 0);
        });
      }
    });
    
    // Submenu triggers
    this.submenus.forEach(submenu => {
      const trigger = submenu.querySelector('[data-submenu-trigger]');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleSubmenu(submenu);
        });
      }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target)) {
        this.closeAllDropdowns();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && this.isOpen) {
        this.closeMobile();
      }
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.isOpen) {
          this.closeMobile();
        } else {
          this.closeAllDropdowns();
        }
      }
    });
  }
  
  setupKeyboardNavigation() {
    const menuItems = this.nav.querySelectorAll('[role="menuitem"]');
    
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            this.focusNextItem(menuItems, index);
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.focusPreviousItem(menuItems, index);
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.handleRightArrow(item);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.handleLeftArrow(item);
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            this.handleEnterSpace(item);
            break;
          case 'Home':
            e.preventDefault();
            menuItems[0].focus();
            break;
          case 'End':
            e.preventDefault();
            menuItems[menuItems.length - 1].focus();
            break;
        }
      });
    });
  }
  
  // Mobile menu methods
  toggleMobile() {
    if (this.isOpen) {
      this.closeMobile();
    } else {
      this.openMobile();
    }
  }
  
  openMobile() {
    this.isOpen = true;
    this.nav.classList.add('navigation--open');
    this.menu.classList.add('navigation__menu--open');
    this.overlay.classList.add('navigation__overlay--visible');
    
    // Update ARIA
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item
    const firstMenuItem = this.menu.querySelector('[role="menuitem"]');
    if (firstMenuItem) {
      firstMenuItem.focus();
    }
  }
  
  closeMobile() {
    this.isOpen = false;
    this.nav.classList.remove('navigation--open');
    this.menu.classList.remove('navigation__menu--open');
    this.overlay.classList.remove('navigation__overlay--visible');
    
    // Update ARIA
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Close all dropdowns
    this.closeAllDropdowns();
    
    // Return focus to toggle
    this.mobileToggle.focus();
  }
  
  // Dropdown methods
  toggleDropdown(dropdown) {
    const isOpen = dropdown.classList.contains('navigation__dropdown--open');
    
    if (isOpen) {
      this.closeDropdown(dropdown);
    } else {
      this.closeAllDropdowns();
      this.openDropdown(dropdown);
    }
  }
  
  openDropdown(dropdown) {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    const content = dropdown.querySelector('[data-dropdown-content]');
    
    dropdown.classList.add('navigation__dropdown--open');
    content.classList.add('navigation__dropdown-content--open');
    trigger.setAttribute('aria-expanded', 'true');
    
    this.activeDropdown = dropdown;
  }
  
  closeDropdown(dropdown) {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    const content = dropdown.querySelector('[data-dropdown-content]');
    
    dropdown.classList.remove('navigation__dropdown--open');
    content.classList.remove('navigation__dropdown-content--open');
    trigger.setAttribute('aria-expanded', 'false');
    
    // Close all submenus within this dropdown
    const submenus = dropdown.querySelectorAll('[data-submenu]');
    submenus.forEach(submenu => this.closeSubmenu(submenu));
    
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
  }
  
  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => this.closeDropdown(dropdown));
  }
  
  // Submenu methods
  toggleSubmenu(submenu) {
    const isOpen = submenu.classList.contains('navigation__submenu--open');
    
    if (isOpen) {
      this.closeSubmenu(submenu);
    } else {
      this.openSubmenu(submenu);
    }
  }
  
  openSubmenu(submenu) {
    const trigger = submenu.querySelector('[data-submenu-trigger]');
    const content = submenu.querySelector('[data-submenu-content]');
    
    submenu.classList.add('navigation__submenu--open');
    content.classList.add('navigation__submenu-list--open');
    trigger.setAttribute('aria-expanded', 'true');
  }
  
  closeSubmenu(submenu) {
    const trigger = submenu.querySelector('[data-submenu-trigger]');
    const content = submenu.querySelector('[data-submenu-content]');
    
    submenu.classList.remove('navigation__submenu--open');
    content.classList.remove('navigation__submenu-list--open');
    trigger.setAttribute('aria-expanded', 'false');
  }
  
  // Keyboard navigation helpers
  focusNextItem(items, currentIndex) {
    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex].focus();
  }
  
  focusPreviousItem(items, currentIndex) {
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    items[prevIndex].focus();
  }
  
  handleRightArrow(item) {
    // Open submenu or dropdown if available
    const dropdown = item.closest('[data-dropdown]');
    const submenu = item.closest('[data-submenu]');
    
    if (dropdown && !dropdown.classList.contains('navigation__dropdown--open')) {
      this.openDropdown(dropdown);
    } else if (submenu && !submenu.classList.contains('navigation__submenu--open')) {
      this.openSubmenu(submenu);
    }
  }
  
  handleLeftArrow(item) {
    // Close current submenu or return to parent
    const submenu = item.closest('[data-submenu]');
    const dropdown = item.closest('[data-dropdown]');
    
    if (submenu && submenu.classList.contains('navigation__submenu--open')) {
      this.closeSubmenu(submenu);
    } else if (dropdown && dropdown.classList.contains('navigation__dropdown--open')) {
      this.closeDropdown(dropdown);
    }
  }
  
  handleEnterSpace(item) {
    // Trigger click for buttons, follow links
    if (item.tagName === 'BUTTON') {
      item.click();
    } else if (item.tagName === 'A') {
      window.location.href = item.href;
    }
  }
}

// Initialize all navigation components (excluding mega menus)
export function initNavigation() {
  const navigationElements = document.querySelectorAll('.navigation:not(.navigation--mega)');
  navigationElements.forEach(nav => {
    new Navigation(nav);
  });
}

// Auto-initialize when DOM is ready (for standalone usage)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigation);
} else {
  initNavigation();
}

// Export for module usage
export default Navigation;
