/**
 * Checkbox JavaScript functionality
 * Handles validation, indeterminate states, and basic functionality
 */

class CheckboxComponent {
  constructor(element) {
    this.element = element;
    this.input = element.querySelector('.ast-checkbox-field__input');
    this.errorElement = element.querySelector('.ast-checkbox-field__error');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupValidation();
    this.handleInitialState();
  }

  setupEventListeners() {
    // Change event for state tracking
    this.input.addEventListener('change', (e) => {
      this.handleChange(e);
    });

    // Focus events for custom styling
    this.input.addEventListener('focus', () => {
      this.element.classList.add('ast-checkbox-field--focused');
    });

    this.input.addEventListener('blur', () => {
      this.element.classList.remove('ast-checkbox-field--focused');
      this.validateInput();
    });
  }

  setupValidation() {
    // Simple required validation
    this.isRequired = this.input.hasAttribute('required');
  }

  handleInitialState() {
    // Handle indeterminate state from data attribute
    const indeterminate = this.input.getAttribute('data-indeterminate');
    if (indeterminate === 'true') {
      this.setIndeterminate(true);
    }

    // Initial validation
    if (this.input.value && !this.input.checkValidity()) {
      this.validateInput();
    }
  }

  handleChange(event) {
    // Clear indeterminate state when user interacts
    if (this.input.indeterminate) {
      this.setIndeterminate(false);
    }

    // Validate on change
    this.validateInput();

    // Custom change event with additional data
    const changeEvent = new CustomEvent('checkbox:change', {
      detail: {
        checked: this.input.checked,
        value: this.input.value,
        name: this.input.name,
        element: this.element,
        valid: this.isValid(),
        originalEvent: event
      },
      bubbles: true
    });
    
    this.element.dispatchEvent(changeEvent);

    // Handle group interactions
    this.handleGroupInteraction();
  }

  handleGroupInteraction() {
    const group = this.element.closest('.ast-checkbox-group');
    if (!group) return;

    const checkboxes = group.querySelectorAll('.ast-checkbox-field__input');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const totalCount = checkboxes.length;

    // Update group state
    const groupEvent = new CustomEvent('checkbox:group:change', {
      detail: {
        checkedCount,
        totalCount,
        allChecked: checkedCount === totalCount,
        noneChecked: checkedCount === 0,
        someChecked: checkedCount > 0 && checkedCount < totalCount,
        group: group
      },
      bubbles: true
    });
    
    group.dispatchEvent(groupEvent);
  }

  validateInput() {
    let isValid = true;
    let errorMessage = '';

    // Required validation
    if (this.isRequired && !this.input.checked) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Update UI
    this.setError(isValid ? '' : errorMessage);
    this.input.setAttribute('aria-invalid', isValid ? 'false' : 'true');

    return isValid;
  }

  // Public API methods
  check() {
    this.input.checked = true;
    this.handleChange(new Event('change'));
  }

  uncheck() {
    this.input.checked = false;
    this.handleChange(new Event('change'));
  }

  toggle() {
    this.input.checked = !this.input.checked;
    this.handleChange(new Event('change'));
  }

  setIndeterminate(indeterminate) {
    this.input.indeterminate = indeterminate;
    this.input.setAttribute('data-indeterminate', indeterminate.toString());
    
    if (indeterminate) {
      this.element.classList.add('ast-checkbox-field--indeterminate');
    } else {
      this.element.classList.remove('ast-checkbox-field--indeterminate');
    }
  }

  setError(message) {
    if (this.errorElement) {
      if (message) {
        this.errorElement.textContent = message;
        this.errorElement.style.display = 'block';
        this.element.classList.add('ast-checkbox-field--error');
      } else {
        this.errorElement.style.display = 'none';
        this.element.classList.remove('ast-checkbox-field--error');
      }
    }
  }

  setDisabled(disabled) {
    this.input.disabled = disabled;
    if (disabled) {
      this.element.classList.add('ast-checkbox-field--disabled');
    } else {
      this.element.classList.remove('ast-checkbox-field--disabled');
    }
  }

  isValid() {
    return this.validateInput();
  }

  getValue() {
    return {
      name: this.input.name,
      value: this.input.value,
      checked: this.input.checked,
      valid: this.isValid()
    };
  }
}

// Checkbox Group Manager
class CheckboxGroupManager {
  constructor(groupElement) {
    this.group = groupElement;
    this.checkboxes = [];
    this.init();
  }

  init() {
    // Find all checkboxes in the group
    const checkboxElements = this.group.querySelectorAll('.ast-checkbox-field');
    this.checkboxes = Array.from(checkboxElements).map(element => {
      return element.checkboxComponent || new CheckboxComponent(element);
    });

    this.setupGroupEvents();
  }

  setupGroupEvents() {
    // Listen for individual checkbox changes
    this.group.addEventListener('checkbox:change', (event) => {
      this.handleGroupChange(event);
    });
  }

  handleGroupChange(event) {
    const checkedCount = this.getCheckedCount();
    const totalCount = this.checkboxes.length;

    // Update "select all" checkbox if present
    const selectAllCheckbox = this.group.querySelector('[data-select-all]');
    if (selectAllCheckbox) {
      const selectAllComponent = selectAllCheckbox.closest('.ast-checkbox-field').checkboxComponent;
      if (checkedCount === 0) {
        selectAllComponent.uncheck();
        selectAllComponent.setIndeterminate(false);
      } else if (checkedCount === totalCount) {
        selectAllComponent.check();
        selectAllComponent.setIndeterminate(false);
      } else {
        selectAllComponent.setIndeterminate(true);
      }
    }
  }

  // Public API methods
  checkAll() {
    this.checkboxes.forEach(checkbox => {
      if (!checkbox.input.hasAttribute('data-select-all')) {
        checkbox.check();
      }
    });
  }

  uncheckAll() {
    this.checkboxes.forEach(checkbox => {
      if (!checkbox.input.hasAttribute('data-select-all')) {
        checkbox.uncheck();
      }
    });
  }

  getCheckedCount() {
    return this.checkboxes.filter(checkbox => 
      checkbox.input.checked && !checkbox.input.hasAttribute('data-select-all')
    ).length;
  }

  getCheckedValues() {
    return this.checkboxes
      .filter(checkbox => checkbox.input.checked && !checkbox.input.hasAttribute('data-select-all'))
      .map(checkbox => checkbox.getValue());
  }

  validate() {
    return this.checkboxes.every(checkbox => checkbox.isValid());
  }
}

// Auto-init function for manual initialization
const initCheckbox = () => {
  // Initialize individual checkboxes
  const checkboxes = document.querySelectorAll('.ast-checkbox-field');
  checkboxes.forEach(checkbox => {
    if (!checkbox.checkboxComponent) {
      checkbox.checkboxComponent = new CheckboxComponent(checkbox);
    }
  });

  // Initialize checkbox groups
  const groups = document.querySelectorAll('.ast-checkbox-group');
  groups.forEach(group => {
    if (!group.checkboxGroupManager) {
      group.checkboxGroupManager = new CheckboxGroupManager(group);
    }
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCheckbox();
    
    // Handle "select all" functionality
    document.addEventListener('checkbox:change', (event) => {
      const checkbox = event.target.closest('.ast-checkbox-field');
      const input = checkbox.querySelector('.ast-checkbox-field__input');
      
      if (input.hasAttribute('data-select-all')) {
        const group = checkbox.closest('.ast-checkbox-group');
        if (group && group.checkboxGroupManager) {
          if (input.checked) {
            group.checkboxGroupManager.checkAll();
          } else {
            group.checkboxGroupManager.uncheckAll();
          }
        }
      }
    });
  });
} else {
  initCheckbox();
}

// Export both the classes and the init function
export { CheckboxComponent, CheckboxGroupManager, initCheckbox };
