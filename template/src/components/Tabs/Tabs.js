/**
 * Tabs Component JavaScript
 * Handles tab switching with keyboard navigation
 */

class TabsComponent {
  constructor(element) {
    this.tabsContainer = element;
    this.tabList = element.querySelector('[role="tablist"]');
    this.tabs = Array.from(element.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(element.querySelectorAll('[role="tabpanel"]'));
    
    this.init();
  }

  init() {
    // Add event listeners
    this.tabs.forEach(tab => {
      tab.addEventListener('click', this.handleTabClick.bind(this));
      tab.addEventListener('keydown', this.handleTabKeydown.bind(this));
    });

    // Set initial state
    const activeTab = this.tabsContainer.dataset.activeTab || this.tabs[0]?.dataset.tabTrigger;
    if (activeTab) {
      this.activateTab(activeTab);
    }
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
        event.preventDefault();
        targetIndex = currentIndex === 0 ? this.tabs.length - 1 : currentIndex - 1;
        this.focusTab(targetIndex);
        break;
      
      case 'ArrowRight':
        event.preventDefault();
        targetIndex = currentIndex === this.tabs.length - 1 ? 0 : currentIndex + 1;
        this.focusTab(targetIndex);
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
    this.tabs[index].focus();
  }

  activateTab(tabId) {
    // Update tab states
    this.tabs.forEach(tab => {
      const isActive = tab.dataset.tabTrigger === tabId;
      tab.setAttribute('aria-selected', isActive);
      tab.tabIndex = isActive ? 0 : -1;
      tab.classList.toggle('tabs__tab--active', isActive);
    });

    // Update panel states
    this.panels.forEach(panel => {
      const isActive = panel.dataset.tabPanel === tabId;
      panel.hidden = !isActive;
      panel.classList.toggle('tabs__panel--active', isActive);
    });

    // Update container state
    this.tabsContainer.dataset.activeTab = tabId;

    // Dispatch custom event
    this.tabsContainer.dispatchEvent(new CustomEvent('tabs:change', {
      detail: { activeTab: tabId },
      bubbles: true
    }));
  }

  // Public API methods
  setActiveTab(tabId) {
    if (this.tabs.find(tab => tab.dataset.tabTrigger === tabId)) {
      this.activateTab(tabId);
    }
  }

  getActiveTab() {
    return this.tabsContainer.dataset.activeTab;
  }
}

// Auto-init function for manual initialization
const initTabs = () => {
  const tabElements = document.querySelectorAll('[data-tabs]');
  tabElements.forEach(element => {
    if (!element.tabsComponent) {
      element.tabsComponent = new TabsComponent(element);
    }
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTabs);
} else {
  initTabs();
}

// Export for external use
export { TabsComponent, initTabs };
