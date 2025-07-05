/**
 * Mega Navigation Component JavaScript
 * Handles mega menu interactions with left column navigation and content section visibility
 */

class MegaNavigation {
  constructor(element) {
    // Prevent duplicate initialization
    if (element.dataset.megaNavigationInitialized === 'true') {
      return;
    }
    
    this.nav = element;
    this.navigationId = this.nav.dataset.navigationId;
    this.mobileAnimation = this.nav.dataset.mobileAnimation || 'left';
    
    // Mark as initialized
    this.nav.dataset.megaNavigationInitialized = 'true';
    
    // Elements
    this.mobileToggle = this.nav.querySelector('[data-nav-toggle]');
    this.mobileClose = this.nav.querySelector('[data-nav-close]');
    this.menu = this.nav.querySelector('[data-nav-menu]');
    this.overlay = this.nav.querySelector('[data-nav-overlay]');
    this.mainNavButtons = this.nav.querySelectorAll('[data-main-nav-button]');
    this.megaMenu = this.nav.querySelector('[data-mega-menu]');
    this.leftNavButtons = this.nav.querySelectorAll('[data-mega-section]');
    this.contentSections = this.nav.querySelectorAll('[data-mega-content]');
    
    // State
    this.isMobileOpen = false;
    this.isMegaMenuOpen = false;
    this.activeSection = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupKeyboardNavigation();
    this.hideAllSections();
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
    
    // Main navigation buttons (top level)
    this.mainNavButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionName = button.dataset.megaTrigger.toLowerCase();
        this.toggleMegaMenu(sectionName);
      });
      
      // Prevent hover events from interfering
      button.addEventListener('mouseenter', (e) => {
        e.preventDefault();
      });
    });
    
    // Left column navigation buttons
    this.leftNavButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionName = button.dataset.megaSection;
        this.showSection(sectionName);
      });
    });
    
    // Sub-navigation buttons (for sections with children)
    this.nav.addEventListener('click', (e) => {
      const subnavButton = e.target.closest('[data-subnav-trigger]');
      if (subnavButton) {
        e.preventDefault();
        const targetContent = subnavButton.dataset.subnavTrigger;
        const childIndex = subnavButton.dataset.childIndex;
        this.showSubnavContent(targetContent, childIndex);
      }
    });
    
    // Close mega menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target) && this.isMegaMenuOpen) {
        this.closeMegaMenu();
      }
    });
    
    // Close mega menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.isMegaMenuOpen) {
          this.closeMegaMenu();
        } else if (this.isMobileOpen) {
          this.closeMobile();
        }
      }
    });
  }
  
  setupKeyboardNavigation() {
    this.nav.addEventListener('keydown', (e) => {
      const focusedElement = document.activeElement;
      
      // Handle arrow keys for navigation
      switch (e.key) {
        case 'ArrowDown':
          if (this.mainNavButtons && Array.from(this.mainNavButtons).includes(focusedElement)) {
            e.preventDefault();
            this.openMegaMenu();
            // Focus first left column button
            const firstLeftButton = this.leftNavButtons[0];
            if (firstLeftButton) firstLeftButton.focus();
          } else if (this.leftNavButtons && Array.from(this.leftNavButtons).includes(focusedElement)) {
            e.preventDefault();
            // Navigate down in left column
            const currentIndex = Array.from(this.leftNavButtons).indexOf(focusedElement);
            const nextButton = this.leftNavButtons[currentIndex + 1];
            if (nextButton) nextButton.focus();
          }
          break;
          
        case 'ArrowUp':
          if (this.leftNavButtons && Array.from(this.leftNavButtons).includes(focusedElement)) {
            e.preventDefault();
            const currentIndex = Array.from(this.leftNavButtons).indexOf(focusedElement);
            if (currentIndex === 0) {
              // Return to main nav
              const activeMainButton = this.nav.querySelector('[data-main-nav-button][aria-expanded="true"]');
              if (activeMainButton) activeMainButton.focus();
            } else {
              const prevButton = this.leftNavButtons[currentIndex - 1];
              if (prevButton) prevButton.focus();
            }
          }
          break;
          
        case 'ArrowRight':
          if (this.leftNavButtons && Array.from(this.leftNavButtons).includes(focusedElement)) {
            e.preventDefault();
            // Move focus to content area
            const activeSection = this.nav.querySelector('[data-mega-content].active');
            const firstLink = activeSection?.querySelector('a, button');
            if (firstLink) firstLink.focus();
          }
          break;
          
        case 'ArrowLeft':
          // Move focus back to left column from content
          const activeSection = this.nav.querySelector('[data-mega-content].active');
          if (activeSection && activeSection.contains(focusedElement)) {
            e.preventDefault();
            const activeLeftButton = this.nav.querySelector('[data-mega-section].active');
            if (activeLeftButton) activeLeftButton.focus();
          }
          break;
      }
    });
  }
  
  // Mega menu methods
  toggleMegaMenu(sectionName) {
    if (this.isMegaMenuOpen && this.activeSection === sectionName) {
      this.closeMegaMenu();
    } else {
      this.openMegaMenu();
      this.showSection(sectionName);
    }
  }
  
  openMegaMenu() {
    this.isMegaMenuOpen = true;
    this.megaMenu.classList.add('active');
    this.nav.classList.add('mega-menu-open');
    
    // Update ARIA attributes
    this.mainNavButtons.forEach(button => {
      button.setAttribute('aria-expanded', 'true');
    });
  }
  
  closeMegaMenu() {
    this.isMegaMenuOpen = false;
    this.activeSection = null;
    this.megaMenu.classList.remove('active');
    this.nav.classList.remove('mega-menu-open');
    
    // Hide all sections
    this.hideAllSections();
    
    // Update ARIA attributes
    this.mainNavButtons.forEach(button => {
      button.setAttribute('aria-expanded', 'false');
    });
  }
  
  showSection(sectionName) {
    this.activeSection = sectionName;
    
    // Hide all sections first
    this.hideAllSections();
    
    // Show the requested section
    const targetSection = this.nav.querySelector(`[data-mega-content="${sectionName}"]`);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block';
      
      // Auto-activate first sub-navigation item if it exists
      const firstSubnavButton = targetSection.querySelector('[data-subnav-trigger]');
      if (firstSubnavButton) {
        const targetContent = firstSubnavButton.dataset.subnavTrigger;
        const childIndex = firstSubnavButton.dataset.childIndex;
        this.showSubnavContent(targetContent, childIndex);
      }
    }
    
    // Update left column button states
    this.leftNavButtons.forEach(button => {
      const isActive = button.dataset.megaSection === sectionName;
      button.classList.toggle('active', isActive);
      
      if (isActive) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  }
  
  hideAllSections() {
    this.contentSections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });
    
    this.leftNavButtons.forEach(button => {
      button.classList.remove('active');
      button.removeAttribute('aria-current');
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
    this.nav.classList.add('mobile-open');
    this.menu.classList.add('active');
    this.overlay.classList.add('active');
    
    // Update ARIA attributes
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => {
      const firstFocusable = this.menu.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    }, 100);
  }
  
  closeMobile() {
    this.isMobileOpen = false;
    this.nav.classList.remove('mobile-open');
    this.menu.classList.remove('active');
    this.overlay.classList.remove('active');
    
    // Update ARIA attributes
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    this.mobileToggle.focus();
  }
  
  showSubnavContent(targetContent, childIndex) {
    const activeSection = this.nav.querySelector('[data-mega-content].active');
    if (!activeSection) return;
    
    // Hide all subnav content within this section
    const allSubnavContent = activeSection.querySelectorAll('[data-subnav-content]');
    allSubnavContent.forEach(content => {
      content.classList.remove('active');
    });
    
    // Show the target content
    const targetContentElement = activeSection.querySelector(`[data-subnav-content="${targetContent}"]`);
    if (targetContentElement) {
      targetContentElement.classList.add('active');
    }
    
    // Update subnav button states
    const allSubnavButtons = activeSection.querySelectorAll('[data-subnav-trigger]');
    allSubnavButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    const activeButton = activeSection.querySelector(`[data-subnav-trigger="${targetContent}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
}

// Initialize all mega navigation components
export function initMegaNavigation() {
  const megaNavigationElements = document.querySelectorAll('.navigation--mega');
  megaNavigationElements.forEach(nav => {
    new MegaNavigation(nav);
  });
}

// Auto-initialize when DOM is ready (for standalone usage)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMegaNavigation);
} else {
  initMegaNavigation();
}

// Export for module usage
export default MegaNavigation;
