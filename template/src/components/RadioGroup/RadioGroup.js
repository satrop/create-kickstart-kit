/**
 * RadioGroup JavaScript functionality
 * Handles enhanced interactions and accessibility features
 */

class RadioGroupComponent {
  constructor(element) {
    this.element = element;
    this.radioInputs = element.querySelectorAll('.radio-field__input');
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupChangeHandlers();
    this.setupAccessibility();
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard navigation for radio groups
    this.radioInputs.forEach((radio, index) => {
      radio.addEventListener('keydown', (e) => {
        this.handleKeydown(e, index);
      });
    });
  }

  handleKeydown(event, currentIndex) {
    const { key } = event;
    let targetIndex = currentIndex;

    switch (key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        targetIndex = this.getNextEnabledIndex(currentIndex);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        targetIndex = this.getPrevEnabledIndex(currentIndex);
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = this.getFirstEnabledIndex();
        break;
      case 'End':
        event.preventDefault();
        targetIndex = this.getLastEnabledIndex();
        break;
      default:
        return;
    }

    if (targetIndex !== -1) {
      this.radioInputs[targetIndex].focus();
      this.radioInputs[targetIndex].checked = true;
      this.dispatchChangeEvent(this.radioInputs[targetIndex]);
    }
  }

  getNextEnabledIndex(currentIndex) {
    for (let i = currentIndex + 1; i < this.radioInputs.length; i++) {
      if (!this.radioInputs[i].disabled) return i;
    }
    // Wrap to beginning
    for (let i = 0; i < currentIndex; i++) {
      if (!this.radioInputs[i].disabled) return i;
    }
    return -1;
  }

  getPrevEnabledIndex(currentIndex) {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!this.radioInputs[i].disabled) return i;
    }
    // Wrap to end
    for (let i = this.radioInputs.length - 1; i > currentIndex; i--) {
      if (!this.radioInputs[i].disabled) return i;
    }
    return -1;
  }

  getFirstEnabledIndex() {
    for (let i = 0; i < this.radioInputs.length; i++) {
      if (!this.radioInputs[i].disabled) return i;
    }
    return -1;
  }

  getLastEnabledIndex() {
    for (let i = this.radioInputs.length - 1; i >= 0; i--) {
      if (!this.radioInputs[i].disabled) return i;
    }
    return -1;
  }

  setupChangeHandlers() {
    this.radioInputs.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.handleChange(e);
      });
    });
  }

  handleChange(event) {
    const { target } = event;
    
    // Clear any previous error states when user makes a selection
    const errorElement = this.element.querySelector('.radio-group__error');
    if (errorElement && target.hasAttribute('aria-invalid')) {
      target.setAttribute('aria-invalid', 'false');
    }

    // Emit custom event for external handlers
    this.element.dispatchEvent(new CustomEvent('radiogroup:change', {
      detail: {
        value: target.value,
        name: target.name,
        element: target
      },
      bubbles: true
    }));
  }

  setupAccessibility() {
    // Ensure proper tabindex management
    this.updateTabIndex();
    
    // Listen for focus changes to update tabindex
    this.radioInputs.forEach(radio => {
      radio.addEventListener('focus', () => {
        this.updateTabIndex(radio);
      });
    });
  }

  updateTabIndex(focusedRadio = null) {
    // Only the checked radio (or first if none checked) should be tabbable
    const checkedRadio = Array.from(this.radioInputs).find(radio => radio.checked);
    const tabbableRadio = focusedRadio || checkedRadio || this.radioInputs[0];

    this.radioInputs.forEach(radio => {
      radio.tabIndex = radio === tabbableRadio ? 0 : -1;
    });
  }

  dispatchChangeEvent(radio) {
    // Programmatically trigger change event
    const changeEvent = new Event('change', { bubbles: true });
    radio.dispatchEvent(changeEvent);
  }

  // Public methods for external control
  setValue(value) {
    const targetRadio = Array.from(this.radioInputs).find(radio => radio.value === value);
    if (targetRadio && !targetRadio.disabled) {
      targetRadio.checked = true;
      this.updateTabIndex(targetRadio);
      this.dispatchChangeEvent(targetRadio);
    }
  }

  getValue() {
    const checkedRadio = Array.from(this.radioInputs).find(radio => radio.checked);
    return checkedRadio ? checkedRadio.value : null;
  }

  setError(hasError = true) {
    this.radioInputs.forEach(radio => {
      radio.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    });
  }
}

// Auto-initialize RadioGroup components
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const radioGroupElements = document.querySelectorAll('[data-component="radio-group"]');
    radioGroupElements.forEach(element => {
      if (!element.radioGroupComponent) {
        element.radioGroupComponent = new RadioGroupComponent(element);
      }
    });
  });
}

// Auto-init function for manual initialization
const initRadioGroup = () => {
  const radioGroupElements = document.querySelectorAll('[data-component="radio-group"]');
  radioGroupElements.forEach(element => {
    if (!element.radioGroupComponent) {
      element.radioGroupComponent = new RadioGroupComponent(element);
    }
  });
};

// Export both the class and the init function
export { RadioGroupComponent, initRadioGroup };
