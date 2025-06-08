// @ts-check
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'url'
import path from 'path'

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@shoelace-style': fileURLToPath(new URL('./node_modules/@shoelace-style', import.meta.url))
      }
    }
  }
})
