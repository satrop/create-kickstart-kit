/**
 * Accordion Component JavaScript
 * Handles expand/collapse functionality with keyboard navigation
 */

class AccordionComponent {
  constructor(accordion) {
    this.accordion = accordion;
    this.allowMultiple = accordion.dataset.allowMultiple === "true";
    this.triggers = accordion.querySelectorAll("[data-accordion-trigger]");
    this.contents = accordion.querySelectorAll("[data-accordion-content]");

    if (this.triggers.length === 0 || this.contents.length === 0) {
      return;
    }

    // Store instance reference
    this.accordion.accordionComponent = this;
    this.init();
  }

  init() {
    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => this.handleClick(index));
      trigger.addEventListener("keydown", (e) => this.handleKeydown(e, index));
    });
  }

  handleClick(index) {
    const trigger = this.triggers[index];
    const content = this.contents[index];
    
    if (!trigger || !content) return;

    const isExpanded = trigger.getAttribute("aria-expanded") === "true";

    if (!this.allowMultiple) {
      // Close all other items
      this.triggers.forEach((otherTrigger, otherIndex) => {
        if (otherIndex !== index) {
          this.collapseItem(otherIndex);
        }
      });
    }

    if (isExpanded) {
      this.collapseItem(index);
    } else {
      this.expandItem(index);
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

  expandItem(index) {
    const trigger = this.triggers[index];
    const content = this.contents[index];
    
    if (!trigger || !content) return;
    
    trigger.setAttribute("aria-expanded", "true");
    content.setAttribute("data-expanded", "true");

    // Set max-height for smooth animation
    const scrollHeight = content.scrollHeight;
    content.style.maxHeight = `${scrollHeight}px`;

    // Custom event
    this.accordion.dispatchEvent(new CustomEvent('accordion:expand', {
      detail: { index },
      bubbles: true
    }));
  }

  collapseItem(index) {
    const trigger = this.triggers[index];
    const content = this.contents[index];
    
    if (!trigger || !content) return;
    
    trigger.setAttribute("aria-expanded", "false");
    content.setAttribute("data-expanded", "false");
    content.style.maxHeight = "0";

    // Custom event
    this.accordion.dispatchEvent(new CustomEvent('accordion:collapse', {
      detail: { index },
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

  // Public API methods
  collapseAll() {
    this.triggers.forEach((trigger, index) => {
      this.collapseItem(index);
    });
  }

  expandAll() {
    if (this.allowMultiple) {
      this.triggers.forEach((trigger, index) => {
        this.expandItem(index);
      });
    }
  }
}

// Auto-init function for manual initialization
const initAccordion = () => {
  const accordions = document.querySelectorAll('.ast-accordion');
  accordions.forEach(accordion => {
    if (!accordion.accordionComponent) {
      new AccordionComponent(accordion);
    }
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccordion);
} else {
  initAccordion();
}

// Export both the class and the init function
export { AccordionComponent, initAccordion };
