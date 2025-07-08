# Astriata Kickstart Template

A modern, production-ready Astro template with component-based architecture, automatic icon generation, and deployment-ready configuration.

## 🚀 Quick Start

1. **Configure your deployment path** (see [Site Configuration](#-site-configuration))
2. **Install dependencies**: `pnpm install`
3. **Start development**: `pnpm dev`
4. **Follow the coding conventions** (see [CSS Class Naming](#-css-class-naming-convention))

---

## ⚠️ CRITICAL: Site Configuration

**Before running this project**, you MUST configure your deployment path in `site.config.js`.

### 📍 Edit `site.config.js` in the root directory

This file controls where your site will be served from. **Getting this wrong will cause 404 errors for all assets**.

```javascript
const SITE_CONFIG = {
  basePath: {
    development: "/", // Local development (usually root)
    production: "/html_templates/ksp/", // Production/staging server path
  },
};
```

**Common deployment scenarios:**

- **Local development**: Use `'/'`
- **Nested on server**: Use `'/html_templates/project-name/'`
- **Client folder**: Use `'/clients/project-name/'`
- **Root deployment**: Use `'/'`
- **Subdirectory**: Use `'/subdirectory/'`

**Important**: Always include leading and trailing slashes for nested paths.

This configuration affects all asset paths (images, CSS, fonts, icons). The `asset()` helper automatically handles path resolution based on your environment.

---

## 🎯 CSS Class Naming Convention

**MANDATORY**: All CSS classes MUST use the `ast-` prefix to avoid conflicts with client stylesheets.

### ✅ Correct Usage

```scss
// Component SCSS
.ast-btn {
  /* Base button styles */
}
.ast-btn--primary {
  /* Primary variant */
}
.ast-btn--large {
  /* Size modifier */
}

.ast-card {
  /* Card component */
}
.ast-card__header {
  /* Card sub-element */
}
.ast-card--featured {
  /* Card modifier */
}
```

```astro
<!-- Component HTML -->
<button class="ast-btn ast-btn--primary ast-btn--large">
  Click Me
</button>

<div class="ast-card ast-card--featured">
  <header class="ast-card__header">
    <h3>Card Title</h3>
  </header>
</div>
```

### ❌ Incorrect Usage

```scss
// DON'T DO THIS
.btn {
} // Missing ast- prefix
.button {
} // Missing ast- prefix
.card {
} // Missing ast- prefix
```

### 🔄 Exception: Swiper Classes

**Swiper classes are the ONLY exception** - do not prefix Swiper's built-in classes:

```scss
// ✅ Correct - Swiper classes without prefix
.swiper {
}
.swiper-slide {
}
.swiper-button-next {
}

// ✅ But custom Swiper modifications should use prefix
.ast-swiper-custom {
}
.ast-gallery-swiper {
}
```

### 📝 BEM Methodology with ast- Prefix

Follow BEM (Block Element Modifier) naming with the `ast-` prefix:

```scss
// Block
.ast-component {
}

// Element
.ast-component__element {
}

// Modifier
.ast-component--modifier {
}
.ast-component__element--modifier {
}
```

---

## 🎨 Icon System

The template includes a comprehensive icon system with automatic font generation and optimization.

### 📁 Adding New Icons

1. **Place SVG files** in `public/icons/raw/` directory
2. **Use descriptive names**: `add-user.svg`, `search.svg`, `menu-close.svg`
3. **Run the icon build process** (see commands below)

**Important**: Icons MUST be placed in `public/icons/raw/` before running build commands.

### 🔧 Icon Build Commands

| Command                      | Purpose                      |
| ---------------------------- | ---------------------------- |
| `pnpm run icons:clean`       | Clear optimized icons folder |
| `pnpm run icons:optimize`    | Optimize SVGs with SVGO      |
| `pnpm run icons:rename`      | Rename with Unicode prefixes |
| `pnpm run icons:build`       | Generate web font files      |
| `pnpm run icons:update-page` | Update documentation page    |
| `pnpm run icons`             | **Run all icon processes**   |

### 🏗️ Icon Build Process

The complete icon build process:

```bash
pnpm run icons
```

This command:

1. **Cleans** the optimized folder
2. **Optimizes** SVGs from `raw/` to `optimized/`
3. **Renames** files with Unicode prefixes (uEA01-, uEA02-, etc.)
4. **Generates** web font files (.woff, .woff2, .css)
5. **Updates** the icons documentation page

### 📂 Icon Directory Structure

```
public/icons/
├── raw/              # ← Place your SVG files here
│   ├── add-user.svg
│   ├── search.svg
│   └── menu-close.svg
├── optimized/        # Auto-generated optimized SVGs
│   ├── uEA01-add-user.svg
│   ├── uEA02-search.svg
│   └── uEA03-menu-close.svg
└── font/            # Auto-generated web fonts
    ├── font-icons.css
    ├── font-icons.woff
    └── font-icons.woff2
```

### 🎯 Using Icons in Components

```astro
<!-- Font icon usage -->
<i class="icon icon-add-user"></i>
<i class="icon icon-search"></i>

<!-- SVG icon usage -->
<img src={asset("icons/optimized/uEA01-add-user.svg")} alt="Add user" />
```

---

## 🖼️ Asset Management

### Using the Asset Helper

**Always use the `asset()` helper** for reliable path resolution across all environments:

```astro
---
import { asset } from "../utils/assets";
---

<!-- Images -->
<img src={asset("images/hero.jpg")} alt="Hero image" />

<!-- Icons -->
<img src={asset("icons/optimized/uEA01-search.svg")} alt="Search" />

<!-- Fonts -->
<link rel="stylesheet" href={asset("icons/font/font-icons.css")} />
```

### Component Image Patterns

**For regular components:**

```astro
---
import { asset } from "../../utils/assets";

export interface Props {
  imageSrc: string;
  imageAlt: string;
}

const { imageSrc, imageAlt } = Astro.props;
---

<img src={asset(imageSrc)} alt={imageAlt} />
```

**For complex components (Swiper, galleries):**

```astro
---
import { asset } from "../../utils/assets";

const slides = [
  {
    image: asset("images/slide1.jpg"),
    alt: "Slide 1 description"
  },
  {
    image: asset("images/slide2.jpg"),
    alt: "Slide 2 description"
  }
];
---
```

### 📁 Asset Organization

```
public/
├── images/          # Photos, graphics, content images
├── icons/           # Icon system (see Icon System section)
├── fonts/           # Custom web fonts
├── favicon.svg      # Site favicon
└── main.js          # Compiled JavaScript
```

---

## 🏗️ Project Structure

```
template/
├── astro.config.mjs         # Astro configuration
├── site.config.js           # Site deployment configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── public/                 # Static assets
│   ├── images/             # Content images
│   ├── icons/              # Icon system
│   │   ├── raw/            # ← Add SVG icons here
│   │   ├── optimized/      # Auto-generated optimized SVGs
│   │   └── font/           # Auto-generated web fonts
│   ├── fonts/              # Custom web fonts
│   ├── favicon.svg         # Site favicon
│   └── main.js             # Compiled JavaScript
├── scripts/                # Build and automation scripts
│   ├── build-icons.js      # Icon processing
│   ├── build-main-js.js    # JavaScript compilation
│   ├── clean-optimized.js  # Icon cleanup
│   ├── rename-icon-files.js # Icon renaming
│   ├── svgo.config.js      # SVG optimization config
│   ├── sync-colors.js      # Color token sync
│   └── update-icons-page.js # Icon documentation
└── src/
    ├── components/         # Reusable UI components
    │   ├── Accordion/      # Component folder structure:
    │   │   ├── Accordion.astro    # Component template
    │   │   ├── Accordion.scss     # Component styles
    │   │   ├── Accordion.js       # Component logic
    │   │   └── README.md          # Component docs
    │   ├── Button/
    │   ├── Card/
    │   ├── Dialog/
    │   └── [...]
    ├── layouts/            # Page layout templates
    │   └── Layout.astro
    ├── pages/              # Route pages
    │   ├── index.astro     # Homepage
    │   └── demo/           # Component demos
    ├── styles/             # Global styles and tokens
    │   ├── main.scss       # Main stylesheet
    │   ├── base/           # Reset, typography, fonts
    │   ├── core/           # Utility classes and mixins
    │   ├── tokens/         # Design tokens (colors, spacing, etc.)
    │   └── demo/           # Demo page styles
    └── utils/              # Helper functions
        ├── assets.ts       # Asset path helper
        └── imageHandler.js # Image processing utilities
```

---

## 🧞 Available Commands

All commands are run from the root of the project:

### 🚀 Development Commands

| Command            | Action                                           |
| ------------------ | ------------------------------------------------ |
| `pnpm install`     | Install dependencies                             |
| `pnpm dev`         | Start development server at `localhost:4321`     |
| `pnpm dev:astro`   | Start Astro dev server only (without color sync) |
| `pnpm build`       | Build production site to `./dist/`               |
| `pnpm build:local` | Build with development config                    |
| `pnpm preview`     | Preview production build locally                 |

### 🎨 Icon Commands

| Command                      | Action                                 |
| ---------------------------- | -------------------------------------- |
| `pnpm run icons`             | **Complete icon build process**        |
| `pnpm run icons:clean`       | Clear optimized icons folder           |
| `pnpm run icons:optimize`    | Optimize SVGs from raw/ to optimized/  |
| `pnpm run icons:rename`      | Add Unicode prefixes to optimized SVGs |
| `pnpm run icons:build`       | Generate web font files                |
| `pnpm run icons:update-page` | Update icons documentation page        |

### 🎨 Color System Commands

| Command                 | Action                                     |
| ----------------------- | ------------------------------------------ |
| `pnpm run colors:sync`  | Sync color tokens to CSS custom properties |
| `pnpm run colors:watch` | Watch color tokens for changes             |

### 🔧 Astro Commands

| Command                        | Action                  |
| ------------------------------ | ----------------------- |
| `pnpm astro add <integration>` | Add Astro integration   |
| `pnpm astro check`             | Type-check the project  |
| `pnpm astro -- --help`         | Get help with Astro CLI |

---

## 📝 Development Guidelines

### 🎯 Component Development

1. **Create component folders** with all related files:

   ```
   ComponentName/
   ├── ComponentName.astro  # Template
   ├── ComponentName.scss   # Styles (with ast- prefix)
   ├── ComponentName.js     # Logic (if needed)
   └── README.md           # Documentation
   ```

2. **Use TypeScript interfaces** for component props:

   ```astro
   ---
   export interface Props {
     title: string;
     variant?: "primary" | "secondary";
     disabled?: boolean;
   }

   const { title, variant = "primary", disabled = false } = Astro.props;
   ---
   ```

3. **Follow the CSS naming convention** with `ast-` prefix
4. **Document component usage** in the README.md file
5. **Use the asset helper** for all image and icon references

### 🎨 Styling Guidelines

1. **Always use `ast-` prefix** for CSS classes (except Swiper)
2. **Follow BEM methodology**: `.ast-block__element--modifier`
3. **Use design tokens** from `src/styles/tokens/`
4. **Organize styles** in component-specific SCSS files
5. **Avoid global styles** - keep everything scoped to components

### 🖼️ Asset Guidelines

1. **Place SVG icons** in `public/icons/raw/` before building
2. **Run icon build process** after adding new icons
3. **Use descriptive filenames** for icons: `add-user.svg`, `menu-close.svg`
4. **Always use `asset()` helper** for reliable path resolution
5. **Optimize images** before adding to `public/images/`

---

## 🚨 Common Issues & Solutions

### Asset 404 Errors

**Problem**: Images, CSS, or icons return 404 errors  
**Solution**: Check your `site.config.js` configuration. Ensure the `basePath` matches your deployment environment.

### Missing ast- Prefix

**Problem**: Styles not applying or conflicting with client styles  
**Solution**: Ensure all CSS classes use the `ast-` prefix. Use find/replace to update existing classes.

### Icons Not Updating

**Problem**: New icons not appearing or old icons still showing  
**Solution**:

1. Verify SVGs are in `public/icons/raw/`
2. Run `pnpm run icons` to rebuild the icon system
3. Clear browser cache

### Swiper Styles Breaking

**Problem**: Swiper components not styling correctly  
**Solution**: Don't prefix Swiper's built-in classes. Only prefix your custom Swiper modifications.

---

## 👀 Learn More

- [Astro Documentation](https://docs.astro.build/)
- [Component Development Best Practices](./src/components/README.md)
- [Design Token System](./src/styles/tokens/README.md)
- [Icon System Documentation](./scripts/README.md)
