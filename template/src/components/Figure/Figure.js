// Figure JavaScript functionality
// Handles lazy loading, error states, and progressive enhancement

document.addEventListener('DOMContentLoaded', function() {
  const figures = document.querySelectorAll('.ast-figure');
  
  figures.forEach(figure => {
    const img = figure.querySelector('.ast-figure__img');
    const caption = figure.querySelector('.ast-figure__caption');
    
    if (!img) return;
    
    // Handle image load success
    img.addEventListener('load', function() {
      figure.classList.add('ast-figure--loaded');
      
      // Add accessibility attributes
      if (caption) {
        const captionId = `caption-${Math.random().toString(36).substr(2, 9)}`;
        caption.id = captionId;
        img.setAttribute('aria-describedby', captionId);
      }
    });
    
    // Handle image load errors
    img.addEventListener('error', function() {
      figure.classList.add('ast-figure--error');
      img.classList.add('ast-figure__img--error');
      
      const fallbackSrc = img.dataset.fallback;
      if (fallbackSrc && img.src !== fallbackSrc) {
        img.src = fallbackSrc;
      } else {
        // Show error state
        img.alt = `Failed to load image: ${img.alt || 'No description provided'}`;
      }
    });
    
    // Progressive enhancement for placeholder
    if (img.dataset.placeholder === 'true') {
      figure.classList.add('ast-figure--placeholder');
    }
  });
});

export { };
