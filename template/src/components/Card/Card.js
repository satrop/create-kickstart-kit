/**
 * Card JavaScript functionality
 * Handles interactive cards, analytics, and accessibility enhancements
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
    this.setupAccessibility();
    this.setupAnalytics();
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

      // Add ripple effect for interactive cards (optional)
      if (this.isInteractive && !this.isClickable) {
        this.element.addEventListener('click', (e) => {
          this.createRippleEffect(e);
        });
      }
    }

    // Handle hover states for better UX
    this.element.addEventListener('mouseenter', () => {
      this.handleHoverStart();
    });

    this.element.addEventListener('mouseleave', () => {
      this.handleHoverEnd();
    });
  }

  setupAccessibility() {
    // Make interactive cards focusable
    if (this.isInteractive && !this.isClickable) {
      this.element.setAttribute('tabindex', '0');
      this.element.setAttribute('role', 'button');
    }

    // Add proper ARIA labels for clickable cards
    if (this.isClickable && !this.element.getAttribute('aria-label')) {
      const header = this.element.querySelector('.ast-card__header h1, .ast-card__header h2, .ast-card__header h3, .ast-card__header h4, .ast-card__header h5, .ast-card__header h6');
      if (header) {
        this.element.setAttribute('aria-label', `Navigate to ${header.textContent.trim()}`);
      }
    }

    // Ensure proper focus management
    this.element.addEventListener('focus', () => {
      this.element.classList.add('ast-card--focused');
    });

    this.element.addEventListener('blur', () => {
      this.element.classList.remove('ast-card--focused');
    });
  }

  setupAnalytics() {
    // Track card interactions for analytics
    const cardTitle = this.getCardTitle();
    const cardType = this.getCardType();
    
    if (cardTitle) {
      this.element.setAttribute('data-card-title', cardTitle);
    }
    
    if (cardType) {
      this.element.setAttribute('data-card-type', cardType);
    }
  }

  handleActivation(event) {
    // Custom event for card activation
    const activationEvent = new CustomEvent('ast-card:activate', {
      detail: {
        element: this.element,
        title: this.getCardTitle(),
        type: this.getCardType(),
        originalEvent: event
      },
      bubbles: true
    });
    
    this.element.dispatchEvent(activationEvent);

    // Analytics tracking
    this.trackInteraction('activate', event);
  }

  handleHoverStart() {
    const hoverEvent = new CustomEvent('ast-card:hover:start', {
      detail: {
        element: this.element,
        title: this.getCardTitle(),
        type: this.getCardType()
      },
      bubbles: true
    });
    
    this.element.dispatchEvent(hoverEvent);
  }

  handleHoverEnd() {
    const hoverEvent = new CustomEvent('ast-card:hover:end', {
      detail: {
        element: this.element,
        title: this.getCardTitle(),
        type: this.getCardType()
      },
      bubbles: true
    });
    
    this.element.dispatchEvent(hoverEvent);
  }

  createRippleEffect(event) {
    // Create ripple effect for visual feedback
    const ripple = document.createElement('span');
    const rect = this.element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.className = 'ast-card__ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;
    
    this.element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }

  getCardTitle() {
    const header = this.element.querySelector('.ast-card__header h1, .ast-card__header h2, .ast-card__header h3, .ast-card__header h4, .ast-card__header h5, .ast-card__header h6');
    return header ? header.textContent.trim() : null;
  }

  getCardType() {
    const classes = this.element.className.split(' ');
    const variantClass = classes.find(cls => cls.startsWith('ast-card--') && !cls.includes('padding') && !cls.includes('interactive') && !cls.includes('clickable'));
    return variantClass ? variantClass.replace('ast-card--', '') : 'default';
  }

  trackInteraction(action, event) {
    // Analytics tracking (integrate with your analytics solution)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'card_interaction', {
        event_category: 'Card',
        event_label: this.getCardTitle() || 'Untitled Card',
        card_type: this.getCardType(),
        action: action
      });
    }

    // Custom analytics event
    const analyticsEvent = new CustomEvent('ast-card:analytics', {
      detail: {
        action: action,
        title: this.getCardTitle(),
        type: this.getCardType(),
        element: this.element,
        originalEvent: event
      },
      bubbles: true
    });
    
    document.dispatchEvent(analyticsEvent);
  }

  // Public API methods
  activate() {
    if (this.isClickable) {
      this.element.click();
    } else {
      this.handleActivation(new Event('programmatic'));
    }
  }

  setInteractive(interactive) {
    if (interactive) {
      this.element.classList.add('ast-card--interactive');
      this.element.setAttribute('tabindex', '0');
      this.element.setAttribute('role', 'button');
    } else {
      this.element.classList.remove('ast-card--interactive');
      this.element.removeAttribute('tabindex');
      this.element.removeAttribute('role');
    }
    this.isInteractive = interactive;
  }

  updateContent(section, content) {
    const sectionElement = this.element.querySelector(`.ast-card__${section}`);
    if (sectionElement) {
      sectionElement.innerHTML = content;
    }
  }
}

// Auto-initialize cards
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if (!card.cardComponent) {
        card.cardComponent = new CardComponent(card);
      }
    });
  });
}

// Auto-initialize cards
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if (!card.cardComponent) {
        card.cardComponent = new CardComponent(card);
      }
    });
  });
}

// Auto-init function for manual initialization
const initCard = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (!card.cardComponent) {
      card.cardComponent = new CardComponent(card);
    }
  });
};

// Export both the class and the init function
export { CardComponent, initCard };

// Add ripple effect styles
if (typeof document !== 'undefined') {
  const rippleStyles = document.createElement('style');
  rippleStyles.textContent = `
    .card {
      overflow: hidden;
      position: relative;
    }
    
    .ast-card__ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      z-index: 1;
    }
    
    @keyframes ripple {
      to {
        transform: scale(1);
        opacity: 0;
      }
    }
    
    .ast-card--focused {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }
  `;
  
  document.head.appendChild(rippleStyles);
}
