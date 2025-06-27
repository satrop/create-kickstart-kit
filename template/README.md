# Astriata Kickstart Kit: Basics

## 🚀 Project Structure

Inside of your Kickstart kit, you'll see the following folders and files:

```text
template
    ├── astro.config.mjs
    ├── dist
    │   ├── _css
    │   │   └── style.css
    │   ├── _js
    │   │   ├── astro
    │   │   │   ├── server.js
    │   │   │   └── server.js.map
    │   │   ├── astro.js
    │   │   └── astro.js.map
    │   ├── favicon.svg
    │   └── index.html
    ├── node_modules
    │   ├── @astrojs
    │   │   └── check -> ../.pnpm/@astrojs+check@0.9.4_typescript@5.8.3/node_modules/@astrojs/check
    │   ├── astro -> .pnpm/astro@5.10.0_@types+node@24.0.3_rollup@4.44.0_sass-embedded@1.89.2_typescript@5.8.3_yaml@2.8.0/node_modules/astro
    │   ├── sass-embedded -> .pnpm/sass-embedded@1.89.2/node_modules/sass-embedded
    │   └── typescript -> .pnpm/typescript@5.8.3/node_modules/typescript
    ├── package.json
    ├── pnpm-lock.yaml
    ├── public
    │   ├── _fonts
    │   ├── _icons
    │   ├── _images
    │   └── favicon.svg
    ├── README.md
    ├── src
    │   ├── assets
    │   │   ├── astro.svg
    │   │   └── background.svg
    │   ├── components
    │   │   ├── Dialog.astro
    │   │   └── Welcome.astro
    │   ├── layouts
    │   │   └── Layout.astro
    │   ├── main.js
    │   ├── pages
    │   │   └── index.astro
    │   └── styles
    │       ├── base
    │       │   ├── _fonts.scss
    │       │   ├── _normalize.scss
    │       │   └── _typography.scss
    │       ├── core
    │       │   ├── _breakpoint.core.scss
    │       │   ├── _colors.core.scss
    │       │   ├── _column.core.scss
    │       │   ├── _debug.core.scss
    │       │   ├── _grid.core.scss
    │       │   ├── _spacing.core.scss
    │       │   └── readme.md
    │       ├── main.scss
    │       └── tokens
    │           ├── colors
    │           │   └── index.scss
    │           ├── grid
    │           │   ├── _grid-vars.scss
    │           │   └── index.scss
    │           ├── index.scss
    │           ├── spacing
    │           │   ├── _spacing.scss
    │           │   └── index.scss
    │           └── typography
    │               └── index.scss
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?
