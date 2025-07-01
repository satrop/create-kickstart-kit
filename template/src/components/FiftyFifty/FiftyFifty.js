/**
 * FiftyFifty JavaScript functionality
 * Enhanced with global image handling and animation support
 */

import { GlobalImageHandler } from '../../utils/imageHandler.js';

class FiftyFiftyComponent {
  constructor(element) {
    this.element = element;
    this.image = element.querySelector('.fifty-fifty__img');
    this.init();
  }

  init() {
    this.setupImageHandling();
    this.setupAnimations();
  }

  setupImageHandling() {
    if (!this.image) return;
    
    // Add data-enhanced attribute for global image handler
    this.image.setAttribute('data-enhanced', '');
    
    // Let the global image handler manage loading states
    // The global handler will add img--loading, img--loaded, img--error classes
  }

  setupAnimations() {
    // Setup intersection observer for animations if data-animate is present
    if (this.element.dataset.animate === 'true' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fifty-fifty--in-view');
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

// Export for manual initialization
export { FiftyFiftyComponent };
export default FiftyFiftyComponent;
