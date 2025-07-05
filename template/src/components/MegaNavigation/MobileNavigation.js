/**
 * Mobile Navigation Component JavaScript
 * Handles mobile accordion navigation with nested expansion
 */

class MobileNavigation {
  constructor(element) {
    // Prevent duplicate initialization
    if (element.dataset.mobileNavigationInitialized === 'true') {
      return;
    }
    
    this.nav = element;
    this.navigationId = this.nav.dataset.navigationId;
    this.mobileAnimation = this.nav.dataset.mobileAnimation || 'left';
    
    // Mark as initialized
    this.nav.dataset.mobileNavigationInitialized = 'true';
    
    // Elements
    this.mobileToggle = this.nav.querySelector('[data-mobile-toggle]');
    this.mobileClose = this.nav.querySelector('[data-mobile-close]');
    this.menu = this.nav.querySelector('[data-mobile-menu]');
    this.overlay = this.nav.querySelector('[data-mobile-overlay]');
    this.accordionTriggers = this.nav.querySelectorAll('[data-accordion-trigger]');
    this.subAccordionTriggers = this.nav.querySelectorAll('[data-sub-accordion-trigger]');
    
    // State
    this.isMobileOpen = false;
    this.openAccordions = new Set();
    this.openSubAccordions = new Set();
    
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
    
    // Overlay close
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMobile());
    }
    
    // Accordion triggers
    this.accordionTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleAccordion(trigger);
      });
    });
    
    // Sub-accordion triggers
    this.subAccordionTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleSubAccordion(trigger);
      });
    });
    
    // Close mobile menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileOpen) {
        this.closeMobile();
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target) && this.isMobileOpen) {
        this.closeMobile();
      }
    });
  }
  
  setupKeyboardNavigation() {
    this.nav.addEventListener('keydown', (e) => {
      const focusedElement = document.activeElement;
      
      switch (e.key) {
        case 'ArrowDown':
          this.navigateToNext(focusedElement);
          e.preventDefault();
          break;
        case 'ArrowUp':
          this.navigateToPrevious(focusedElement);
          e.preventDefault();
          break;
        case 'Enter':
        case ' ':
          if (focusedElement.dataset.accordionTrigger || focusedElement.dataset.subAccordionTrigger) {
            focusedElement.click();
            e.preventDefault();
          }
          break;
      }
    });
  }
  
  // Mobile menu methods
  toggleMobile() {
    if (this.isMobileOpen) {
      this.closeMobile();
    } else {
      this.openMobile();
    }
  }
  
  openMobile() {
    this.isMobileOpen = true;
    this.nav.classList.add('mobile-navigation--open');
    this.menu.classList.add('mobile-navigation__menu--open');
    this.overlay.classList.add('mobile-navigation__overlay--visible');
    
    // Update ARIA attributes
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Ensure all accordion content is inert when menu opens
    this.setAllAccordionsInert();
    
    // Focus management
    setTimeout(() => {
      const firstFocusable = this.menu.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    }, 100);
  }
  
  closeMobile() {
    this.isMobileOpen = false;
    this.nav.classList.remove('mobile-navigation--open');
    this.menu.classList.remove('mobile-navigation__menu--open');
    this.overlay.classList.remove('mobile-navigation__overlay--visible');
    
    // Update ARIA attributes
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Close all accordions when menu closes
    this.closeAllAccordions();
    
    // Return focus to toggle button
    this.mobileToggle.focus();
  }
  
  // Accordion methods
  toggleAccordion(trigger) {
    const accordion = trigger.closest('[data-accordion]');
    const content = accordion.querySelector('[data-accordion-content]');
    const accordionId = content.id;
    
    // If this accordion is already open, close it
    if (this.openAccordions.has(accordionId)) {
      this.closeAccordion(trigger);
      return;
    }
    
    // Close all other accordions first, then open this one
    this.closeAllAccordions();
    this.openAccordion(trigger);
  }
  
  openAccordion(trigger) {
    const accordion = trigger.closest('[data-accordion]');
    const content = accordion.querySelector('[data-accordion-content]');
    const accordionId = content.id;
    
    // Open this accordion
    accordion.classList.add('mobile-navigation__accordion--open');
    content.classList.add('mobile-navigation__accordion-content--open');
    trigger.setAttribute('aria-expanded', 'true');
    
    // Remove inert to allow tabbing
    content.removeAttribute('inert');
    
    this.openAccordions.add(accordionId);
  }
  
  closeAccordion(trigger) {
    const accordion = trigger.closest('[data-accordion]');
    const content = accordion.querySelector('[data-accordion-content]');
    const accordionId = content.id;
    
    // Close accordion
    accordion.classList.remove('mobile-navigation__accordion--open');
    content.classList.remove('mobile-navigation__accordion-content--open');
    trigger.setAttribute('aria-expanded', 'false');
    
    // Add inert to prevent tabbing
    content.setAttribute('inert', '');
    
    this.openAccordions.delete(accordionId);
    
    // Close all sub-accordions within this accordion
    const subAccordions = accordion.querySelectorAll('[data-sub-accordion-trigger]');
    subAccordions.forEach(subTrigger => this.closeSubAccordion(subTrigger));
  }
  
  closeAllAccordions() {
    this.accordionTriggers.forEach(trigger => {
      const accordion = trigger.closest('[data-accordion]');
      const content = accordion.querySelector('[data-accordion-content]');
      
      accordion.classList.remove('mobile-navigation__accordion--open');
      content.classList.remove('mobile-navigation__accordion-content--open');
      trigger.setAttribute('aria-expanded', 'false');
      
      // Add inert to prevent tabbing
      content.setAttribute('inert', '');
    });
    
    this.openAccordions.clear();
    this.closeAllSubAccordions();
  }
  
  // Sub-accordion methods
  toggleSubAccordion(trigger) {
    const subAccordion = trigger.closest('[data-sub-accordion]');
    const content = subAccordion.querySelector('[data-sub-accordion-content]');
    const subAccordionId = content.id;
    
    if (this.openSubAccordions.has(subAccordionId)) {
      this.closeSubAccordion(trigger);
    } else {
      this.openSubAccordion(trigger);
    }
  }
  
  openSubAccordion(trigger) {
    const subAccordion = trigger.closest('[data-sub-accordion]');
    const content = subAccordion.querySelector('[data-sub-accordion-content]');
    const subAccordionId = content.id;
    
    // Open this sub-accordion
    subAccordion.classList.add('mobile-navigation__sub-accordion--open');
    content.classList.add('mobile-navigation__sub-accordion-content--open');
    trigger.setAttribute('aria-expanded', 'true');
    
    // Remove inert to allow tabbing
    content.removeAttribute('inert');
    
    this.openSubAccordions.add(subAccordionId);
  }
  
  closeSubAccordion(trigger) {
    const subAccordion = trigger.closest('[data-sub-accordion]');
    const content = subAccordion.querySelector('[data-sub-accordion-content]');
    const subAccordionId = content.id;
    
    // Close sub-accordion
    subAccordion.classList.remove('mobile-navigation__sub-accordion--open');
    content.classList.remove('mobile-navigation__sub-accordion-content--open');
    trigger.setAttribute('aria-expanded', 'false');
    
    // Add inert to prevent tabbing
    content.setAttribute('inert', '');
    
    this.openSubAccordions.delete(subAccordionId);
  }
  
  closeAllSubAccordions() {
    this.subAccordionTriggers.forEach(trigger => {
      const subAccordion = trigger.closest('[data-sub-accordion]');
      const content = subAccordion.querySelector('[data-sub-accordion-content]');
      
      subAccordion.classList.remove('mobile-navigation__sub-accordion--open');
      content.classList.remove('mobile-navigation__sub-accordion-content--open');
      trigger.setAttribute('aria-expanded', 'false');
      
      // Add inert to prevent tabbing
      content.setAttribute('inert', '');
    });
    
    this.openSubAccordions.clear();
  }
  
  // Navigation helpers
  navigateToNext(current) {
    const focusable = this.menu.querySelectorAll('a, button');
    const currentIndex = Array.from(focusable).indexOf(current);
    const nextIndex = (currentIndex + 1) % focusable.length;
    focusable[nextIndex].focus();
  }
  
  navigateToPrevious(current) {
    const focusable = this.menu.querySelectorAll('a, button');
    const currentIndex = Array.from(focusable).indexOf(current);
    const prevIndex = currentIndex === 0 ? focusable.length - 1 : currentIndex - 1;
    focusable[prevIndex].focus();
  }
  
  // Helper method to set all accordion content as inert
  setAllAccordionsInert() {
    // Set all main accordion content as inert
    const allAccordionContent = this.nav.querySelectorAll('[data-accordion-content]');
    allAccordionContent.forEach(content => {
      content.setAttribute('inert', '');
    });
    
    // Set all sub-accordion content as inert
    const allSubAccordionContent = this.nav.querySelectorAll('[data-sub-accordion-content]');
    allSubAccordionContent.forEach(content => {
      content.setAttribute('inert', '');
    });
  }
}

// Initialize all mobile navigation components
export function initMobileNavigation() {
  const mobileNavigationElements = document.querySelectorAll('.mobile-navigation');
  mobileNavigationElements.forEach(nav => {
    new MobileNavigation(nav);
  });
}

// Auto-initialize when DOM is ready (for standalone usage)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileNavigation);
} else {
  initMobileNavigation();
}

// Export for module usage
export default MobileNavigation;
