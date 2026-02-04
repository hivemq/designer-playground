import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { execCommand } from './git-operations.mjs'

/**
 * Package configuration for all submodules
 */
export const PACKAGES = [
  {
    name: '@hivemq/ui-theme',
    path: 'packages/ui-theme',
    repo: 'hivemq/ui-theme',
    remote: 'git@github.com:hivemq/ui-theme.git',
  },
  {
    name: '@hivemq/ui-library',
    path: 'packages/ui-library',
    repo: 'hivemq/ui-shell',
    remote: 'git@github.com:hivemq/ui-shell.git',
  },
  {
    name: 'frontend-toolkit',
    path: 'packages/frontend-toolkit',
    repo: 'hivemq/frontend-toolkit',
    remote: 'git@github.com:hivemq/frontend-toolkit.git',
  },
]

/**
 * Parse git status --porcelain output
 */
function parseGitStatus(statusOutput) {
  const lines = statusOutput.trim().split('\n').filter(Boolean)

  const staged = []
  const unstaged = []
  const untracked = []

  for (const line of lines) {
    const x = line[0] // staged status
    const y = line[1] // unstaged status
    const file = line.substring(3)

    if (x !== ' ' && x !== '?') {
      staged.push(file)
    }

    if (y !== ' ' && y !== '?') {
      unstaged.push(file)
    }

    if (x === '?' && y === '?') {
      untracked.push(file)
    }
  }

  return { staged, unstaged, untracked }
}

/**
 * Detect which packages have uncommitted changes
 */
export async function detectChangedPackages() {
  const changedPackages = []

  for (const pkg of PACKAGES) {
    const pkgPath = resolve(process.cwd(), pkg.path)

    // Check if directory exists
    if (!existsSync(pkgPath)) {
      console.warn(`⚠️  Package not found: ${pkg.path}`)
      continue
    }

    // Check if it's a git repo
    if (!existsSync(resolve(pkgPath, '.git'))) {
      console.warn(`⚠️  Not a git repository: ${pkg.path}`)
      continue
    }

    try {
      // Run git status
      const status = await execCommand('git status --porcelain', { cwd: pkgPath })

      if (status.trim()) {
        // Parse git status output
        const { staged, unstaged, untracked } = parseGitStatus(status)

        const totalChanges = staged.length + unstaged.length + untracked.length

        changedPackages.push({
          ...pkg,
          changes: { staged, unstaged, untracked },
          totalChanges,
          hasChanges: true,
        })
      }
    } catch (error) {
      console.error(`❌ Error checking ${pkg.name}: ${error.message}`)
    }
  }

  return changedPackages
}

/**
 * Get current branch name for a package
 */
export async function getCurrentBranch(pkgPath) {
  try {
    const branch = await execCommand('git branch --show-current', { cwd: pkgPath })
    return branch.trim()
  } catch (error) {
    throw new Error(`Failed to get current branch: ${error.message}`)
  }
}
