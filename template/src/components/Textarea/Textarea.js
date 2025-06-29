/**
 * Textarea Component JavaScript
 * Handles character counting, auto-resize, and keyboard interactions
 */

class TextareaComponent {
  constructor(element) {
    this.element = element;
    this.textarea = element.querySelector('.textarea-field__textarea');
    this.counter = element.querySelector('.textarea-field__counter');
    this.counterCurrent = element.querySelector('.textarea-field__counter-current');
    this.counterMax = element.querySelector('.textarea-field__counter-max');
    
    this.init();
  }

  init() {
    if (this.textarea) {
      this.setupCharacterCount();
      this.setupAutoResize();
      this.setupKeyboardHandlers();
      
      // Initial setup
      this.updateCharacterCount();
      if (this.textarea.dataset.autoResize === 'true') {
        this.adjustHeight();
      }
    }
  }

  setupCharacterCount() {
    if (!this.counter || !this.counterCurrent) return;

    this.textarea.addEventListener('input', () => {
      this.updateCharacterCount();
    });

    this.textarea.addEventListener('paste', () => {
      // Slight delay to allow paste to complete
      setTimeout(() => {
        this.updateCharacterCount();
      }, 10);
    });
  }

  updateCharacterCount() {
    if (!this.counter || !this.counterCurrent) return;

    const currentLength = this.textarea.value.length;
    const maxLength = parseInt(this.textarea.getAttribute('maxlength'), 10);

    this.counterCurrent.textContent = currentLength;

    // Update counter styling based on character count
    this.counter.classList.remove('textarea-field__counter--warning', 'textarea-field__counter--error');
    
    if (maxLength) {
      const percentage = (currentLength / maxLength) * 100;
      
      if (percentage >= 100) {
        this.counter.classList.add('textarea-field__counter--error');
      } else if (percentage >= 80) {
        this.counter.classList.add('textarea-field__counter--warning');
      }
    }
  }

  setupAutoResize() {
    // Only enable if data attribute is set
    if (this.textarea.dataset.autoResize !== 'true') return;

    this.textarea.addEventListener('input', () => {
      this.adjustHeight();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      this.adjustHeight();
    });
  }

  adjustHeight() {
    if (this.textarea.dataset.autoResize !== 'true') return;

    // Reset height to auto to get the correct scrollHeight
    this.textarea.style.height = 'auto';
    
    // Set height based on scroll height
    const scrollHeight = this.textarea.scrollHeight;
    const minHeight = parseInt(window.getComputedStyle(this.textarea).minHeight, 10) || 80;
    const maxHeight = parseInt(this.textarea.dataset.maxHeight, 10) || 300;
    
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    this.textarea.style.height = `${newHeight}px`;
  }

  setupKeyboardHandlers() {
    this.textarea.addEventListener('keydown', (event) => {
      // Tab key handling for accessibility
      if (event.key === 'Tab' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        // Allow default tab behavior
        return;
      }

      // Escape key to blur
      if (event.key === 'Escape') {
        this.textarea.blur();
      }

      // Ctrl/Cmd + Enter to submit form (if in a form)
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        const form = this.textarea.closest('form');
        if (form) {
          event.preventDefault();
          const submitButton = form.querySelector('button[type="submit"], input[type="submit"]') || 
                              form.querySelector('button:not([type])');
          if (submitButton) {
            submitButton.click();
          }
        }
      }
    });
  }

  // Public methods for external control
  focus() {
    this.textarea.focus();
  }

  blur() {
    this.textarea.blur();
  }

  getValue() {
    return this.textarea.value;
  }

  setValue(value) {
    this.textarea.value = value;
    this.updateCharacterCount();
    if (this.textarea.dataset.autoResize === 'true') {
      this.adjustHeight();
    }
  }

  clear() {
    this.setValue('');
    this.textarea.focus();
  }

  disable() {
    this.textarea.disabled = true;
  }

  enable() {
    this.textarea.disabled = false;
  }

  destroy() {
    // Remove event listeners and cleanup
    if (this.textarea) {
      this.textarea.removeEventListener('input', this.updateCharacterCount);
      this.textarea.removeEventListener('input', this.adjustHeight);
    }
  }
}

// Auto-initialize all textarea components
document.addEventListener('DOMContentLoaded', () => {
  const textareas = document.querySelectorAll('[data-component="textarea"]');
  textareas.forEach(textarea => {
    if (!textarea.textareaComponent) {
      textarea.textareaComponent = new TextareaComponent(textarea);
    }
  });
});

// Initialize dynamically added textareas
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        const textareas = node.matches('[data-component="textarea"]') 
          ? [node] 
          : node.querySelectorAll('[data-component="textarea"]');
        
        textareas.forEach(textarea => {
          if (!textarea.textareaComponent) {
            textarea.textareaComponent = new TextareaComponent(textarea);
          }
        });
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TextareaComponent;
} else if (typeof define === 'function' && define.amd) {
  define([], () => TextareaComponent);
} else if (typeof window !== 'undefined') {
  window.TextareaComponent = TextareaComponent;
}
