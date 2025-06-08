#!/usr/bin/env node

// Import utilities to work with file paths and URLs
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

// Import promise-based filesystem API for async file operations
import fs from 'fs/promises'

// Import synchronous exists check from filesystem API
import { existsSync } from 'fs'

// Import synchronous command execution from child process API
import { execSync } from 'child_process'

// Convert module URL to a directory path string to use as base for relative operations
const __dirname = dirname(fileURLToPath(import.meta.url))

// Grab CLI arguments after the first two (node executable and script path)
const args = process.argv.slice(2)

// Define the target directory for the new project, defaulting to 'kickstart-project'
const targetDir = args[0] || 'kickstart-project'

// Resolve the absolute path for the target directory based on current working directory
const targetPath = resolve(process.cwd(), targetDir)

// Check synchronously if the target directory already exists to prevent overwriting
if (existsSync(targetPath)) {
  console.error(`❌ Directory ${targetDir} already exists.`)
  process.exit(1)
}

// Recursive function to copy all files and folders from source to destination
const copyDir = async (src, dest) => {
  // Ensure destination directory exists or create it recursively
  await fs.mkdir(dest, { recursive: true })

  // Read directory entries from the source path, including file types
  const entries = await fs.readdir(src, { withFileTypes: true })

  // Iterate over each entry to copy files or recurse into subdirectories
  for (const entry of entries) {
    // Compose full source and destination paths for the current entry
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    // If entry is a directory, recursively copy it
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      // Otherwise, copy the file from source to destination
      await fs.copyFile(srcPath, destPath)
    }
  }
}

// Main asynchronous function to orchestrate project creation and setup
const run = async () => {
  try {
    // Notify user about the new project directory creation
    console.log(`🚀 Creating new project in ./${targetDir}`)

    // Copy the entire 'template' folder contents into the target directory
    await copyDir(join(__dirname, 'template'), targetPath)

    // Notify user that dependency installation is starting
    console.log('📦 Installing dependencies...')

    // Run 'pnpm install' in the target directory synchronously, showing all output
    execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' })

    // Notify the user that setup finished successfully
    console.log('✅ Done!')

    // Provide user with next commands to run to get started
    console.log(`\nNext steps:\n  cd ${targetDir}\n  pnpm dev`)
  } catch (err) {
    // Catch any error in the process and print a friendly error message
    console.error('❌ Something went wrong:', err)

    // Exit the script with a failure code to indicate error
    process.exit(1)
  }
}

// Execute the main function to start the CLI process
run()