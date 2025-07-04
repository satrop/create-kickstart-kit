/**
 * Dialog Component JavaScript
 * Handles accessibility, focus management, and user interactions
 */

class DialogManager {
  constructor() {
    this.activeDialog = null;
    this.previousFocus = null;
    this.focusableElements = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(',');
    
    this.init();
  }

  init() {
    if (typeof document !== 'undefined') {
      // Initialize all dialogs on page load
      document.addEventListener('DOMContentLoaded', () => {
        this.setupDialogs();
      });

      // Handle dynamic content
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches('[data-dialog]')) {
                this.setupDialog(node);
              }
              // Check for dialogs in added subtree
              const dialogs = node.querySelectorAll('[data-dialog]');
              dialogs.forEach(dialog => this.setupDialog(dialog));
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    }
  }

  setupDialogs() {
    const dialogs = document.querySelectorAll('[data-dialog]');
    dialogs.forEach(dialog => this.setupDialog(dialog));
  }

  setupDialog(dialog) {
    const dialogId = dialog.dataset.dialog;
    const backdrop = document.querySelector(`[data-dialog-backdrop="${dialogId}"]`);
    
    if (!backdrop) return;

    // Set up event listeners
    this.setupTriggers(dialogId);
    this.setupCloseButtons(dialogId);
    this.setupBackdropClick(backdrop, dialog);
    this.setupKeyboardHandlers(dialog);
  }

  setupTriggers(dialogId) {
    // Find all elements that trigger this dialog
    const triggers = document.querySelectorAll(`[data-dialog-trigger="${dialogId}"]`);
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDialog(dialogId);
      });
    });
  }

  setupCloseButtons(dialogId) {
    const closeButtons = document.querySelectorAll(`[data-dialog-close="${dialogId}"]`);
    
    closeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeDialog(dialogId);
      });
    });
  }

  setupBackdropClick(backdrop, dialog) {
    const closeOnOutside = dialog.dataset.closeOutside !== 'false';
    
    if (closeOnOutside) {
      backdrop.addEventListener('click', (e) => {
        // Only close if clicking the backdrop, not the dialog itself
        if (e.target === backdrop) {
          this.closeDialog(dialog.dataset.dialog);
        }
      });
    }
  }

  setupKeyboardHandlers(dialog) {
    const dialogId = dialog.dataset.dialog;
    const closeOnEscape = dialog.dataset.closeEscape !== 'false';
    
    dialog.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Escape':
          if (closeOnEscape) {
            e.preventDefault();
            this.closeDialog(dialogId);
          }
          break;
        case 'Tab':
          this.handleTabKey(e, dialog);
          break;
      }
    });
  }

  openDialog(dialogId) {
    const dialog = document.querySelector(`[data-dialog="${dialogId}"]`);
    const backdrop = document.querySelector(`[data-dialog-backdrop="${dialogId}"]`);
    
    if (!dialog || !backdrop) return;

    // Store the currently focused element
    this.previousFocus = document.activeElement;
    
    // Prevent body scroll
    this.preventBodyScroll(true);
    
    // Show the dialog
    backdrop.setAttribute('aria-hidden', 'false');
    backdrop.style.display = 'flex';
    
    // Set active dialog
    this.activeDialog = dialog;
    
    // Focus management
    this.setInitialFocus(dialog);
    
    // Announce to screen readers
    this.announceDialog(dialog);
    
    // Trigger custom event
    dialog.dispatchEvent(new CustomEvent('dialog:open', {
      detail: { dialogId },
      bubbles: true
    }));
  }

  closeDialog(dialogId) {
    const dialog = document.querySelector(`[data-dialog="${dialogId}"]`);
    const backdrop = document.querySelector(`[data-dialog-backdrop="${dialogId}"]`);
    
    if (!dialog || !backdrop) return;

    // Hide the dialog
    backdrop.setAttribute('aria-hidden', 'true');
    
    // Use animation end to actually hide
    const handleAnimationEnd = () => {
      backdrop.style.display = 'none';
      backdrop.removeEventListener('transitionend', handleAnimationEnd);
    };
    
    backdrop.addEventListener('transitionend', handleAnimationEnd);
    
    // Restore body scroll
    this.preventBodyScroll(false);
    
    // Restore focus
    this.restoreFocus();
    
    // Clear active dialog
    this.activeDialog = null;
    
    // Trigger custom event
    dialog.dispatchEvent(new CustomEvent('dialog:close', {
      detail: { dialogId },
      bubbles: true
    }));
  }

  handleTabKey(e, dialog) {
    const focusableElements = this.getFocusableElements(dialog);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  getFocusableElements(container) {
    const elements = container.querySelectorAll(this.focusableElements);
    return Array.from(elements).filter(el => {
      return !el.disabled && 
             !el.getAttribute('aria-hidden') && 
             el.offsetParent !== null;
    });
  }

  setInitialFocus(dialog) {
    // Priority order for initial focus:
    // 1. Element with autofocus
    // 2. First input/textarea
    // 3. First focusable element
    // 4. Dialog itself
    
    const autofocusElement = dialog.querySelector('[autofocus]');
    if (autofocusElement) {
      autofocusElement.focus();
      return;
    }
    
    const firstInput = dialog.querySelector('input, textarea');
    if (firstInput && !firstInput.disabled) {
      firstInput.focus();
      return;
    }
    
    const focusableElements = this.getFocusableElements(dialog);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return;
    }
    
    // Fallback to dialog itself
    dialog.focus();
  }

  restoreFocus() {
    if (this.previousFocus && typeof this.previousFocus.focus === 'function') {
      // Small delay to ensure dialog is fully closed
      setTimeout(() => {
        try {
          this.previousFocus.focus();
        } catch (e) {
          // Element might not be focusable anymore, fallback to body
          document.body.focus();
        }
      }, 100);
    }
    this.previousFocus = null;
  }

  preventBodyScroll(prevent) {
    if (prevent) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('dialog-open');
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('dialog-open');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }

  announceDialog(dialog) {
    // Create a live region announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    
    const title = dialog.querySelector('.dialog__title');
    const announcementText = title 
      ? `Dialog opened: ${title.textContent}`
      : 'Dialog opened';
    
    announcement.textContent = announcementText;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Public API methods
  open(dialogId) {
    this.openDialog(dialogId);
  }

  close(dialogId) {
    this.closeDialog(dialogId);
  }

  closeAll() {
    const openBackdrops = document.querySelectorAll('[data-dialog-backdrop][aria-hidden="false"]');
    openBackdrops.forEach(backdrop => {
      const dialogId = backdrop.dataset.dialogBackdrop;
      this.closeDialog(dialogId);
    });
  }

  isOpen(dialogId) {
    const backdrop = document.querySelector(`[data-dialog-backdrop="${dialogId}"]`);
    return backdrop && backdrop.getAttribute('aria-hidden') === 'false';
  }
}

// Auto-initialize dialogs
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const dialogs = document.querySelectorAll('[data-dialog]');
    dialogs.forEach(dialog => {
      if (!dialog.dialogManager) {
        dialog.dialogManager = new DialogManager();
      }
    });
  });
}

// Auto-init function for manual initialization
const initDialog = () => {
  const dialogs = document.querySelectorAll('[data-dialog]');
  dialogs.forEach(dialog => {
    if (!dialog.dialogManager) {
      dialog.dialogManager = new DialogManager();
    }
  });
};

// Export both the class and the init function
export { DialogManager, initDialog };
