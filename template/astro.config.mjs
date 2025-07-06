// @ts-check
import { defineConfig } from 'astro/config'
import siteConfig from './site.config.js'

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
  build: {
    format: 'file',
    assets: 'assets'
  },
  vite: {
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
      sourcemap: true,
      cssCodeSplit: false,
      assetsDir: '',
      rollupOptions: {
        // Don't try to bundle main.js through Vite - let it be handled separately
        output: {
          entryFileNames: '_astro/[name].js',
          chunkFileNames: '_astro/[name].js',
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name][extname]'
            if (assetInfo.name.endsWith('.css')) {
              return '[name][extname]' // Keep CSS next to HTML
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return 'fonts/[name][extname]'
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