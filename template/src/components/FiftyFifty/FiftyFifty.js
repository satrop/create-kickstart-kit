/**
 * FiftyFifty JavaScript functionality
 * Simple enhancements for image loading and basic interactions
 */

class FiftyFiftyComponent {
  constructor(element) {
    this.element = element;
    this.image = element.querySelector('.fifty-fifty__img');
    this.init();
  }

  init() {
    this.setupImageLoading();
  }

  setupImageLoading() {
    if (!this.image) return;

    // Handle image load for better UX
    this.image.addEventListener('load', () => {
      this.image.classList.add('fifty-fifty__img--loaded');
    });

    // Handle image error
    this.image.addEventListener('error', () => {
      this.image.classList.add('fifty-fifty__img--error');
      console.warn('Failed to load image:', this.image.src);
    });

    // Check if image is already loaded (cached)
    if (this.image.complete && this.image.naturalHeight !== 0) {
      this.image.classList.add('fifty-fifty__img--loaded');
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
