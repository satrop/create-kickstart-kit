
// Swiper.js initialization for the MainSlider component

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { SLIDER_BREAKPOINTS } from './slider.tokens.js';

class MainSlider {
  constructor(element) {
    this.element = element;
    this.swiper = null;
    this.init();
  }

  init() {
    const loopAttr = this.element.getAttribute('data-loop');
    const loop = loopAttr === null ? true : loopAttr === 'true';
    this.swiper = new Swiper(this.element, {
      modules: [Navigation, Pagination],
      loop,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        clickable: true,
      },
      breakpoints: SLIDER_BREAKPOINTS,
    });
  }
}

// Auto-initialize sliders
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.swiper');
    sliders.forEach(slider => {
      if (!slider.mainSlider) {
        slider.mainSlider = new MainSlider(slider);
      }
    });
  });
}

// Manual init function (optional)
const initMainSlider = () => {
  const sliders = document.querySelectorAll('.swiper');
  sliders.forEach(slider => {
    if (!slider.mainSlider) {
      slider.mainSlider = new MainSlider(slider);
    }
  });
};

export { MainSlider, initMainSlider };
