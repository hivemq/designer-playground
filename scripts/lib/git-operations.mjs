import { execaCommand } from 'execa'

/**
 * Execute a shell command
 */
export async function execCommand(command, options = {}) {
  const { stdout } = await execaCommand(command, {
    shell: true,
    ...options,
  })
  return stdout
}

/**
 * Create and checkout a new git branch
 */
export async function createBranch(pkgPath, branchName, baseBranch = 'main') {
  try {
    // Fetch latest from origin
    await execCommand('git fetch origin', { cwd: pkgPath })

    // Check if branch already exists
    try {
      await execCommand(`git rev-parse --verify ${branchName}`, { cwd: pkgPath })
      throw new Error(`Branch '${branchName}' already exists`)
    } catch {
      // Branch doesn't exist, which is what we want
    }

    // Create and checkout new branch from origin/main
    await execCommand(`git checkout -b ${branchName} origin/${baseBranch}`, {
      cwd: pkgPath,
    })

    return branchName
  } catch (error) {
    throw new Error(`Failed to create branch: ${error.message}`)
  }
}

/**
 * Stage and commit changes
 */
export async function commitChanges(pkgPath, message, files = []) {
  try {
    // If specific files provided, stage them; otherwise stage all
    if (files.length > 0) {
      for (const file of files) {
        await execCommand(`git add "${file}"`, { cwd: pkgPath })
      }
    } else {
      await execCommand('git add .', { cwd: pkgPath })
    }

    // Commit with message
    await execCommand(`git commit -m "${message}"`, { cwd: pkgPath })
  } catch (error) {
    throw new Error(`Failed to commit changes: ${error.message}`)
  }
}

/**
 * Push branch to remote
 */
export async function pushBranch(pkgPath, branchName) {
  try {
    await execCommand(`git push -u origin ${branchName}`, { cwd: pkgPath })
  } catch (error) {
    throw new Error(`Failed to push branch: ${error.message}`)
  }
}

/**
 * Rollback branch (delete local and remote)
 */
export async function rollbackBranch(pkgPath, branchName, baseBranch = 'main') {
  try {
    // Checkout base branch first
    await execCommand(`git checkout ${baseBranch}`, { cwd: pkgPath })

    // Delete local branch
    await execCommand(`git branch -D ${branchName}`, { cwd: pkgPath })

    // Try to delete remote branch (may not exist)
    try {
      await execCommand(`git push origin --delete ${branchName}`, { cwd: pkgPath })
    } catch {
      // Remote branch might not exist, that's ok
    }
  } catch (error) {
    console.error(`⚠️  Failed to rollback branch: ${error.message}`)
  }
}

/**
 * Get git diff for analysis
 */
export async function getDiff(pkgPath, staged = true) {
  try {
    const command = staged ? 'git diff --staged' : 'git diff'
    return await execCommand(command, { cwd: pkgPath })
  } catch (error) {
    return ''
  }
}

/**
 * Check if working directory is clean
 */
export async function isWorkingDirectoryClean(pkgPath) {
  try {
    const status = await execCommand('git status --porcelain', { cwd: pkgPath })
    return status.trim() === ''
  } catch (error) {
    return false
  }
}
