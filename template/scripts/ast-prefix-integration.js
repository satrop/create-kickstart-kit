/**
 * Astro integration to add "ast-" prefix to HTML class attributes
 * This works with the Vite plugin to ensure both HTML and CSS are prefixed
 */

export function astPrefixIntegration(options = {}) {
  const {
    prefix = 'ast-',
    ignoreClasses = [ 'swiper',],
    ignorePatterns = [
      /^astro-/, // Astro's own classes
      // /^layout-/, // Layout utility classes
      // /^site-/, // Site-wide classes
      // /^demo-/, // Demo page classes
      // /^owl-/, // Spacing utility classes
      // /^col-/, // Grid system classes
      // /^md:/, // Responsive prefixes
      // /^lg:/, // Responsive prefixes
      // /^bg-/, // Background utility classes
      // /^text-/, // Text utility classes
      // /^font-/, // Font utility classes
      // /^leading-/, // Line height utility classes
      // /^tracking-/, // Letter spacing utility classes
    ]
  } = options

  // Function to check if a class should be prefixed
  function shouldPrefixClass(className) {
    // Skip if already prefixed
    if (className.startsWith(prefix)) return false
    
    // Skip if in ignore list
    if (ignoreClasses.includes(className)) return false
    
    // Skip if matches ignore patterns
    if (ignorePatterns.some(pattern => pattern.test(className))) return false
    
    return true
  }

  // Function to prefix a class name
  function prefixClass(className) {
    return shouldPrefixClass(className) ? `${prefix}${className}` : className
  }

  // Function to process HTML content
  function processHTML(html) {
    return html.replace(/class="([^"]*)"/g, (match, classValue) => {
      const classes = classValue.split(/\s+/).filter(Boolean)
      const prefixedClasses = classes.map(prefixClass)
      const result = `class="${prefixedClasses.join(' ')}"`
      
      // Log if we made changes
      if (result !== match) {
      }
      
      return result
    })
  }

  // Function to process CSS content
  function processCSS(css) {
    
    return css.replace(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g, (match, className) => {
      const prefixedClassName = prefixClass(className)
      const result = `.${prefixedClassName}`
      
      // Log if we made changes
      if (result !== match) {
      }
      
      return result
    })
  }

  return {
    name: 'ast-prefix-integration',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        
        const fs = await import('fs')
        const path = await import('path')
        
        // Process all HTML files
        for (const page of pages) {
          // Handle root page (empty pathname) and other pages
          const pagePath = page.pathname === '' || page.pathname === '/' ? 'index' : page.pathname.replace(/\/$/, '')
          const filePath = path.resolve(dir.pathname, pagePath + '.html')
          
          try {
            if (fs.existsSync(filePath)) {
              
              const content = fs.readFileSync(filePath, 'utf8')
              const processedContent = processHTML(content)
              
              if (content !== processedContent) {
                fs.writeFileSync(filePath, processedContent, 'utf8')
              } else {
              }
            } else {
            }
          } catch (error) {
            console.error(`[ast-prefix-integration] Error processing ${page.pathname}:`, error.message)
          }
        }
        
        // Process all CSS files
        try {
          const findCSSFiles = (dir) => {
            const cssFiles = []
            const items = fs.readdirSync(dir, { withFileTypes: true })
            
            for (const item of items) {
              const fullPath = path.join(dir, item.name)
              if (item.isDirectory()) {
                cssFiles.push(...findCSSFiles(fullPath))
              } else if (item.isFile() && item.name.endsWith('.css')) {
                cssFiles.push(fullPath)
              }
            }
            
            return cssFiles
          }
          
          const cssFiles = findCSSFiles(dir.pathname)
          
          for (const cssPath of cssFiles) {
            const relativePath = path.relative(dir.pathname, cssPath)
            
            const cssContent = fs.readFileSync(cssPath, 'utf8')
            const processedCSS = processCSS(cssContent)
            
            if (cssContent !== processedCSS) {
              fs.writeFileSync(cssPath, processedCSS, 'utf8')
            } else {
            }
          }
        } catch (error) {
          console.error('[ast-prefix-integration] Error processing CSS files:', error.message)
        }
        
      }
    }
  }
}
