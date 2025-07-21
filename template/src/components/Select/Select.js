/**
 * Select JavaScript functionality
 * Basic enhanced select with clear functionality and validation
 */

class SelectComponent {
  constructor(element) {
    this.element = element;
    this.select = element.querySelector('.select-field__input');
    this.clearButton = element.querySelector('.select-field__clear');
    
    this.isClearable = this.select.getAttribute('data-clearable') === 'true';
    this.isMultiple = this.select.hasAttribute('multiple');
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateState();
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

    // Keyboard shortcut for clearing
    this.select.addEventListener('keydown', (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && this.isClearable && e.ctrlKey) {
        e.preventDefault();
        this.clearSelection();
      }
    });
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

  updateState() {
    const hasValue = this.hasValue();
    
    // Update CSS classes
    this.element.classList.toggle('select-field--has-value', hasValue);
    
    // Update clear button visibility
    if (this.clearButton) {
      this.clearButton.style.display = hasValue && this.isClearable ? 'flex' : 'none';
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

  // Public API methods
  enable() {
    this.select.disabled = false;
    this.element.classList.remove('select-field--disabled');
  }

  disable() {
    this.select.disabled = true;
    this.element.classList.add('select-field--disabled');
  }

  isValid() {
    return this.select.checkValidity();
  }
}

// Auto-init function for manual initialization
const initSelect = () => {
  const selectElements = document.querySelectorAll('.select-field');
  selectElements.forEach(element => {
    if (!element.selectComponent) {
      element.selectComponent = new SelectComponent(element);
    }
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSelect);
} else {
  initSelect();
}

// Export both the class and the init function
export { SelectComponent, initSelect };
