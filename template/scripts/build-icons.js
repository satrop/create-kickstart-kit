import path from 'path'
import webfont from 'webfont'

async function buildIcons() {
  try {
    const result = await webfont({
      files: path.resolve('./public/icons/optimized/*.svg'),
      fontName: 'font-icons',
      formats: ['woff2', 'woff'],
      normalize: true,
      fontHeight: 1000,
      centerHorizontally: true,
      round: 1e13,
      prependUnicode: true,
      sort: false,
      glyphTransformFn: (obj) => {
        // Remove double "icon-" prefix if it exists
        obj.name = obj.name.replace(/^icon-/, '')
        return obj
      },
      template: 'css',
      templateClassName: 'icon',
      templateFontPath: './',
    })

    // Write font files and CSS to disk
    // Import fs/promises to write files
    const fs = await import('fs/promises')
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