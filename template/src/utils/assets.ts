/**
 * Asset Utilities
 * 
 * Helper functions for working with public assets in a way that respects
 * the configured base URL from site.config.js
 */

/**
 * Generate a properly formatted asset URL that respects the base path
 * @param path - Relative path to the asset (e.g., "images/hero.jpg")
 * @returns Full URL with base path included
 * 
 * @example
 * // Instead of: import.meta.env.BASE_URL + "images/hero.jpg"
 * // Use this: asset("images/hero.jpg")
 */
export const asset = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Ensure base URL ends with a slash
  const baseUrl = import.meta.env.BASE_URL;
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  
  return normalizedBase + cleanPath;
};

/**
 * Generate asset URLs for use in JavaScript objects (like Swiper slides)
 * @param paths - Array of asset paths
 * @returns Array of full URLs
 * 
 * @example
 * const imageUrls = assets(["images/slide1.jpg", "images/slide2.jpg"]);
 */
export const assets = (paths: string[]): string[] => {
  return paths.map(path => asset(path));
};
