/**
 * Accordion Component JavaScript
 * Handles accessibility, keyboard navigation, and expand/collapse functionality
 */

class AccordionManager {
  constructor() {
    this.init();
  }

  init() {
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.setupAccordions();
        });
      } else {
        this.setupAccordions();
      }

      // Handle dynamic content
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.matches('.accordion')) {
                this.setupAccordion(node);
              }
              // Check for accordions in added subtree
              const accordions = node.querySelectorAll('.accordion');
              accordions.forEach(accordion => this.setupAccordion(accordion));
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    }
  }

  setupAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => this.setupAccordion(accordion));
  }

  setupAccordion(accordion) {
    new AccordionInstance(accordion);
  }

  // Public API methods
  expandItem(accordionSelector, itemId) {
    const accordion = document.querySelector(accordionSelector);
    if (accordion) {
      const instance = accordion._accordionInstance;
      if (instance) {
        instance.expandItem(itemId);
      }
    }
  }

  collapseItem(accordionSelector, itemId) {
    const accordion = document.querySelector(accordionSelector);
    if (accordion) {
      const instance = accordion._accordionInstance;
      if (instance) {
        instance.collapseItem(itemId);
      }
    }
  }

  collapseAll(accordionSelector) {
    const accordion = document.querySelector(accordionSelector);
    if (accordion) {
      const instance = accordion._accordionInstance;
      if (instance) {
        instance.collapseAll();
      }
    }
  }
}

class AccordionInstance {
  constructor(accordion) {
    this.accordion = accordion;
    this.allowMultiple = accordion.dataset.allowMultiple === "true";
    this.triggers = accordion.querySelectorAll("[data-accordion-trigger]");
    this.contents = accordion.querySelectorAll("[data-accordion-content]");

    // Store instance reference for public API
    this.accordion._accordionInstance = this;

    this.init();
  }

  init() {
    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => this.handleClick(index));
      trigger.addEventListener("keydown", (e) => this.handleKeydown(e, index));
    });

    // Trigger custom event
    this.accordion.dispatchEvent(new CustomEvent('accordion:initialized', {
      detail: { 
        allowMultiple: this.allowMultiple,
        itemCount: this.triggers.length
      },
      bubbles: true
    }));
  }

  handleClick(index) {
    const trigger = this.triggers[index];
    const content = this.contents[index];
    const isExpanded = trigger.getAttribute("aria-expanded") === "true";

    if (!this.allowMultiple) {
      // Close all other items
      this.triggers.forEach((otherTrigger, otherIndex) => {
        if (otherIndex !== index) {
          this.collapseItemByIndex(otherIndex);
        }
      });
    }

    if (isExpanded) {
      this.collapseItemByIndex(index);
    } else {
      this.expandItemByIndex(index);
    }
  }

  handleKeydown(event, index) {
    const { key } = event;

    switch (key) {
      case "ArrowDown":
        event.preventDefault();
        this.focusNextTrigger(index);
        break;
      case "ArrowUp":
        event.preventDefault();
        this.focusPreviousTrigger(index);
        break;
      case "Home":
        event.preventDefault();
        this.triggers[0].focus();
        break;
      case "End":
        event.preventDefault();
        this.triggers[this.triggers.length - 1].focus();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        this.handleClick(index);
        break;
    }
  }

  expandItemByIndex(index) {
    const trigger = this.triggers[index];
    const content = this.contents[index];
    
    trigger.setAttribute("aria-expanded", "true");
    content.setAttribute("data-expanded", "true");

    // Set max-height to actual height for smooth animation
    const scrollHeight = content.scrollHeight;
    content.style.maxHeight = `${scrollHeight}px`;

    // Trigger custom event
    const itemId = content.id.replace('accordion-content-', '');
    this.accordion.dispatchEvent(new CustomEvent('accordion:expand', {
      detail: { itemId, index },
      bubbles: true
    }));
  }

  collapseItemByIndex(index) {
    const trigger = this.triggers[index];
    const content = this.contents[index];
    
    trigger.setAttribute("aria-expanded", "false");
    content.setAttribute("data-expanded", "false");
    content.style.maxHeight = "0";

    // Trigger custom event
    const itemId = content.id.replace('accordion-content-', '');
    this.accordion.dispatchEvent(new CustomEvent('accordion:collapse', {
      detail: { itemId, index },
      bubbles: true
    }));
  }

  focusNextTrigger(currentIndex) {
    const nextIndex = currentIndex === this.triggers.length - 1 ? 0 : currentIndex + 1;
    this.triggers[nextIndex].focus();
  }

  focusPreviousTrigger(currentIndex) {
    const previousIndex = currentIndex === 0 ? this.triggers.length - 1 : currentIndex - 1;
    this.triggers[previousIndex].focus();
  }

  // Public API methods for external control
  expandItem(itemId) {
    const content = this.accordion.querySelector(`#accordion-content-${itemId}`);
    if (content) {
      const index = Array.from(this.contents).indexOf(content);
      if (index !== -1) {
        this.expandItemByIndex(index);
      }
    }
  }

  collapseItem(itemId) {
    const content = this.accordion.querySelector(`#accordion-content-${itemId}`);
    if (content) {
      const index = Array.from(this.contents).indexOf(content);
      if (index !== -1) {
        this.collapseItemByIndex(index);
      }
    }
  }

  collapseAll() {
    this.triggers.forEach((trigger, index) => {
      this.collapseItemByIndex(index);
    });
  }

  expandAll() {
    if (this.allowMultiple) {
      this.triggers.forEach((trigger, index) => {
        this.expandItemByIndex(index);
      });
    }
  }

  isExpanded(itemId) {
    const content = this.accordion.querySelector(`#accordion-content-${itemId}`);
    return content && content.getAttribute('data-expanded') === 'true';
  }
}

// Auto-initialize when script loads
const accordionManager = new AccordionManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AccordionManager, accordionManager };
} else if (typeof define === 'function' && define.amd) {
  define([], () => ({ AccordionManager, accordionManager }));
} else if (typeof window !== 'undefined') {
  window.AccordionManager = AccordionManager;
  window.accordionManager = accordionManager;
}
