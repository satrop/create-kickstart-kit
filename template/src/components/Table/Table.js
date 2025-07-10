/**
 * Table JavaScript functionality
 * Handles responsive scrolling with visual indicators
 */

class ResponsiveTable {
  constructor(element) {
    this.wrapper = element;
    this.container = this.wrapper.querySelector('.ast-table-scroll-container');
    this.scrollIndicator = this.wrapper.querySelector('.ast-table-scroll-indicator');
    
    if (!this.container || !this.scrollIndicator) return;
    
    this.init();
  }

  init() {
    this.updateScrollIndicator();
    this.bindEvents();
    
    // Initial check on load
    window.addEventListener('load', () => {
      this.updateScrollIndicator();
    });
  }

  bindEvents() {
    // Update indicator on window resize
    window.addEventListener('resize', () => {
      this.updateScrollIndicator();
    });
  }

  updateScrollIndicator() {
    const { scrollWidth, clientWidth } = this.container;
    
    // Check if table overflows
    const hasOverflow = scrollWidth > clientWidth;
    
    if (hasOverflow) {
      this.scrollIndicator.classList.add('visible');
    } else {
      this.scrollIndicator.classList.remove('visible');
    }
  }
}

// Initialize function following the component pattern
const initTable = () => {
  const tables = document.querySelectorAll('[data-table-responsive]');
  tables.forEach((el) => {
    if (!el.responsiveTable) {
      el.responsiveTable = new ResponsiveTable(el);
    }
  });
};

// Export both the class and the init function
export { ResponsiveTable, initTable };
