import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import fs from 'fs';

async function buildMainJS() {
  try {
    console.log('Building main.js bundle...');
    
    // Create rollup bundle
    const bundle = await rollup({
      input: './src/assets/main.js',
      plugins: [
        nodeResolve({
          browser: true,
          preferBuiltins: false
        })
      ]
    });

    // Generate the bundle
    const { output } = await bundle.generate({
      format: 'es',
      file: 'main.js'
    });

    // Ensure dist directory exists
    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist', { recursive: true });
    }

    // Write the bundle to dist/main.js
    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === 'chunk') {
        fs.writeFileSync('./dist/main.js', chunkOrAsset.code);
        console.log('✓ main.js built successfully');
      }
    }

    await bundle.close();
  } catch (error) {
    console.error('Error building main.js:', error);
    process.exit(1);
  }
}

buildMainJS();
