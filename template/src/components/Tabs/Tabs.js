// Fully accessible tab component implementation
// Follows ARIA Authoring Practices Guide for Tab Panel pattern

class Tabs {
  constructor(element) {
    this.tabsContainer = element;
    this.tabList = element.querySelector('[role="tablist"]');
    this.tabs = Array.from(element.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(element.querySelectorAll('[role="tabpanel"]'));
    this.orientation = this.tabList.getAttribute('aria-orientation') || 'horizontal';
    
    this.init();
  }

  init() {
    // Add event listeners
    this.tabs.forEach(tab => {
      tab.addEventListener('click', this.handleTabClick.bind(this));
      tab.addEventListener('keydown', this.handleTabKeydown.bind(this));
    });

    // Set initial state
    this.updateActiveTab(this.tabsContainer.dataset.activeTab);

    // Setup mobile scroll handling
    this.setupMobileScrolling();
  }

  setupMobileScrolling() {
    // Add scroll event listener for indicators
    this.tabList.addEventListener('scroll', this.handleTabListScroll.bind(this));
    
    // Initial scroll state check
    this.updateScrollIndicators();
    
    // Check on resize
    window.addEventListener('resize', this.updateScrollIndicators.bind(this));
  }

  handleTabListScroll() {
    this.updateScrollIndicators();
  }

  updateScrollIndicators() {
    const { scrollLeft, scrollWidth, clientWidth } = this.tabList;
    const isScrollable = scrollWidth > clientWidth;
    const isAtStart = scrollLeft <= 1;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;

    // Toggle scrollable class
    this.tabList.classList.toggle('scrollable', isScrollable);
    this.tabList.classList.toggle('scroll-start', isAtStart);
    this.tabList.classList.toggle('scroll-end', isAtEnd);
  }

  handleTabClick(event) {
    const tabId = event.target.dataset.tabTrigger;
    this.activateTab(tabId);
  }

  handleTabKeydown(event) {
    const currentIndex = this.tabs.indexOf(event.target);
    let targetIndex;

    switch (event.key) {
      case 'ArrowLeft':
        if (this.orientation === 'horizontal') {
          event.preventDefault();
          targetIndex = currentIndex === 0 ? this.tabs.length - 1 : currentIndex - 1;
          this.focusTab(targetIndex);
        }
        break;
      
      case 'ArrowRight':
        if (this.orientation === 'horizontal') {
          event.preventDefault();
          targetIndex = currentIndex === this.tabs.length - 1 ? 0 : currentIndex + 1;
          this.focusTab(targetIndex);
        }
        break;
      
      case 'ArrowUp':
        if (this.orientation === 'vertical') {
          event.preventDefault();
          targetIndex = currentIndex === 0 ? this.tabs.length - 1 : currentIndex - 1;
          this.focusTab(targetIndex);
        }
        break;
      
      case 'ArrowDown':
        if (this.orientation === 'vertical') {
          event.preventDefault();
          targetIndex = currentIndex === this.tabs.length - 1 ? 0 : currentIndex + 1;
          this.focusTab(targetIndex);
        }
        break;
      
      case 'Home':
        event.preventDefault();
        this.focusTab(0);
        break;
      
      case 'End':
        event.preventDefault();
        this.focusTab(this.tabs.length - 1);
        break;
      
      case 'Enter':
      case ' ':
        event.preventDefault();
        const tabId = event.target.dataset.tabTrigger;
        this.activateTab(tabId);
        break;
    }
  }

  focusTab(index) {
    const tab = this.tabs[index];
    tab.focus();
    // Ensure focused tab is visible when navigating with keyboard
    this.scrollTabIntoView(tab);
  }

  activateTab(tabId) {
    // Update tab states
    this.tabs.forEach(tab => {
      const isActive = tab.dataset.tabTrigger === tabId;
      tab.setAttribute('aria-selected', isActive);
      tab.tabIndex = isActive ? 0 : -1;
      
      // Add/remove active class for styling
      if (isActive) {
        tab.classList.add('tabs__tab--active');
        // Scroll active tab into view on mobile
        this.scrollTabIntoView(tab);
      } else {
        tab.classList.remove('tabs__tab--active');
      }
    });

    // Update panel states
    this.panels.forEach(panel => {
      const isActive = panel.dataset.tabPanel === tabId;
      panel.hidden = !isActive;
      
      // Add/remove active class for styling
      if (isActive) {
        panel.classList.add('tabs__panel--active');
      } else {
        panel.classList.remove('tabs__panel--active');
      }
    });

    // Update container state
    this.tabsContainer.dataset.activeTab = tabId;

    // Dispatch custom event for external listeners
    this.tabsContainer.dispatchEvent(new CustomEvent('tabchange', {
      detail: { activeTab: tabId },
      bubbles: true
    }));
  }

  scrollTabIntoView(tab) {
    // Only scroll into view on smaller screens where scrolling is likely needed
    if (window.innerWidth <= 768) {
      const tabRect = tab.getBoundingClientRect();
      const listRect = this.tabList.getBoundingClientRect();
      
      // Check if tab is outside the visible area
      if (tabRect.left < listRect.left || tabRect.right > listRect.right) {
        tab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }

  updateActiveTab(tabId) {
    if (tabId && this.tabs.find(tab => tab.dataset.tabTrigger === tabId)) {
      this.activateTab(tabId);
    }
  }

  // Public API methods
  setActiveTab(tabId) {
    this.updateActiveTab(tabId);
  }

  getActiveTab() {
    return this.tabsContainer.dataset.activeTab;
  }

  addTab(tabData) {
    // This would require more complex DOM manipulation
    // For now, it's better to rebuild the component with new data
    console.warn('Dynamic tab addition should be handled at the component level');
  }

  removeTab(tabId) {
    // This would require more complex DOM manipulation
    // For now, it's better to rebuild the component with new data
    console.warn('Dynamic tab removal should be handled at the component level');
  }
}

// Initialize all tab components on the page
function initTabs() {
  const tabElements = document.querySelectorAll('[data-tabs]');
  tabElements.forEach(element => {
    if (!element.tabsInstance) {
      element.tabsInstance = new Tabs(element);
    }
  });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTabs);
} else {
  initTabs();
}

// Export for potential external use
export { Tabs, initTabs };
