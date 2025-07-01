/**
 * Figure Component
 * 
 * A semantic figure component for displaying images with optional captions.
 * Uses proper HTML5 figure and figcaption elements for accessibility and SEO.
 * 
 * @example
 * ```astro
 * import { Figure } from '../components/Figure';
 * // or
 * import Figure from '../components/Figure';
 * 
 * <Figure 
 *   src="/images/chart.jpg" 
 *   alt="Sales data chart" 
 *   caption="Q4 sales performance showing 15% growth"
 *   size="large"
 *   align="center"
 * />
 * ```
 */

import FigureComponent from './Figure.astro';

// Export both named and default for flexibility
export { FigureComponent as Figure };
export default FigureComponent;
