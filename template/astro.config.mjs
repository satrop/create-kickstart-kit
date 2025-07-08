// @ts-check
import { defineConfig } from 'astro/config'
import siteConfig from './site.config.js'
import { astPrefixIntegration } from './scripts/ast-prefix-integration.js'

// Determine base path from configuration
const getBasePath = () => {
  // Allow environment variable override for advanced use cases
  if (process.env.ASTRO_BASE_URL) {
    return process.env.ASTRO_BASE_URL
  }
  
  // Use site.config.js settings
  if (typeof siteConfig.basePath === 'object') {
    // Environment-specific paths - check for production build
    const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('build')
    return isProduction 
      ? siteConfig.basePath.production 
      : siteConfig.basePath.development
  } else {
    // Single path for all environments
    return siteConfig.basePath
  }
}

const basePath = getBasePath()

export default defineConfig({
  base: basePath,
  publicDir: './public',
  trailingSlash: 'never',
  compressHTML: false,
  scopedStyleStrategy: 'class',
  integrations: [
    astPrefixIntegration({
      prefix: 'ast-',
      ignoreClasses: [
        'swiper-slide',
        'swiper-wrapper',
      ]
    })
  ],
  build: {
    format: 'file',
    assets: 'assets'
  },
  vite: {
    plugins: [],
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@styles': '/src/styles',
        '/main.js': '/src/assets/main.js',
        '/components/': '/src/components/'
      }
    },
    css: {
      devSourcemap: true
    },
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'main.css' // Force all CSS into one file
            }
            return 'assets/[name][extname]'
          }
        }
      }
    },
    server: {
      host: true,
      port: 4321,
      fs: {
        allow: ['..']
      },
      watch: {
        ignored: ['**/.git/**', '**/node_modules/**']
      },
      hmr: {
        clientPort: 4321
      }
    }
  }
})