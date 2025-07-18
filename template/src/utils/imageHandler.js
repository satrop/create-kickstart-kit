/**
 * Global Image Handler
 * Handles image loading states, lazy loading, and error handling for all images on the site
 */

class GlobalImageHandler {
  constructor() {
    this.images = new Set();
    this.init();
  }

  init() {
    this.setupGlobalImageHandling();
    this.setupIntersectionObserver();
    this.setupMutationObserver();
  }

  setupGlobalImageHandling() {
    // Handle all images with data-enhanced attribute
    const images = document.querySelectorAll('img[data-enhanced]');
    images.forEach(img => this.enhanceImage(img));
    
    // Handle Astro's image placeholders (for broken images)
    const placeholders = document.querySelectorAll('.ast-img-placeholder');
    placeholders.forEach(placeholder => this.handleImagePlaceholder(placeholder));
  }

  enhanceImage(img) {
    if (this.images.has(img)) return;
    this.images.add(img);

    // Add loading class initially
    img.classList.add('ast-img--loading');

    // Handle successful load
    img.addEventListener('load', () => {
      img.classList.remove('ast-img--loading');
      img.classList.add('ast-img--loaded');
      img.removeAttribute('data-loading');
    });

    // Handle load error
    img.addEventListener('error', () => {
      img.classList.remove('ast-img--loading');
      img.classList.add('ast-img--error');
      img.removeAttribute('data-loading');
      this.handleImageError(img);
    });

    // Check if image is already loaded (cached)
    if (img.complete && img.naturalHeight !== 0) {
      img.classList.remove('ast-img--loading');
      img.classList.add('ast-img--loaded');
    } else if (img.complete) {
      // Image failed to load
      img.classList.remove('ast-img--loading');
      img.classList.add('ast-img--error');
      this.handleImageError(img);
    } else {
      img.setAttribute('data-loading', 'true');
    }
  }

  handleImageError(img) {
    const fallbackSrc = img.dataset.fallback;
    const showPlaceholder = img.dataset.placeholder !== 'false';

    if (fallbackSrc && img.src !== fallbackSrc) {
      img.src = fallbackSrc;
      img.classList.remove('ast-img--error');
      img.classList.add('ast-img--loading');
    } else if (showPlaceholder) {
      this.createPlaceholder(img);
    }

    console.warn('Failed to load image:', img.src);
  }

  createPlaceholder(img) {
    const placeholder = document.createElement('div');
    placeholder.className = 'ast-img-placeholder';
    placeholder.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
        <polyline points="21,15 16,10 5,21" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span>Image not available</span>
    `;
    
    // Copy relevant styles from the original image
    if (img.style.width) placeholder.style.width = img.style.width;
    if (img.style.height) placeholder.style.height = img.style.height;
    if (img.className) placeholder.className += ' ' + img.className.replace(/ast-img--\w+/g, '');

    img.parentNode.replaceChild(placeholder, img);
  }

  handleImagePlaceholder(placeholder) {
    // Apply error styling to Astro's image placeholders
    placeholder.classList.add('ast-img--error');
    console.warn('Image placeholder detected for failed image');
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const lazyImages = document.querySelectorAll('img[data-lazy]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-lazy');
          img.setAttribute('data-enhanced', '');
          this.enhanceImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Method to manually enhance new images added to the DOM
  enhanceNewImage(img) {
    if (img.tagName !== 'IMG') return;
    img.setAttribute('data-enhanced', '');
    this.enhanceImage(img);
  }

  // Method to enhance all images in a container
  enhanceImagesInContainer(container) {
    const images = container.querySelectorAll('img:not([data-enhanced])');
    images.forEach(img => {
      img.setAttribute('data-enhanced', '');
      this.enhanceImage(img);
    });
  }

  setupMutationObserver() {
    // Watch for dynamically added image placeholders
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added node is a placeholder
            if (node.classList && node.classList.contains('ast-img-placeholder')) {
              this.handleImagePlaceholder(node);
            }
            // Check for placeholders within added nodes
            const placeholders = node.querySelectorAll && node.querySelectorAll('.ast-img-placeholder');
            if (placeholders) {
              placeholders.forEach(placeholder => this.handleImagePlaceholder(placeholder));
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Auto-initialize on DOM ready
let globalImageHandler;

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    globalImageHandler = new GlobalImageHandler();
    // Make it available globally for other components
    window.globalImageHandler = globalImageHandler;
  });
}

// Export for manual usage
export { GlobalImageHandler };
export default globalImageHandler;
