// Swiper initialization script
window.initializeSwiper = function(id, config) {
  function init() {
    if (window.Swiper && document.getElementById(id)) {
      try {
        const swiper = new window.Swiper(`#${id}`, {
          ...config,
          a11y: {
            enabled: true,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
          },
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
        });
        console.log('Swiper initialized:', id);
        return swiper;
      } catch (error) {
        console.error('Swiper init error:', error);
      }
    } else {
      console.warn('Swiper not ready, retrying...', {
        swiper: !!window.Swiper,
        element: !!document.getElementById(id)
      });
      setTimeout(init, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};
