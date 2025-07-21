/**
 * Card JavaScript functionality
 * Handles interactive cards with minimal overhead
 */

class CardComponent {
  constructor(element) {
    this.element = element;
    this.isInteractive = element.classList.contains('ast-card--interactive');
    this.isClickable = element.classList.contains('ast-card--clickable');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.isInteractive || this.isClickable) {
      // Handle keyboard navigation
      this.element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleActivation(e);
        }
      });

      // Handle clicks for analytics and custom behavior
      this.element.addEventListener('click', (e) => {
        this.handleActivation(e);
      });
    }

    // Handle focus states
    if (this.isInteractive && !this.isClickable) {
      this.element.addEventListener('focus', () => {
        this.element.classList.add('ast-card--focused');
      });

      this.element.addEventListener('blur', () => {
        this.element.classList.remove('ast-card--focused');
      });
    }
  }

  handleActivation(event) {
    // Custom event for card activation
    const activationEvent = new CustomEvent('ast-card:activate', {
      detail: {
        element: this.element,
        originalEvent: event
      },
      bubbles: true
    });
    
    this.element.dispatchEvent(activationEvent);
  }
}

// Auto-init function for manual initialization
const initCard = () => {
  const cards = document.querySelectorAll('.ast-card');
  cards.forEach(card => {
    if (!card.cardComponent) {
      card.cardComponent = new CardComponent(card);
    }
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCard);
} else {
  initCard();
}

// Export both the class and the init function
export { CardComponent, initCard };
