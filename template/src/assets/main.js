/**
 * Main JavaScript entry point
 * Imports and initializes all interactive components
 */

// Import global utilities
import '../utils/imageHandler.js';

// Import component init functions
import { initButton } from '../components/Button/Button.js';
import { initAccordion } from '../components/Accordion/Accordion.js';
import { initAlert } from '../components/Alert/Alert.js';
import { initCard } from '../components/Card/Card.js';
import { initCheckbox } from '../components/Checkbox/Checkbox.js';
import { initDialog } from '../components/Dialog/Dialog.js';
import { initFormField } from '../components/FormField/FormField.js';
import { initNavigation } from '../components/StandardNavigation/Navigation.js';
import { initMegaNavigation } from '../components/MegaNavigation/MegaNavigation.js';
import { initMobileNavigation } from '../components/MegaNavigation/MobileNavigation.js';
import { initRadioGroup } from '../components/RadioGroup/RadioGroup.js';
import { initSelect } from '../components/Select/Select.js';
import { initMainSlider } from '../components/Slider/Slider.js';
import { initTable } from '../components/Table/Table.js';
import { initTextarea } from '../components/Textarea/Textarea.js';

// Initialize all components
function initializeApp() {
  initButton();
  initAccordion();
  initAlert();
  initCard();
  initCheckbox();
  initDialog();
  initFormField();
  initNavigation();
  initMegaNavigation();
  initMobileNavigation();
  initRadioGroup();
  initSelect();
  initMainSlider();
  initTable();
  initTextarea();
}

document.addEventListener('DOMContentLoaded', initializeApp);

// Export for manual initialization if needed
export default initializeApp;
