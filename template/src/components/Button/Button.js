/**
 * Button JavaScript functionality
 * Handles click events, loading states, and accessibility enhancements
 */

class ButtonComponent {
  constructor(element) {
    this.element = element;
    this.isLoading = false;
    this.originalContent = element.innerHTML;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAccessibility();
  }

  setupEventListeners() {
    // Handle loading state for form submissions
    if (this.element.type === 'submit') {
      const form = this.element.closest('form');
      if (form) {
        form.addEventListener('submit', () => {
          this.setLoading(true);
        });
      }
    }

    // Handle click events with debouncing
    let clickTimeout = null;
    this.element.addEventListener('click', (event) => {
      if (this.isLoading || this.element.disabled) {
        event.preventDefault();
        return;
      }

      // Debounce rapid clicks
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
      
      clickTimeout = setTimeout(() => {
        this.handleClick(event);
      }, 50);
    });
  }

  setupAccessibility() {
    // Ensure proper keyboard navigation
    this.element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (!this.isLoading && !this.element.disabled) {
          event.preventDefault();
          this.element.click();
        }
      }
    });
  }

  handleClick(event) {
    // Custom click handling can be added here
    // For now, just ensure the button behaves properly
    if (this.element.getAttribute('data-confirm')) {
      const message = this.element.getAttribute('data-confirm');
      if (!confirm(message)) {
        event.preventDefault();
        return false;
      }
    }
  }

  setLoading(loading) {
    this.isLoading = loading;
    
    if (loading) {
      this.element.disabled = true;
      this.element.innerHTML = this.element.getAttribute('data-loading-text') || 'Loading...';
      this.element.setAttribute('aria-busy', 'true');
    } else {
      this.element.disabled = false;
      this.element.innerHTML = this.originalContent;
      this.element.setAttribute('aria-busy', 'false');
    }
  }

  // Public API methods
  enable() {
    this.element.disabled = false;
    this.setLoading(false);
  }

  disable() {
    this.element.disabled = true;
  }

  updateContent(content) {
    this.originalContent = content;
    if (!this.isLoading) {
      this.element.innerHTML = content;
    }
  }
}

// Auto-initialize buttons
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      if (!button.buttonComponent) {
        button.buttonComponent = new ButtonComponent(button);
      }
    });
  });
}

// Export for manual initialization
export { ButtonComponent };
export default ButtonComponent;
