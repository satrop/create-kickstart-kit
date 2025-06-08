#!/usr/bin/env node

import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
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

  console.log('📦 Installing dependencies...')
  execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' })

  console.log('✅ Done!')
  console.log(`\nNext:\n  cd ${targetDir}\n  pnpm dev`)
}

run()