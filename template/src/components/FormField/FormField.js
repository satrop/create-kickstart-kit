/**
 * FormField Component JavaScript
 * Currently handles basic form field functionality
 * Can be extended for validation, formatting, etc.
 */

class FormFieldManager {
  constructor() {
    this.init();
  }

  init() {
    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupFormFields();
      });
    }
  }

  setupFormFields() {
    const formFields = document.querySelectorAll('.form-field');
    
    formFields.forEach(field => {
      this.setupField(field);
    });
  }

  setupField(fieldContainer) {
    const input = fieldContainer.querySelector('.form-field__input');
    
    if (!input) return;

    // Add future enhancements here:
    // - Real-time validation
    // - Input formatting (phone numbers, etc.)
    // - Character counting
    // - Custom validation messages
  }

  // Public API for future enhancements
  validateField(fieldName) {
    // Future: Add validation logic
  }

  clearErrors(fieldName) {
    // Future: Clear error states
  }

  setError(fieldName, errorMessage) {
    // Future: Set error states dynamically
  }
}

// Auto-initialize form fields
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const formFields = document.querySelectorAll('.form-field');
    formFields.forEach(field => {
      if (!field.formFieldManager) {
        field.formFieldManager = new FormFieldManager();
      }
    });
  });
}

// Auto-init function for manual initialization
const initFormField = () => {
  const formFields = document.querySelectorAll('.form-field');
  formFields.forEach(field => {
    if (!field.formFieldManager) {
      field.formFieldManager = new FormFieldManager();
    }
  });
};

// Export both the class and the init function
export { FormFieldManager, initFormField };
