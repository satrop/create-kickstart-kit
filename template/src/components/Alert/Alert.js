/**
 * Alert JavaScript functionality
 * Handles dismissible alerts, animations, and accessibility
 */

class AlertComponent {
  constructor(element) {
    this.element = element;
    this.closeButton = element.querySelector('.ast-alert__close');
    this.isDismissed = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAccessibility();
    this.animateIn();
  }

  setupEventListeners() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.dismiss();
      });

      // Keyboard support for close button
      this.closeButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.dismiss();
        }
      });
    }

    // Auto-dismiss after timeout (if specified)
    const autoDismiss = this.element.getAttribute('data-auto-dismiss');
    if (autoDismiss) {
      const timeout = parseInt(autoDismiss) || 5000;
      setTimeout(() => {
        if (!this.isDismissed) {
          this.dismiss();
        }
      }, timeout);
    }
  }

  setupAccessibility() {
    // Ensure proper ARIA attributes
    if (!this.element.getAttribute('role')) {
      this.element.setAttribute('role', 'alert');
    }

    // Add live region for dynamic alerts
    if (!this.element.getAttribute('aria-live')) {
      this.element.setAttribute('aria-live', 'polite');
    }

    // Add atomic attribute for screen readers
    if (!this.element.getAttribute('aria-atomic')) {
      this.element.setAttribute('aria-atomic', 'true');
    }

    // Focus management for important alerts
    const type = this.getAlertType();
    if (type === 'error' && this.element.getAttribute('data-focus') === 'true') {
      this.element.setAttribute('tabindex', '0');
      this.element.focus();
    }
  }

  animateIn() {
    // Add entering class for animation
    this.element.classList.add('ast-alert--entering');
    
    // Use requestAnimationFrame to ensure the class is applied
    requestAnimationFrame(() => {
      this.element.classList.remove('ast-alert--entering');
      this.element.classList.add('ast-alert--entered');
    });
  }

  dismiss() {
    if (this.isDismissed) return;
    
    this.isDismissed = true;
    
    // Custom event for dismiss
    const dismissEvent = new CustomEvent('alert:dismiss', {
      detail: { type: this.getAlertType(), element: this.element },
      bubbles: true
    });
    this.element.dispatchEvent(dismissEvent);

    // Animate out
    this.element.classList.add('ast-alert--exiting');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.element.parentNode) {
        this.element.remove();
      }
    }, 300);
  }

  getAlertType() {
    const classes = this.element.className.split(' ');
    const typeClass = classes.find(cls => cls.startsWith('ast-alert--') && cls !== 'ast-alert--entering' && cls !== 'ast-alert--entered' && cls !== 'ast-alert--exiting');
    return typeClass ? typeClass.replace('ast-alert--', '') : 'info';
  }

  // Public API methods
  show() {
    this.element.style.display = '';
    this.animateIn();
  }

  hide() {
    this.dismiss();
  }

  updateContent(content) {
    const contentElement = this.element.querySelector('.ast-alert__content') || this.element;
    if (this.closeButton) {
      // Update content while preserving close button
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      contentElement.innerHTML = '';
      while (tempDiv.firstChild) {
        contentElement.appendChild(tempDiv.firstChild);
      }
      contentElement.appendChild(this.closeButton);
    } else {
      contentElement.innerHTML = content;
    }
  }
}

// Alert Manager for programmatic alert creation
class AlertManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create alert container if it doesn't exist
    this.container = document.getElementById('alert-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'alert-container';
      this.container.className = 'alert-container';
      this.container.setAttribute('aria-live', 'polite');
      document.body.insertBefore(this.container, document.body.firstChild);
    }
  }

  create(options) {
    const {
      type = 'info',
      message = '',
      dismissible = true,
      autoDismiss = null,
      focus = false
    } = options;

    const alertElement = document.createElement('div');
    alertElement.className = `ast-alert ast-alert--${type}`;
    alertElement.setAttribute('role', 'alert');
    alertElement.innerHTML = message;

    if (dismissible) {
      const closeButton = document.createElement('button');
      closeButton.className = 'ast-alert__close';
      closeButton.setAttribute('aria-label', 'Close alert');
      closeButton.innerHTML = '×';
      alertElement.appendChild(closeButton);
    }

    if (autoDismiss) {
      alertElement.setAttribute('data-auto-dismiss', autoDismiss.toString());
    }

    if (focus) {
      alertElement.setAttribute('data-focus', 'true');
    }

    this.container.appendChild(alertElement);

    // Initialize the alert component
    const alertComponent = new AlertComponent(alertElement);
    alertElement.alertComponent = alertComponent;

    return alertComponent;
  }

  // Convenience methods
  info(message, options = {}) {
    return this.create({ ...options, type: 'info', message });
  }

  success(message, options = {}) {
    return this.create({ ...options, type: 'success', message });
  }

  warning(message, options = {}) {
    return this.create({ ...options, type: 'warning', message });
  }

  error(message, options = {}) {
    return this.create({ ...options, type: 'error', message, focus: true });
  }

  dismissAll() {
    const alerts = this.container.querySelectorAll('.ast-alert');
    alerts.forEach(alert => {
      if (alert.alertComponent) {
        alert.alertComponent.dismiss();
      }
    });
  }
}

// Auto-initialize existing alerts
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const alerts = document.querySelectorAll('.ast-alert');
    alerts.forEach(alert => {
      if (!alert.alertComponent) {
        alert.alertComponent = new AlertComponent(alert);
      }
    });
  });
}

// Auto-init function for manual initialization
const initAlert = () => {
  const alerts = document.querySelectorAll('.ast-alert');
  alerts.forEach(alert => {
    if (!alert.alertComponent) {
      alert.alertComponent = new AlertComponent(alert);
    }
  });
};

// Export both the classes and the init function
export { AlertComponent, AlertManager, initAlert };
