/**
 * Button JavaScript functionality
 * Handles click events, loading states, and form submissions
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

    // Handle click events for confirmation dialogs
    this.element.addEventListener('click', (event) => {
      if (this.isLoading || this.element.disabled) {
        event.preventDefault();
        return;
      }

      // Handle confirmation dialogs
      if (this.element.getAttribute('data-confirm')) {
        const message = this.element.getAttribute('data-confirm');
        if (!confirm(message)) {
          event.preventDefault();
          return false;
        }
      }
    });
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
}

// Auto-init function
const initButton = () => {
  const buttons = document.querySelectorAll('.ast-btn');
  buttons.forEach((el) => {
    if (!el.buttonComponent) {
      el.buttonComponent = new ButtonComponent(el);
    }
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initButton);
} else {
  initButton();
}

// Export both the class and the init function
export { ButtonComponent, initButton };