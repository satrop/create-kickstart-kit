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
  console.log(`create-kickstart-kit CLI version: v${rootPackageJson.version}`)
  process.exit(0)
}

const targetDir = args[0] || 'kickstart-project'
const targetPath = resolve(process.cwd(), targetDir)

if (existsSync(targetPath)) {
  console.error(`❌ Directory ${targetDir} already exists.`)
  process.exit(1)
}

const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

const run = async () => {
  console.log(`🚀 Creating new project in ./${targetDir}`)
  await copyDir(join(__dirname, 'template'), targetPath)

  // Read the version of the starter kit (inside the template folder)
  const templatePackageJsonPath = join(__dirname, 'template', 'package.json')
  const templatePackageJson = JSON.parse(await fs.readFile(templatePackageJsonPath, 'utf8'))

  console.log('📦 Installing dependencies...')
  execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' })

  // Show the installed starter kit version
  console.log(`📦 Installed kickstart-kit starter version: v${templatePackageJson.version}`)

  console.log('✅ Done!')
  console.log(`\nNext steps:\n  cd ${targetDir}\n  pnpm dev`)
}

run()