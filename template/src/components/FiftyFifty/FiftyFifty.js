/**
 * FiftyFifty JavaScript functionality
 * Enhanced with animation support
 */

class FiftyFiftyComponent {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.setupAnimations();
  }

  setupAnimations() {
    // Setup intersection observer for animations if data-animate is present
    if (this.element.dataset.animate === 'true' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ast-fifty-fifty--in-view');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      observer.observe(this.element);
    }
  }
}

// Auto-initialize FiftyFifty components
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const fiftyFiftyElements = document.querySelectorAll('.fifty-fifty');
    fiftyFiftyElements.forEach(element => {
      if (!element.fiftyFiftyComponent) {
        element.fiftyFiftyComponent = new FiftyFiftyComponent(element);
      }
    });
  });
}

// Auto-init function for manual initialization
const initFiftyFifty = () => {
  const fiftyFiftyElements = document.querySelectorAll('.fifty-fifty');
  fiftyFiftyElements.forEach(element => {
    if (!element.fiftyFiftyComponent) {
      element.fiftyFiftyComponent = new FiftyFiftyComponent(element);
    }
  });
};

// Export both the class and the init function
export { FiftyFiftyComponent, initFiftyFifty };
