import path from 'path'
import webfont from 'webfont'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function buildIcons() {
  try {
    // Read webfont config from package.json
    const packageJsonPath = path.resolve(__dirname, '..', 'package.json')
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
    const webfontConfig = packageJson.webfont

    const result = await webfont({
      ...webfontConfig,
      files: path.resolve('./public/icons/optimized/*.svg'),
      glyphTransformFn: (obj) => {
        // Remove double "icon-" prefix if it exists
        obj.name = obj.name.replace(/^icon-/, '')
        return obj
      },
    })

    // Write font files and CSS to disk
    const dest = path.resolve('./public/icons/font')

    // Write each generated file
    await fs.mkdir(dest, { recursive: true })

    await Promise.all(
      Object.entries(result).map(async ([filename, content]) => {
        if (filename === 'woff' || filename === 'woff2' || filename.endsWith('.css')) {
          const filePath = path.join(dest, `font-icons.${filename.replace('woff', 'woff')}`)
          await fs.writeFile(filePath, content)
        }
      })
    )

    console.log('Icons built successfully!')
  } catch (err) {
    console.error('Error building icons:', err)
    process.exit(1)
  }
}

buildIcons()