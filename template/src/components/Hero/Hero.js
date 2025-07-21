/**
 * Hero Component JavaScript
 * Currently minimal - animations handled by external library
 */

// Auto-init function for consistency with other components
const initHero = () => {
  // Hero components are now purely CSS-based
  // Animation library handles intersection observer functionality
  const heroes = document.querySelectorAll('.ast-hero');
  heroes.forEach((hero) => {
    // Mark as initialized for consistency
    hero.heroInitialized = true;
  });
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHero);
} else {
  initHero();
}

// Export for manual initialization
export { initHero };
