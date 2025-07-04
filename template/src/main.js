/**
 * Main JavaScript entry point
 * Imports and initializes all interactive components
 */

// Import component init functions
import { initButton } from './components/Button/Button.js';
import { initAccordion } from './components/Accordion/Accordion.js';
import { initAlert } from './components/Alert/Alert.js';
import { initCard } from './components/Card/Card.js';
import { initCheckbox } from './components/Checkbox/Checkbox.js';
import { initDialog } from './components/Dialog/Dialog.js';
import { initFiftyFifty } from './components/FiftyFifty/FiftyFifty.js';
import { initFormField } from './components/FormField/FormField.js';
import { initRadioGroup } from './components/RadioGroup/RadioGroup.js';
import { initSelect } from './components/Select/Select.js';
import { initSwiper } from './components/Swiper/Swiper.js';
import { initTextarea } from './components/Textarea/Textarea.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initButton();
  initAccordion();
  initAlert();
  initCard();
  initCheckbox();
  initDialog();
  initFiftyFifty();
  initFormField();
  initRadioGroup();
  initSelect();
  initSwiper();
  initTextarea();
});