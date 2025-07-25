# KSK Split Migration Plan

## Step-by-Step Migration Process

### Phase 1: Create ksk-core Package

#### 1.1 Setup ksk-core directory structure
```bash
mkdir -p ../ksk-core/src/{components,layouts,pages,styles,assets,utils}
mkdir -p ../ksk-core/scripts
mkdir -p ../ksk-core/public/{icons,fonts,images}
mkdir -p ../ksk-core/dist
```

#### 1.2 Copy core files to ksk-core
```bash
# Copy source files
cp -r template/src/components ../ksk-core/src/
cp -r template/src/layouts ../ksk-core/src/
cp -r template/src/pages/demo ../ksk-core/src/pages/
cp -r template/src/styles ../ksk-core/src/
cp -r template/src/assets ../ksk-core/src/
cp -r template/src/utils ../ksk-core/src/

# Copy build scripts
cp -r template/scripts/* ../ksk-core/scripts/

# Copy public assets
cp -r template/public/icons ../ksk-core/public/
cp -r template/public/fonts ../ksk-core/public/
cp -r template/public/images ../ksk-core/public/
cp template/public/favicon.svg ../ksk-core/public/
```

#### 1.3 Create ksk-core package.json
```json
{
  "name": "@kickstart/ksk-core",
  "version": "1.0.0",
  "description": "Core design system components and styles for Kickstart projects",
  "type": "module",
  "main": "./src/assets/main.js",
  "exports": {
    ".": {
      "import": "./src/assets/main.js",
      "types": "./src/assets/main.d.ts"
    },
    "./styles": "./src/styles/main.scss",
    "./styles/*": "./src/styles/*",
    "./components": "./src/components/index.js",
    "./components/*": "./src/components/*",
    "./layouts/*": "./src/layouts/*",
    "./pages/*": "./src/pages/*",
    "./utils/*": "./src/utils/*",
    "./public/*": "./public/*"
  },
  "files": [
    "src",
    "public",
    "scripts",
    "dist"
  ],
  "scripts": {
    "build": "npm run icons && npm run compile",
    "icons:clean": "node scripts/clean-optimized.js",
    "icons:optimize": "npm run icons:clean && svgo -f public/icons/raw -o public/icons/optimized --config scripts/svgo.config.js",
    "icons:rename": "node scripts/rename-icon-files.js",
    "icons:build": "webfont ./public/icons/optimized/*.svg",
    "icons:update-page": "node scripts/update-icons-page.js",
    "icons": "npm run icons:optimize && npm run icons:rename && npm run icons:build && npm run icons:update-page",
    "compile": "sass src/styles/main.scss dist/main.css",
    "colors:sync": "node scripts/sync-colors.js",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "astro": "^5.0.0",
    "sass-embedded": "^1.89.0"
  },
  "dependencies": {
    "svgo": "^4.0.0",
    "webfont": "11.2.26"
  },
  "devDependencies": {
    "sass": "^1.70.0"
  },
  "keywords": [
    "astro",
    "design-system",
    "components",
    "scss",
    "kickstart"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/ksk-core.git"
  }
}
```

### Phase 2: Update create-ksk CLI

#### 2.1 Update CLI package.json
```json
{
  "name": "create-ksk",
  "version": "5.0.0",
  "description": "CLI to scaffold Astro projects with Kickstart design system",
  "bin": {
    "create-ksk": "./index.js"
  },
  "type": "module",
  "license": "MIT",
  "engines": {
    "node": ">=20"
  },
  "keywords": [
    "astro",
    "starter",
    "scaffold",
    "create",
    "kickstart"
  ],
  "dependencies": {
    "prompts": "^2.4.2"
  },
  "author": "SteveP"
}
```

#### 2.2 Update CLI templates
Create new minimal templates in create-ksk:
```
create-ksk/
├── templates/
│   ├── basic/
│   │   ├── astro.config.mjs
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   └── index.astro
│   │   │   └── styles/
│   │   │       └── main.scss
│   │   └── public/
│   │       └── favicon.svg
│   └── typescript/
│       └── (same as basic but with TS config)
```

### Phase 3: Path Updates and Imports

#### 3.1 Update imports in ksk-core
All internal imports in ksk-core should use relative paths:
```js
// OLD: import { asset } from "@/utils/assets"
// NEW: import { asset } from "../utils/assets.js"
```

#### 3.2 Create index files for clean exports
Create `src/components/index.js` in ksk-core:
```js
export { default as Accordion } from './Accordion/Accordion.astro';
export { default as Alert } from './Alert/Alert.astro';
export { default as Button } from './Button/Button.astro';
// ... etc for all components
```

#### 3.3 Update CLI template files
Template files should import from ksk-core:
```astro
---
// In generated project files
import Layout from '@kickstart/ksk-core/layouts/Layout.astro';
import Button from '@kickstart/ksk-core/components/Button/Button.astro';
---
```

## File Movement Script

### Automated Migration Script
```bash
#!/bin/bash
# run-migration.sh

set -e

echo "🚀 Starting KSK split migration..."

# Create ksk-core structure
echo "📁 Creating ksk-core directory structure..."
mkdir -p ../ksk-core/src/{components,layouts,pages,styles,assets,utils}
mkdir -p ../ksk-core/scripts
mkdir -p ../ksk-core/public/{icons,fonts,images}
mkdir -p ../ksk-core/dist

# Copy files to ksk-core
echo "📂 Copying files to ksk-core..."
cp -r template/src/components ../ksk-core/src/
cp -r template/src/layouts ../ksk-core/src/
cp -r template/src/pages/demo ../ksk-core/src/pages/
cp -r template/src/styles ../ksk-core/src/
cp -r template/src/assets ../ksk-core/src/
cp -r template/src/utils ../ksk-core/src/
cp -r template/scripts/* ../ksk-core/scripts/
cp -r template/public/icons ../ksk-core/public/
cp -r template/public/fonts ../ksk-core/public/
cp -r template/public/images ../ksk-core/public/
cp template/public/favicon.svg ../ksk-core/public/

# Update create-ksk templates
echo "🔄 Updating create-ksk templates..."
mkdir -p templates/basic/src/{pages,styles}
mkdir -p templates/basic/public
mkdir -p templates/typescript/src/{pages,styles}
mkdir -p templates/typescript/public

echo "✅ Migration complete!"
echo "Next steps:"
echo "1. Update package.json files"
echo "2. Fix import paths"
echo "3. Test both packages"
echo "4. Publish to npm"
```

## Sample Package Files

### ksk-core astro.config.mjs
```js
// For demo/development purposes
import { defineConfig } from 'astro/config';

export default defineConfig({
  publicDir: './public',
  outDir: './dist',
  vite: {
    resolve: {
      alias: {
        '@': './src'
      }
    }
  }
});
```

### CLI template astro.config.mjs
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Basic Astro config for generated projects
});
```

### CLI template package.json
```json
{
  "name": "{{PROJECT_NAME}}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@kickstart/ksk-core": "^1.0.0",
    "astro": "^5.12.1",
    "sass-embedded": "^1.89.2"
  }
}
```

### CLI template main.scss
```scss
// Import the core design system
@use '@kickstart/ksk-core/styles' as ksk;

// Your custom styles here
```

### CLI template index.astro
```astro
---
import Layout from '@kickstart/ksk-core/layouts/Layout.astro';
import Button from '@kickstart/ksk-core/components/Button/Button.astro';
---

<Layout title="Welcome to {{PROJECT_NAME}}">
  <main>
    <h1>Welcome to your new Kickstart project!</h1>
    <p>Get started by editing this page in <code>src/pages/index.astro</code></p>
    
    <Button variant="primary">Get Started</Button>
  </main>
</Layout>

<script>
  import '@kickstart/ksk-core';
</script>
```

## Updated CLI Logic

### Enhanced CLI prompts
```js
#!/usr/bin/env node

import prompts from 'prompts';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project name?',
      validate: value => value.length > 0
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Use TypeScript?',
      initial: false
    },
    {
      type: 'confirm',
      name: 'includeDemos',
      message: 'Include demo pages?',
      initial: true
    }
  ]);

  const template = response.typescript ? 'typescript' : 'basic';
  const templatePath = join(__dirname, 'templates', template);
  const targetPath = join(process.cwd(), response.projectName);

  // Copy template
  await fs.cp(templatePath, targetPath, { recursive: true });

  // Update package.json with project name
  const packagePath = join(targetPath, 'package.json');
  const packageContent = await fs.readFile(packagePath, 'utf8');
  const updatedPackage = packageContent.replace('{{PROJECT_NAME}}', response.projectName);
  await fs.writeFile(packagePath, updatedPackage);

  // Install dependencies
  console.log('Installing dependencies...');
  execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' });

  console.log(`✅ Created ${response.projectName}`);
  console.log(`📁 cd ${response.projectName}`);
  console.log(`🚀 pnpm dev`);
}

main().catch(console.error);
```

## Testing Strategy

### 1. Test ksk-core package
```bash
cd ../ksk-core
npm link
npm run build
```

### 2. Test CLI
```bash
cd create-ksk
npm link @kickstart/ksk-core
npx create-ksk test-project
cd test-project
npm install
npm run dev
```

### 3. Verify imports work
- Check all components render correctly
- Verify styles are applied
- Test interactive JavaScript functionality

## Publishing Workflow

### 1. Publish ksk-core first
```bash
cd ../ksk-core
npm version 1.0.0
npm publish --access public
```

### 2. Update and publish CLI
```bash
cd create-ksk
# Update package.json to reference published ksk-core
npm version 5.0.0
npm publish
```

## Local Development Linking

### Link local ksk-core
```bash
# In ksk-core directory
npm link

# In any project using ksk-core
npm link @kickstart/ksk-core
```

### Unlink when done
```bash
npm unlink @kickstart/ksk-core
npm install @kickstart/ksk-core@latest
```

## Folder Trees After Split

### Final ksk-core structure:
```
ksk-core/
├── package.json
├── README.md
├── src/
│   ├── components/         # All UI components
│   ├── layouts/           # Astro layouts
│   ├── pages/             # Demo pages only
│   ├── styles/            # SCSS system
│   ├── assets/
│   │   └── main.js        # JS entry point
│   └── utils/             # Helper functions
├── scripts/               # Build tools
├── public/                # Static assets
└── dist/                  # Built distribution files
```

### Final create-ksk structure:
```
create-ksk/
├── package.json
├── index.js              # CLI entry
├── templates/
│   ├── basic/            # Basic JS template
│   └── typescript/       # TypeScript template
└── README.md
```

### Generated project structure:
```
my-new-project/
├── package.json           # Depends on @kickstart/ksk-core
├── astro.config.mjs
├── src/
│   ├── pages/
│   │   └── index.astro    # Imports from ksk-core
│   └── styles/
│       └── main.scss      # @use ksk-core styles
└── public/
    └── favicon.svg
```

## Benefits of This Approach

1. **Clean Separation**: Design system is completely separate from scaffolding
2. **Versioning**: ksk-core can be updated independently of CLI
3. **Reusability**: ksk-core can be used in any Astro project
4. **Maintainability**: Clear boundaries between packages
5. **Distribution**: Users get only what they need
6. **Development**: Local linking for easy development workflow

## Migration Checklist

- [x] Create ksk-core directory structure ✅
- [x] Copy files to ksk-core ✅
- [x] Create ksk-core package.json with correct exports ✅
- [x] Update all import paths in ksk-core ✅
- [x] Create component index files ✅
- [x] Update create-ksk templates ✅
- [x] Update CLI logic for new structure ✅
- [x] Add index page to ksk-core ✅
- [x] Fix @/ imports in SCSS and README files ✅
- [ ] Test ksk-core package locally
- [ ] Test CLI with new templates
- [ ] Publish ksk-core to npm
- [ ] Update CLI to use published ksk-core
- [ ] Publish updated CLI
- [ ] Update documentation
