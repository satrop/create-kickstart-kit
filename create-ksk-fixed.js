#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import prompts from 'prompts';

const CLI_VERSION = '2.0.0';

console.log(`🚀 Welcome to create-ksk v${CLI_VERSION}`);

async function main() {
  const projectName = process.argv[2];
  
  if (!projectName) {
    console.error('❌ Please provide a project name:');
    console.log('  npm create ksk my-project');
    console.log('  pnpm create ksk my-project');
    process.exit(1);
  }

  // Interactive prompts
  const responses = await prompts([
    {
      type: 'confirm',
      name: 'useTypeScript',
      message: 'Use TypeScript?',
      initial: true
    },
    {
      type: 'confirm',
      name: 'includeDemoPages',
      message: 'Include demo pages for components?',
      initial: true
    },
    {
      type: 'select',
      name: 'packageManager',
      message: 'Which package manager?',
      choices: [
        { title: 'pnpm (recommended)', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' }
      ],
      initial: 0
    }
  ]);

  if (!responses.useTypeScript && !responses.includeDemoPages && !responses.packageManager) {
    console.log('👋 Setup cancelled');
    process.exit(0);
  }

  const projectDir = path.resolve(projectName);
  
  console.log(`📁 Creating project in ./${projectName}...`);
  
  try {
    await fs.mkdir(projectDir, { recursive: true });
    
    // Create package.json
    const packageJson = {
      name: projectName,
      version: '0.1.0',
      type: 'module',
      scripts: {
        dev: 'astro dev',
        build: 'astro build',
        preview: 'astro preview',
        astro: 'astro'
      },
      dependencies: {
        'ksk': '0.0.0-alpha.0',
        astro: '^5.12.1',
        'sass-embedded': '^1.89.2'
      }
    };

    if (responses.useTypeScript) {
      packageJson.dependencies.typescript = '^5.8.3';
      packageJson.devDependencies = {
        '@astrojs/check': '^0.9.4'
      };
    }

    await fs.writeFile(
      path.join(projectDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create astro.config.mjs
    const astroConfig = `import { defineConfig } from 'astro/config';

export default defineConfig({
  // Astro configuration
});
`;
    await fs.writeFile(path.join(projectDir, 'astro.config.mjs'), astroConfig);

    // Create tsconfig.json if TypeScript
    if (responses.useTypeScript) {
      const tsConfig = {
        extends: 'astro/tsconfigs/strict',
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*']
          }
        }
      };
      await fs.writeFile(
        path.join(projectDir, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
      );
    }

    // Create src directory structure
    await fs.mkdir(path.join(projectDir, 'src', 'pages'), { recursive: true });
    await fs.mkdir(path.join(projectDir, 'public'), { recursive: true });

    // Create main layout
    const layoutContent = `---
import 'ksk/src/styles/main.scss';
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>KSK Project</title>
  </head>
  <body>
    <slot />
  </body>
</html>
`;

    await fs.mkdir(path.join(projectDir, 'src', 'layouts'), { recursive: true });
    await fs.writeFile(
      path.join(projectDir, 'src', 'layouts', 'Layout.astro'),
      layoutContent
    );

    // Create index page
    let indexContent;
    if (responses.includeDemoPages) {
      indexContent = `---
import Layout from '../layouts/Layout.astro';
import Button from 'ksk/src/components/Button/Button.astro';
import Card from 'ksk/src/components/Card/Card.astro';
---

<Layout>
  <main>
    <h1>🚀 Welcome to your KSK project!</h1>
    <p>Start building with the KSK design system components:</p>
    
    <section class="demo-section">
      <h2>Buttons</h2>
      <Button variant="primary" size="medium">Primary Button</Button>
      <Button variant="secondary" size="medium">Secondary Button</Button>
    </section>

    <section class="demo-section">
      <h2>Cards</h2>
      <Card>
        <h3>Sample Card</h3>
        <p>This is a card component from the KSK design system.</p>
      </Card>
    </section>
  </main>

  <style>
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .demo-section {
      margin: 2rem 0;
    }
    
    .demo-section > * + * {
      margin-top: 1rem;
    }
  </style>
</Layout>
`;
    } else {
      indexContent = `---
import Layout from '../layouts/Layout.astro';
import Button from 'ksk/src/components/Button/Button.astro';
---

<Layout>
  <main>
    <h1>🚀 Welcome to your KSK project!</h1>
    <p>Start building with the KSK design system:</p>
    
    <Button variant="primary" size="medium">Get Started</Button>
  </main>

  <style>
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
  </style>
</Layout>
`;
    }

    await fs.writeFile(
      path.join(projectDir, 'src', 'pages', 'index.astro'),
      indexContent
    );

    // Create favicon
    const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <text y="1.2em" font-size="96">🚀</text>
</svg>`;
    await fs.writeFile(path.join(projectDir, 'public', 'favicon.svg'), faviconSvg);

    // Create README
    const readmeContent = `# ${projectName}

A new project created with [KSK](https://www.npmjs.com/package/ksk).

## 🚀 Getting Started

1. Install dependencies:
   \`\`\`bash
   ${responses.packageManager} install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   ${responses.packageManager} run dev
   \`\`\`

3. Open [http://localhost:4321](http://localhost:4321) to see your project.

## 📚 Using KSK Components

Import components from the KSK design system:

\`\`\`astro
---
import Button from 'ksk/src/components/Button/Button.astro';
import Card from 'ksk/src/components/Card/Card.astro';
// ... other components
---

<Button variant="primary" size="medium">
  Click me!
</Button>
\`\`\`

## 🎨 Styling

KSK styles are automatically included. You can customize by overriding CSS variables or adding your own styles.

## 📖 Documentation

- [KSK Design System](https://www.npmjs.com/package/ksk)
- [Astro Documentation](https://docs.astro.build)

## 🛠️ Built With

- [Astro](https://astro.build/) - Static site generator
- [KSK](https://www.npmjs.com/package/ksk) - Design system
${responses.useTypeScript ? '- [TypeScript](https://www.typescriptlang.org/) - Type safety' : ''}
`;

    await fs.writeFile(path.join(projectDir, 'README.md'), readmeContent);

    console.log(`📦 Installing dependencies with ${responses.packageManager}...`);
    
    // Install dependencies
    await runCommand(responses.packageManager, ['install'], { cwd: projectDir });

    console.log('');
    console.log('🎉 Project created successfully!');
    console.log('');
    console.log('Next steps:');
    console.log(`  cd ${projectName}`);
    console.log(`  ${responses.packageManager} run dev`);
    console.log('');
    console.log('Happy building! 🚀');

  } catch (error) {
    console.error('❌ Failed to create project:', error.message);
    process.exit(1);
  }
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

main().catch(console.error);
