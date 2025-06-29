// @ts-check
import { defineConfig } from 'astro/config'

export default defineConfig({
  base: '',
  publicDir: './public',
  trailingSlash: 'never',
  compressHTML: false,
  build: {
    format: 'file',
    assets: '_assets',
    assetsPrefix: '.'
  },
  vite: {
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@styles': '/src/styles',
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
        output: {
          entryFileNames: '_js/[name].js',
          chunkFileNames: '_js/[name].js',
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return '_assets/[name][extname]'
            if (assetInfo.name.endsWith('.css')) {
              return '[name][extname]' // Keep CSS next to HTML
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return '_fonts/[name][extname]'
            }
            return '_assets/[name][extname]'
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