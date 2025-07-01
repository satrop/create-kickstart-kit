/**
 * InlineImage Component
 * 
 * A flexible inline image component that can be embedded within text content
 * with text wrapping around it. Supports left/right alignment and multiple sizes.
 * 
 * @example
 * ```astro
 * import { InlineImage } from '../components/InlineImage';
 * // or
 * import InlineImage from '../components/InlineImage';
 * 
 * <InlineImage 
 *   src="/images/example.jpg" 
 *   alt="Example image" 
 *   align="left" 
 *   size="medium"
 *   caption="This is an example image"
 * />
 * ```
 */

import InlineImageComponent from './InlineImage.astro';

// Export both named and default for flexibility
export { InlineImageComponent as InlineImage };
export default InlineImageComponent;
