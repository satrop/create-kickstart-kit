/**
 * Checkbox JavaScript functionality
 * Handles validation, indeterminate states, and accessibility enhancements
 */

class CheckboxComponent {
  constructor(element) {
    this.element = element;
    this.input = element.querySelector('.checkbox-field__input');
    this.label = element.querySelector('.checkbox-field__label');
    this.box = element.querySelector('.checkbox-field__box');
    this.errorElement = element.querySelector('.checkbox-field__error');
    this.helpElement = element.querySelector('.checkbox-field__help');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupValidation();
    this.setupAccessibility();
    this.handleInitialState();
  }

  setupEventListeners() {
    // Change event for state tracking
    this.input.addEventListener('change', (e) => {
      this.handleChange(e);
    });

    // Custom keyboard handling for better UX
    this.input.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });

    // Focus events for custom styling
    this.input.addEventListener('focus', () => {
      this.element.classList.add('checkbox-field--focused');
    });

    this.input.addEventListener('blur', () => {
      this.element.classList.remove('checkbox-field--focused');
      this.validateInput();
    });

    // Label click handling (for analytics)
    this.label.addEventListener('click', (e) => {
      // Don't prevent default, but track the interaction
      this.trackInteraction('label_click');
    });
  }

  setupValidation() {
    // Custom validation patterns
    this.validationRules = [];
    
    // Required validation
    if (this.input.hasAttribute('required')) {
      this.validationRules.push({
        validate: () => this.input.checked,
        message: 'This field is required'
      });
    }

    // Custom validation from data attributes
    const customValidation = this.input.getAttribute('data-validation');
    if (customValidation) {
      try {
        const rule = JSON.parse(customValidation);
        this.validationRules.push(rule);
      } catch (e) {
        console.warn('Invalid validation rule:', customValidation);
      }
    }
  }

  setupAccessibility() {
    // Ensure proper ARIA attributes
    if (!this.input.getAttribute('aria-describedby') && (this.helpElement || this.errorElement)) {
      const describedBy = [];
      if (this.helpElement) describedBy.push(this.helpElement.id);
      if (this.errorElement) describedBy.push(this.errorElement.id);
      this.input.setAttribute('aria-describedby', describedBy.join(' '));
    }

    // Add role if needed for complex checkboxes
    const role = this.input.getAttribute('data-role');
    if (role) {
      this.input.setAttribute('role', role);
    }

    // Handle group accessibility
    const group = this.element.closest('.checkbox-group');
    if (group && !group.getAttribute('role')) {
      group.setAttribute('role', 'group');
      
      // Add group label if available
      const groupLabel = group.querySelector('.checkbox-group__label');
      if (groupLabel && !group.getAttribute('aria-labelledby')) {
        if (!groupLabel.id) {
          groupLabel.id = `checkbox-group-${Date.now()}`;
        }
        group.setAttribute('aria-labelledby', groupLabel.id);
      }
    }
  }

  handleInitialState() {
    // Handle indeterminate state from data attribute
    const indeterminate = this.input.getAttribute('data-indeterminate');
    if (indeterminate === 'true') {
      this.setIndeterminate(true);
    }

    // Handle loading state
    const loading = this.input.getAttribute('data-loading');
    if (loading === 'true') {
      this.setLoading(true);
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

    // Track interaction
    this.trackInteraction(this.input.checked ? 'check' : 'uncheck');

    // Handle group interactions
    this.handleGroupInteraction();
  }

  handleKeydown(event) {
    // Space key handling (already handled by browser, but for custom events)
    if (event.key === ' ') {
      // Let browser handle the default behavior
      setTimeout(() => {
        this.handleChange(event);
      }, 0);
    }
  }

  handleGroupInteraction() {
    const group = this.element.closest('.checkbox-group');
    if (!group) return;

    const checkboxes = group.querySelectorAll('.checkbox-field__input');
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

    // Run custom validation rules
    for (const rule of this.validationRules) {
      if (!rule.validate()) {
        isValid = false;
        errorMessage = rule.message;
        break;
      }
    }

    // Update UI
    this.setError(isValid ? '' : errorMessage);
    this.input.setAttribute('aria-invalid', isValid ? 'false' : 'true');

    return isValid;
  }

  trackInteraction(action) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'checkbox_interaction', {
        event_category: 'Form',
        event_label: this.input.name || 'unnamed_checkbox',
        action: action,
        checked: this.input.checked
      });
    }

    // Custom analytics event
    const analyticsEvent = new CustomEvent('checkbox:analytics', {
      detail: {
        action: action,
        name: this.input.name,
        value: this.input.value,
        checked: this.input.checked,
        element: this.element
      },
      bubbles: true
    });
    
    document.dispatchEvent(analyticsEvent);
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
      this.element.classList.add('checkbox-field--indeterminate');
    } else {
      this.element.classList.remove('checkbox-field--indeterminate');
    }
  }

  setLoading(loading) {
    if (loading) {
      this.box.classList.add('checkbox-field__box--loading');
      this.input.disabled = true;
      this.element.classList.add('checkbox-field--loading');
    } else {
      this.box.classList.remove('checkbox-field__box--loading');
      this.input.disabled = this.input.hasAttribute('disabled');
      this.element.classList.remove('checkbox-field--loading');
    }
  }

  setError(message) {
    if (this.errorElement) {
      if (message) {
        this.errorElement.textContent = message;
        this.errorElement.style.display = 'block';
        this.element.classList.add('checkbox-field--error');
      } else {
        this.errorElement.style.display = 'none';
        this.element.classList.remove('checkbox-field--error');
      }
    }
  }

  setDisabled(disabled) {
    this.input.disabled = disabled;
    if (disabled) {
      this.element.classList.add('checkbox-field--disabled');
    } else {
      this.element.classList.remove('checkbox-field--disabled');
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
    const checkboxElements = this.group.querySelectorAll('.checkbox-field');
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
      const selectAllComponent = selectAllCheckbox.closest('.checkbox-field').checkboxComponent;
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

// Auto-initialize checkboxes
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize individual checkboxes
    const checkboxes = document.querySelectorAll('.checkbox-field');
    checkboxes.forEach(checkbox => {
      if (!checkbox.checkboxComponent) {
        checkbox.checkboxComponent = new CheckboxComponent(checkbox);
      }
    });

    // Initialize checkbox groups
    const groups = document.querySelectorAll('.checkbox-group');
    groups.forEach(group => {
      if (!group.checkboxGroupManager) {
        group.checkboxGroupManager = new CheckboxGroupManager(group);
      }
    });

    // Handle "select all" functionality
    document.addEventListener('checkbox:change', (event) => {
      const checkbox = event.target.closest('.checkbox-field');
      const input = checkbox.querySelector('.checkbox-field__input');
      
      if (input.hasAttribute('data-select-all')) {
        const group = checkbox.closest('.checkbox-group');
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
}

// Auto-init function for manual initialization
const initCheckbox = () => {
  // Initialize individual checkboxes
  const checkboxes = document.querySelectorAll('.checkbox-field');
  checkboxes.forEach(checkbox => {
    if (!checkbox.checkboxComponent) {
      checkbox.checkboxComponent = new CheckboxComponent(checkbox);
    }
  });

  // Initialize checkbox groups
  const groups = document.querySelectorAll('.checkbox-group');
  groups.forEach(group => {
    if (!group.checkboxGroupManager) {
      group.checkboxGroupManager = new CheckboxGroupManager(group);
    }
  });
};

// Export both the classes and the init function
export { CheckboxComponent, CheckboxGroupManager, initCheckbox };
