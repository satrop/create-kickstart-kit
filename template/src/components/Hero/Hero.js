/**
 * Hero Component JavaScript
 * Handles intersection observer for animations and accessibility enhancements
 */

class HeroComponent {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupKeyboardNavigation();
    this.setupAccessibility();
  }

  /**
   * Setup intersection observer for scroll animations
   */
  setupIntersectionObserver() {
    if (!window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ast-hero--in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(this.element);
  }

  /**
   * Setup keyboard navigation for action buttons
   */
  setupKeyboardNavigation() {
    const actions = this.element.querySelector('.ast-hero__actions');
    if (!actions) return;

    const buttons = actions.querySelectorAll('button, a[href]');
    if (buttons.length === 0) return;

    buttons.forEach((button, index) => {
      button.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            const nextIndex = (index + 1) % buttons.length;
            buttons[nextIndex].focus();
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            const prevIndex = (index - 1 + buttons.length) % buttons.length;
            buttons[prevIndex].focus();
            break;
          case 'Home':
            e.preventDefault();
            buttons[0].focus();
            break;
          case 'End':
            e.preventDefault();
            buttons[buttons.length - 1].focus();
            break;
        }
      });
    });
  }

  /**
   * Setup accessibility enhancements
   */
  setupAccessibility() {
    // Add role and aria-label for screen readers
    if (!this.element.hasAttribute('role')) {
      this.element.setAttribute('role', 'banner');
    }

    // Ensure the hero has proper heading structure
    const title = this.element.querySelector('.ast-hero__title');
    if (title && !title.hasAttribute('id')) {
      const heroId = `hero-${Math.random().toString(36).substr(2, 9)}`;
      title.setAttribute('id', heroId);
      this.element.setAttribute('aria-labelledby', heroId);
    }

    // Add skip link functionality if needed
    this.addSkipLinkTarget();
  }

  /**
   * Add skip link target for keyboard users
   */
  addSkipLinkTarget() {
    const skipTarget = document.createElement('a');
    skipTarget.href = '#main-content';
    skipTarget.className = 'ast-hero__skip-link sr-only focus:not-sr-only';
    skipTarget.textContent = 'Skip to main content';
    skipTarget.setAttribute('tabindex', '0');

    // Insert at the beginning of the hero
    this.element.insertBefore(skipTarget, this.element.firstChild);

    // Style the skip link
    const style = document.createElement('style');
    style.textContent = `
      .ast-hero__skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--white, #fff);
        color: var(--gray-900, #111);
        padding: 8px 16px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 600;
        z-index: 9999;
        transition: top 0.3s ease;
      }
      
      .ast-hero__skip-link:focus {
        top: 6px;
      }
    `;
    
    if (!document.querySelector('#hero-skip-link-styles')) {
      style.id = 'hero-skip-link-styles';
      document.head.appendChild(style);
    }
  }

  /**
   * Update content dynamically (useful for CMS integration)
   */
  updateContent({ title, subtitle, description, imageSrc, imageAlt }) {
    if (title) {
      const titleElement = this.element.querySelector('.ast-hero__title');
      if (titleElement) titleElement.textContent = title;
    }

    if (subtitle) {
      const subtitleElement = this.element.querySelector('.ast-hero__subtitle');
      if (subtitleElement) {
        subtitleElement.textContent = subtitle;
      } else {
        // Create subtitle if it doesn't exist
        const newSubtitle = document.createElement('p');
        newSubtitle.className = 'ast-hero__subtitle';
        newSubtitle.textContent = subtitle;
        const titleElement = this.element.querySelector('.ast-hero__title');
        if (titleElement) {
          titleElement.parentNode.insertBefore(newSubtitle, titleElement);
        }
      }
    }

    if (description) {
      const descElement = this.element.querySelector('.ast-hero__description');
      if (descElement) {
        descElement.textContent = description;
      }
    }

    if (imageSrc && imageAlt) {
      const imageElement = this.element.querySelector('.ast-hero__image');
      if (imageElement) {
        imageElement.src = imageSrc;
        imageElement.alt = imageAlt;
      }
    }
  }

  /**
   * Destroy the component and clean up event listeners
   */
  destroy() {
    // Remove any event listeners or observers if needed
    // This method would be called when the component is removed from the DOM
  }
}

/**
 * Initialize all hero components on the page
 */
function initHeroComponents() {
  const heroes = document.querySelectorAll('.ast-hero[data-animate="true"]');
  
  heroes.forEach((hero) => {
    if (!hero.heroComponent) {
      hero.heroComponent = new HeroComponent(hero);
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroComponents);
} else {
  initHeroComponents();
}

// Export for manual initialization
export { HeroComponent, initHeroComponents };
