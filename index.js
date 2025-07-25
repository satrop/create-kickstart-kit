#!/usr/bin/env node

import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)

// Read your CLI's own version from your root package.json
const rootPackageJsonPath = join(__dirname, 'package.json')
const rootPackageJson = JSON.parse(await fs.readFile(rootPackageJsonPath, 'utf8'))

// Handle --version / -v flags to show CLI version and exit
if (args.includes('--version') || args.includes('-v')) {
  console.log(`${rootPackageJson.name} CLI version: v${rootPackageJson.version}`)
  process.exit(0)
}

// Main function to handle all CLI logic
const main = async () => {
  // Handle update command
  if (args[0] === 'update') {
    await runUpdate()
    process.exit(0)
  }

  // Show help if no arguments or help flag
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
🚀 ${rootPackageJson.name} v${rootPackageJson.version}

Usage:
  create-ksk <project-name>  Create a new KSK project
  create-ksk update          Update current project with latest KSK components
  
Options:
  -v, --version             Show version
  -h, --help                Show this help

Examples:
  create-ksk my-awesome-app
  cd my-awesome-app && create-ksk update
`)
    process.exit(0)
  }

  const targetDir = args[0]

  if (!targetDir) {
    console.error('❌ Please provide a project name.')
    console.log('Usage: create-ksk <project-name>')
    process.exit(1)
  }

  const targetPath = resolve(process.cwd(), targetDir)

  if (existsSync(targetPath)) {
    console.error(`❌ Directory ${targetDir} already exists.`)
    process.exit(1)
  }

  // Create new project
  await run(targetDir, targetPath)
}

const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(src, entry.name)

    // Skip node_modules and other files that shouldn't be copied
    if (entry.name === 'node_modules' || entry.name === '.DS_Store') {
      continue
    }

    // Rename _gitignore or .npmignore to .gitignore
    const destName = entry.name === '_gitignore' || entry.name === '.npmignore'
      ? '.gitignore'
      : entry.name

    const destPath = join(dest, destName)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

const runUpdate = async () => {
  const currentDir = process.cwd()
  
  // Check if we're in a KSK project
  const packageJsonPath = join(currentDir, 'package.json')
  if (!existsSync(packageJsonPath)) {
    console.error('❌ No package.json found. Are you in a project directory?')
    process.exit(1)
  }

  // Check if this looks like a KSK project
  const srcComponentsPath = join(currentDir, 'src', 'components')
  if (!existsSync(srcComponentsPath)) {
    console.error('❌ This doesn\'t look like a KSK project (no src/components folder found)')
    process.exit(1)
  }

  console.log('🔄 Updating KSK components and files...')
  
  // Create a temporary directory to download latest template
  const tempDir = join(currentDir, '.ksk-temp-update')
  const templateSource = join(__dirname, 'template')
  
  try {
    // Copy latest template to temp directory
    await copyDir(templateSource, tempDir)
    
    // List of files/folders to update (excluding user's custom content)
    const updatePaths = [
      'src/components',
      'src/styles',
      'src/utils',
      'src/assets',
      'public/icons',
      'scripts'
    ]
    
    console.log('📋 Files to update:')
    for (const updatePath of updatePaths) {
      const sourcePath = join(tempDir, updatePath)
      const targetPath = join(currentDir, updatePath)
      
      if (existsSync(sourcePath)) {
        console.log(`  ✅ ${updatePath}`)
        
        // Remove existing and copy new
        if (existsSync(targetPath)) {
          await fs.rm(targetPath, { recursive: true, force: true })
        }
        await copyDir(sourcePath, targetPath)
      }
    }
    
    // Update package.json dependencies (but keep user's name and version)
    const tempPackageJson = JSON.parse(await fs.readFile(join(tempDir, 'package.json'), 'utf8'))
    const currentPackageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
    
    // Merge dependencies
    currentPackageJson.dependencies = { ...currentPackageJson.dependencies, ...tempPackageJson.dependencies }
    currentPackageJson.devDependencies = { ...currentPackageJson.devDependencies, ...tempPackageJson.devDependencies }
    currentPackageJson.scripts = { ...currentPackageJson.scripts, ...tempPackageJson.scripts }
    
    await fs.writeFile(packageJsonPath, JSON.stringify(currentPackageJson, null, 2))
    console.log('  ✅ package.json dependencies updated')
    
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true })
    
    console.log('📦 Installing updated dependencies...')
    execSync('pnpm install', { cwd: currentDir, stdio: 'inherit' })
    
    console.log('✅ KSK project updated successfully!')
    console.log('\n🎨 Your custom pages and layouts were preserved.')
    console.log('💡 Check the demo pages to see any new components or features.')
    
  } catch (error) {
    // Clean up temp directory if it exists
    if (existsSync(tempDir)) {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
    console.error('❌ Update failed:', error.message)
    process.exit(1)
  }
}

const run = async (targetDir, targetPath) => {
  console.log(`🚀 Creating new project in ./${targetDir}`)
  await copyDir(join(__dirname, 'template'), targetPath)

  // Update package.json with project name
  const projectPackageJsonPath = join(targetPath, 'package.json')
  const projectPackageJson = JSON.parse(await fs.readFile(projectPackageJsonPath, 'utf8'))
  projectPackageJson.name = targetDir
  await fs.writeFile(projectPackageJsonPath, JSON.stringify(projectPackageJson, null, 2))

  console.log('📦 Installing dependencies...')
  execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' })

  // Show the installed starter kit version
  console.log(`📦 Installed kickstart-kit starter version: v${projectPackageJson.version}`)

  console.log('✅ Done!')
  console.log(`\nNext steps:\n  cd ${targetDir}\n  pnpm dev`)
  console.log(`\n🔄 To update later: cd ${targetDir} && npx create-ksk update`)
}

main().catch(console.error)