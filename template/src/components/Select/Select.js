/**
 * Select JavaScript functionality
 * Enhanced select dropdown with search, multi-select, and accessibility features
 */

class SelectComponent {
  constructor(element) {
    this.element = element;
    this.select = element.querySelector('.select-field__input');
    this.wrapper = element.querySelector('.select-field__wrapper');
    this.clearButton = element.querySelector('.select-field__clear');
    this.arrow = element.querySelector('.select-field__arrow');
    
    this.isSearchable = this.select.getAttribute('data-searchable') === 'true';
    this.isClearable = this.select.getAttribute('data-clearable') === 'true';
    this.isMultiple = this.select.hasAttribute('multiple');
    
    this.isOpen = false;
    this.searchTerm = '';
    this.highlightedIndex = -1;
    this.options = [];
    
    this.init();
  }

  init() {
    this.setupOptions();
    this.setupEventListeners();
    this.setupAccessibility();
    this.updateState();
    
    // Enhanced select for searchable selects
    if (this.isSearchable) {
      this.createEnhancedSelect();
    }
  }

  setupOptions() {
    this.options = Array.from(this.select.options).map((option, index) => ({
      value: option.value,
      label: option.textContent,
      disabled: option.disabled,
      selected: option.selected,
      element: option,
      index: index
    }));
  }

  setupEventListeners() {
    // Basic select events
    this.select.addEventListener('change', (e) => {
      this.handleChange(e);
    });

    this.select.addEventListener('focus', () => {
      this.element.classList.add('select-field--focused');
    });

    this.select.addEventListener('blur', () => {
      this.element.classList.remove('select-field--focused');
    });

    // Clear button
    if (this.clearButton) {
      this.clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.clearSelection();
      });
    }

    // Keyboard navigation
    this.select.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });

    // Mouse events for better UX
    this.select.addEventListener('mousedown', () => {
      this.element.classList.add('select-field--focused');
    });
  }

  setupAccessibility() {
    // Ensure proper ARIA attributes
    if (!this.select.getAttribute('aria-describedby')) {
      const helpElement = this.element.querySelector('.select-field__help, .select-field__error');
      if (helpElement && helpElement.id) {
        this.select.setAttribute('aria-describedby', helpElement.id);
      }
    }

    // Add role for enhanced selects
    if (this.isSearchable) {
      this.select.setAttribute('role', 'combobox');
      this.select.setAttribute('aria-expanded', 'false');
      this.select.setAttribute('aria-haspopup', 'listbox');
    }
  }

  handleChange(event) {
    this.updateState();
    
    // Emit custom event
    const changeEvent = new CustomEvent('select:change', {
      detail: {
        value: this.getValue(),
        name: this.select.name,
        element: this.element,
        originalEvent: event
      },
      bubbles: true
    });
    
    this.element.dispatchEvent(changeEvent);
  }

  handleKeydown(event) {
    if (this.isSearchable && this.isOpen) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.highlightNext();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.highlightPrevious();
          break;
        case 'Enter':
          event.preventDefault();
          this.selectHighlighted();
          break;
        case 'Escape':
          event.preventDefault();
          this.closeDropdown();
          break;
        case 'Tab':
          this.closeDropdown();
          break;
      }
    } else {
      // Standard select keyboard handling
      switch (event.key) {
        case 'Delete':
        case 'Backspace':
          if (this.isClearable && event.ctrlKey) {
            event.preventDefault();
            this.clearSelection();
          }
          break;
      }
    }
  }

  updateState() {
    const hasValue = this.hasValue();
    
    // Update CSS classes
    this.element.classList.toggle('select-field--has-value', hasValue);
    
    // Update clear button visibility
    if (this.clearButton) {
      this.clearButton.style.display = hasValue && this.isClearable ? 'flex' : 'none';
    }
    
    // Update ARIA attributes
    if (this.isSearchable) {
      this.select.setAttribute('aria-expanded', this.isOpen.toString());
    }
  }

  hasValue() {
    if (this.isMultiple) {
      return Array.from(this.select.selectedOptions).length > 0;
    }
    return this.select.value !== '';
  }

  getValue() {
    if (this.isMultiple) {
      return Array.from(this.select.selectedOptions).map(option => ({
        value: option.value,
        label: option.textContent
      }));
    }
    
    const selectedOption = this.select.selectedOptions[0];
    return selectedOption ? {
      value: selectedOption.value,
      label: selectedOption.textContent
    } : null;
  }

  setValue(value) {
    if (this.isMultiple && Array.isArray(value)) {
      // Clear all selections first
      Array.from(this.select.options).forEach(option => {
        option.selected = false;
      });
      
      // Select specified values
      value.forEach(val => {
        const option = this.select.querySelector(`option[value="${val}"]`);
        if (option) option.selected = true;
      });
    } else {
      this.select.value = value;
    }
    
    this.updateState();
    this.handleChange(new Event('change'));
  }

  clearSelection() {
    if (this.isMultiple) {
      Array.from(this.select.options).forEach(option => {
        option.selected = false;
      });
    } else {
      this.select.value = '';
    }
    
    this.updateState();
    this.handleChange(new Event('change'));
    
    // Focus back to select
    this.select.focus();
  }

  // Enhanced select methods (for searchable selects)
  createEnhancedSelect() {
    // This would create a custom dropdown for searchable functionality
    // For now, we'll keep the native select but add search capabilities
    this.setupSearch();
  }

  setupSearch() {
    let searchTimeout;
    
    this.select.addEventListener('keypress', (e) => {
      // Only handle printable characters
      if (e.key.length === 1) {
        clearTimeout(searchTimeout);
        this.searchTerm += e.key.toLowerCase();
        
        this.searchOptions();
        
        searchTimeout = setTimeout(() => {
          this.searchTerm = '';
        }, 1000);
      }
    });
  }

  searchOptions() {
    const matchingOption = Array.from(this.select.options).find(option => 
      option.textContent.toLowerCase().startsWith(this.searchTerm) && !option.disabled
    );
    
    if (matchingOption) {
      this.select.value = matchingOption.value;
      this.handleChange(new Event('change'));
    }
  }

  openDropdown() {
    this.isOpen = true;
    this.element.classList.add('select-field--open');
    this.updateState();
  }

  closeDropdown() {
    this.isOpen = false;
    this.element.classList.remove('select-field--open');
    this.highlightedIndex = -1;
    this.updateState();
  }

  highlightNext() {
    const enabledOptions = this.options.filter(opt => !opt.disabled);
    if (enabledOptions.length === 0) return;
    
    this.highlightedIndex = Math.min(this.highlightedIndex + 1, enabledOptions.length - 1);
    this.updateHighlight();
  }

  highlightPrevious() {
    this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
    this.updateHighlight();
  }

  updateHighlight() {
    // This would update visual highlighting in a custom dropdown
    // For native selects, we can focus the option
  }

  selectHighlighted() {
    if (this.highlightedIndex >= 0) {
      const enabledOptions = this.options.filter(opt => !opt.disabled);
      const option = enabledOptions[this.highlightedIndex];
      if (option) {
        this.setValue(option.value);
        this.closeDropdown();
      }
    }
  }

  // Public API methods
  disable() {
    this.select.disabled = true;
    this.element.classList.add('select-field--disabled');
  }

  enable() {
    this.select.disabled = false;
    this.element.classList.remove('select-field--disabled');
  }

  setError(message) {
    let errorElement = this.element.querySelector('.select-field__error');
    
    if (message) {
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'select-field__error';
        errorElement.setAttribute('role', 'alert');
        errorElement.id = `${this.select.name}-error`;
        this.element.appendChild(errorElement);
        
        this.select.setAttribute('aria-describedby', errorElement.id);
      }
      
      errorElement.textContent = message;
      this.element.classList.add('select-field--error');
      this.select.setAttribute('aria-invalid', 'true');
    } else {
      if (errorElement) {
        errorElement.remove();
      }
      this.element.classList.remove('select-field--error');
      this.select.setAttribute('aria-invalid', 'false');
    }
  }

  validate() {
    const isValid = this.select.checkValidity();
    if (!isValid) {
      this.setError(this.select.validationMessage);
    } else {
      this.setError('');
    }
    return isValid;
  }

  addOption(option) {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    optionElement.disabled = option.disabled || false;
    
    this.select.appendChild(optionElement);
    this.setupOptions(); // Refresh options array
  }

  removeOption(value) {
    const option = this.select.querySelector(`option[value="${value}"]`);
    if (option) {
      option.remove();
      this.setupOptions(); // Refresh options array
    }
  }

  getSelectedOptions() {
    return Array.from(this.select.selectedOptions).map(option => ({
      value: option.value,
      label: option.textContent
    }));
  }
}

// Auto-initialize Select components
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const selectElements = document.querySelectorAll('[data-component="select"]');
    selectElements.forEach(element => {
      if (!element.selectComponent) {
        element.selectComponent = new SelectComponent(element);
      }
    });
  });
}

// Auto-init function for manual initialization
const initSelect = () => {
  const selectElements = document.querySelectorAll('[data-component="select"]');
  selectElements.forEach(element => {
    if (!element.selectComponent) {
      element.selectComponent = new SelectComponent(element);
    }
  });
};

// Export both the class and the init function
export { SelectComponent, initSelect };
