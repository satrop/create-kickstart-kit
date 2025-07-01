/**
 * Site Configuration
 * 
 * This is the SINGLE place to configure your site's base URL/path.
 * Update this file when deploying to different servers or changing project paths.
 * 
 * Examples:
 * - Local development: '/'
 * - Nested server: '/html_templates/my-project/'
 * - Different server structure: '/clients/project-name/'
 * - Root deployment: '/'
 */

const SITE_CONFIG = {
  // Set your base path here - this is where your site will be served from
  // Always include leading and trailing slashes for nested paths
  // Use '/' for root deployment
  basePath: {
    development: '/',                    // Local development (usually root)
    production: '/html_templates/ksp/'   // Production/staging server path
  },
  
  // Alternative: Use a single path for all environments
  // Uncomment the line below and comment out the basePath object above
  // basePath: '/html_templates/ksp/',
  
  // Project info (optional - for documentation)
  project: {
    name: 'Kickstart Template',
    version: '1.0.0'
  }
};

export default SITE_CONFIG;
