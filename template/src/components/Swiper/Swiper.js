/**
 * Swiper Component JavaScript
 * Enhanced carousel/slider functionality with Swiper.js integration
 */

import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Lazy, Mousewheel, Keyboard, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

class SwiperComponent {
  constructor(element) {
    this.element = element;
    this.swiperElement = element.querySelector('.swiper');
    this.config = this.parseConfig();
    this.swiper = null;
    
    this.init();
  }

  parseConfig() {
    try {
      const configData = this.element.dataset.swiperConfig;
      return configData ? JSON.parse(configData) : {};
    } catch (error) {
      console.warn('Failed to parse Swiper config:', error);
      return {};
    }
  }

  init() {
    if (!this.swiperElement) {
      console.warn('Swiper element not found');
      return;
    }

    // Mark as loading
    this.element.dataset.loading = 'true';

    // Initialize Swiper with configuration
    this.initializeSwiper();

    // Set up event listeners
    this.setupEventListeners();

    // Remove loading state
    delete this.element.dataset.loading;
  }

  initializeSwiper() {
    const id = this.swiperElement.id;
    const slideElements = this.swiperElement.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
    const hasNavigation = this.element.querySelector('.swiper-button-next');
    const hasPagination = this.element.querySelector('.swiper-pagination');

    // Build modules array
    const modules = this.getModules(hasNavigation, hasPagination);
    
    // Build Swiper configuration with aggressive loop prevention
    const swiperConfig = {
      modules,
      // Basic settings
      slidesPerView: this.config.slidesPerView || 1,
      spaceBetween: this.config.spaceBetween || 20,
      loop: false, // Force disabled
      loopFillGroupWithBlank: false, // Force disabled
      loopPreventsSlide: false, // Force disabled
      loopedSlides: 0, // Force disabled
      speed: this.config.speed || 300,
      direction: this.config.direction || 'horizontal',
      centeredSlides: false, // Force disabled to prevent loop mode conflicts
      grabCursor: this.config.grabCursor !== false,
      
      // Effects - keep simple
      effect: this.config.effect === 'fade' ? 'fade' : 'slide',
      fadeEffect: this.config.effect === 'fade' ? { crossFade: true } : undefined,

      // Features
      autoplay: this.getAutoplayConfig(),
      navigation: this.getNavigationConfig(hasNavigation, id),
      pagination: this.getPaginationConfig(hasPagination, id, slideElements.length),
      lazy: this.getLazyConfig(),
      mousewheel: this.getMousewheelConfig(),
      keyboard: this.getKeyboardConfig(),
      breakpoints: this.config.breakpoints || this.getDefaultBreakpoints(slideElements.length, this.config.slidesPerView),
      
      // Accessibility
      a11y: this.getA11yConfig(),
      
      // Event callbacks
      on: this.getEventCallbacks(),
    };

    // Initialize Swiper with error suppression for loop warnings
    const originalConsoleWarn = console.warn;
    console.warn = (message, ...args) => {
      if (typeof message === 'string' && message.includes('Loop Warning')) {
        // Suppress Swiper loop warnings
        return;
      }
      originalConsoleWarn.call(console, message, ...args);
    };

    this.swiper = new Swiper(this.swiperElement, swiperConfig);

    // Restore console.warn after initialization
    setTimeout(() => {
      console.warn = originalConsoleWarn;
    }, 100);
  }

  getModules(hasNavigation, hasPagination) {
    const modules = [Autoplay];
    
    if (this.config.effect === 'fade') modules.push(EffectFade);
    if (hasNavigation) modules.push(Navigation);
    if (hasPagination) modules.push(Pagination);
    if (this.config.lazy) modules.push(Lazy);
    if (this.config.mousewheel) modules.push(Mousewheel);
    if (this.config.keyboard) modules.push(Keyboard);
    
    return modules;
  }

  getAutoplayConfig() {
    if (!this.config.autoplay) return false;
    
    return typeof this.config.autoplay === 'object' ? this.config.autoplay : {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    };
  }

  getNavigationConfig(hasNavigation, id) {
    return hasNavigation ? {
      nextEl: `.${id}-next`,
      prevEl: `.${id}-prev`,
    } : false;
  }

  getPaginationConfig(hasPagination, id, slideCount) {
    return hasPagination ? {
      el: `.${id}-pagination`,
      clickable: true,
      dynamicBullets: slideCount > 10,
      dynamicMainBullets: 3,
    } : false;
  }

  getLazyConfig() {
    return this.config.lazy ? {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    } : false;
  }

  getMousewheelConfig() {
    return this.config.mousewheel ? {
      invert: false,
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: true,
    } : false;
  }

  getKeyboardConfig() {
    return this.config.keyboard !== false ? {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    } : false;
  }

  getA11yConfig() {
    return {
      enabled: true,
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: 'Image carousel with {{slidesLength}} slides',
      containerRoleDescriptionMessage: 'carousel',
      itemRoleDescriptionMessage: 'slide',
    };
  }

  getEventCallbacks() {
    return {
      init: () => this.onSwiperInit(),
      slideChange: () => this.onSlideChange(),
      reachBeginning: () => this.onReachBeginning(),
      reachEnd: () => this.onReachEnd(),
      autoplayStart: () => this.onAutoplayStart(),
      autoplayStop: () => this.onAutoplayStop(),
      resize: () => this.onResize(),
    };
  }

  getDefaultBreakpoints(slideCount, explicitSlidesPerView) {
    // If slidesPerView is explicitly set to 1, respect it across all breakpoints
    if (explicitSlidesPerView === 1) {
      return {
        320: { slidesPerView: 1, spaceBetween: 10 },
        480: { slidesPerView: 1, spaceBetween: 15 },
        768: { slidesPerView: 1, spaceBetween: 20 },
        1024: { slidesPerView: 1, spaceBetween: 25 },
        1280: { slidesPerView: 1, spaceBetween: 30 },
      };
    }

    // Default responsive breakpoints
    return {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: Math.min(1, slideCount),
        spaceBetween: 15,
      },
      768: {
        slidesPerView: Math.min(2, slideCount),
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: Math.min(3, slideCount),
        spaceBetween: 25,
      },
      1280: {
        slidesPerView: Math.min(4, slideCount),
        spaceBetween: 30,
      },
    };
  }

  shouldEnableLoop(slideCount) {
    // Loop disabled to prevent warnings - can be re-enabled later if needed
    return false;
  }

  setupEventListeners() {
    // Pause autoplay on hover
    if (this.config.autoplay) {
      this.element.addEventListener('mouseenter', () => {
        if (this.swiper && this.swiper.autoplay) {
          this.swiper.autoplay.stop();
        }
      });

      this.element.addEventListener('mouseleave', () => {
        if (this.swiper && this.swiper.autoplay) {
          this.swiper.autoplay.start();
        }
      });
    }

    // Handle visibility change (pause when tab is not visible)
    document.addEventListener('visibilitychange', () => {
      if (!this.swiper || !this.swiper.autoplay) return;
      
      if (document.hidden) {
        this.swiper.autoplay.stop();
      } else {
        this.swiper.autoplay.start();
      }
    });
  }

  // Event callbacks
  onSwiperInit() {
    // Custom initialization logic
    this.element.dispatchEvent(new CustomEvent('swiperInit', {
      detail: { swiper: this.swiper }
    }));
  }

  onSlideChange() {
    const activeSlide = this.swiper.slides[this.swiper.activeIndex];
    this.element.dispatchEvent(new CustomEvent('swiperSlideChange', {
      detail: { 
        swiper: this.swiper, 
        activeIndex: this.swiper.activeIndex,
        activeSlide: activeSlide
      }
    }));
  }

  onReachBeginning() {
    this.element.dispatchEvent(new CustomEvent('swiperReachBeginning', {
      detail: { swiper: this.swiper }
    }));
  }

  onReachEnd() {
    this.element.dispatchEvent(new CustomEvent('swiperReachEnd', {
      detail: { swiper: this.swiper }
    }));
  }

  onAutoplayStart() {
    this.element.dispatchEvent(new CustomEvent('swiperAutoplayStart', {
      detail: { swiper: this.swiper }
    }));
  }

  onAutoplayStop() {
    this.element.dispatchEvent(new CustomEvent('swiperAutoplayStop', {
      detail: { swiper: this.swiper }
    }));
  }

  onResize() {
    // Handle resize logic if needed
    this.element.dispatchEvent(new CustomEvent('swiperResize', {
      detail: { swiper: this.swiper }
    }));
  }

  // Public API methods
  next() {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }

  prev() {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  }

  goTo(index) {
    if (this.swiper) {
      this.swiper.slideTo(index);
    }
  }

  startAutoplay() {
    if (this.swiper && this.swiper.autoplay) {
      this.swiper.autoplay.start();
    }
  }

  stopAutoplay() {
    if (this.swiper && this.swiper.autoplay) {
      this.swiper.autoplay.stop();
    }
  }

  update() {
    if (this.swiper) {
      this.swiper.update();
    }
  }

  destroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}

// Auto-initialize all swiper components
document.addEventListener('DOMContentLoaded', () => {
  const swipers = document.querySelectorAll('[data-component="swiper"]');
  swipers.forEach(swiper => {
    if (!swiper.swiperComponent) {
      swiper.swiperComponent = new SwiperComponent(swiper);
    }
  });
});

// Initialize dynamically added swipers
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        const swipers = node.matches('[data-component="swiper"]') 
          ? [node] 
          : node.querySelectorAll('[data-component="swiper"]');
        
        swipers.forEach(swiper => {
          if (!swiper.swiperComponent) {
            swiper.swiperComponent = new SwiperComponent(swiper);
          }
        });
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SwiperComponent;
} else if (typeof define === 'function' && define.amd) {
  define([], () => SwiperComponent);
} else if (typeof window !== 'undefined') {
  window.SwiperComponent = SwiperComponent;
}
