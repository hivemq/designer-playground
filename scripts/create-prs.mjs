#!/usr/bin/env node

import { input, select, confirm, editor } from '@inquirer/prompts'
import chalk from 'chalk'
import { detectChangedPackages, getCurrentBranch } from './lib/package-detector.mjs'
import {
  createBranch,
  commitChanges,
  pushBranch,
  rollbackBranch,
} from './lib/git-operations.mjs'
import { createPullRequest, addCrossReferences } from './lib/pr-generator.mjs'

/**
 * Main entry point
 */
async function main() {
  console.log(chalk.bold.cyan('\n🚀 PR Creation Tool for Designer Playground\n'))

  // Step 1: Detect changed packages
  console.log(chalk.dim('🔍 Detecting changes in linked packages...\n'))

  const changedPackages = await detectChangedPackages()

  if (changedPackages.length === 0) {
    console.log(chalk.yellow('✨ No changes detected in any packages.'))
    console.log(chalk.dim('\nMake some changes first, then run this script again.\n'))
    return
  }

  console.log(chalk.green(`✓ Found changes in ${changedPackages.length} package(s):\n`))
  for (const pkg of changedPackages) {
    console.log(
      chalk.cyan(`  • ${pkg.name}`) +
        chalk.dim(` (${pkg.totalChanges} file${pkg.totalChanges > 1 ? 's' : ''} changed)`)
    )
  }
  console.log('')

  // Step 2: Confirm proceeding
  const shouldProceed = await confirm({
    message: 'Do you want to create PRs for these changes?',
    default: true,
  })

  if (!shouldProceed) {
    console.log(chalk.dim('\n👋 Cancelled.\n'))
    return
  }

  // Step 3: Process each package
  const createdPRs = []

  for (const pkg of changedPackages) {
    console.log(chalk.bold(`\n${'='.repeat(60)}`))
    console.log(chalk.bold(`📦 Processing: ${pkg.name}`))
    console.log(chalk.bold(`${'='.repeat(60)}\n`))

    try {
      // Get current branch
      const currentBranch = await getCurrentBranch(pkg.path)
      console.log(chalk.dim(`Current branch: ${currentBranch}\n`))

      // Gather PR information
      const prInfo = await gatherPRInfo(pkg, currentBranch)

      // Create branch
      console.log(chalk.dim(`\n✓ Creating branch: ${prInfo.branchName}`))
      await createBranch(pkg.path, prInfo.branchName)

      // Commit changes
      console.log(chalk.dim(`✓ Committing changes`))
      await commitChanges(pkg.path, prInfo.commitMessage)

      // Push branch
      console.log(chalk.dim(`✓ Pushing to origin`))
      await pushBranch(pkg.path, prInfo.branchName)

      // Create PR
      console.log(chalk.dim(`✓ Creating pull request`))
      const pr = await createPullRequest(pkg, prInfo)

      console.log(chalk.green.bold(`\n✨ PR created successfully!`))
      console.log(chalk.cyan(`   ${pr.url}\n`))

      createdPRs.push({
        ...pkg,
        branchName: prInfo.branchName,
        prUrl: pr.url,
        prNumber: pr.number,
      })
    } catch (error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}\n`))

      // Ask if they want to continue with other packages
      if (changedPackages.indexOf(pkg) < changedPackages.length - 1) {
        const shouldContinue = await confirm({
          message: 'Continue with remaining packages?',
          default: true,
        })

        if (!shouldContinue) {
          break
        }
      }
    }
  }

  // Step 4: Add cross-references if multiple PRs created
  if (createdPRs.length > 1) {
    console.log(chalk.dim('\n🔗 Adding cross-references between related PRs...'))
    await addCrossReferences(createdPRs)
    console.log(chalk.green('✓ Cross-references added\n'))
  }

  // Step 5: Summary
  if (createdPRs.length > 0) {
    console.log(chalk.bold.green(`\n${'='.repeat(60)}`))
    console.log(chalk.bold.green(`✨ Successfully created ${createdPRs.length} pull request(s)`))
    console.log(chalk.bold.green(`${'='.repeat(60)}\n`))

    for (const pr of createdPRs) {
      console.log(chalk.cyan(`${pr.name}:`))
      console.log(chalk.dim(`  Branch: ${pr.branchName}`))
      console.log(chalk.dim(`  PR:     ${pr.prUrl}\n`))
    }
  }
}

/**
 * Gather PR information from user
 */
async function gatherPRInfo(pkg, currentBranch) {
  // Branch name
  const defaultBranchName = `feature/designer-playground-updates-${Date.now()}`
  const branchName = await input({
    message: 'Branch name:',
    default: defaultBranchName,
  })

  // Commit message
  const commitMessage = await input({
    message: 'Commit message:',
    default: 'feat: updates from designer playground',
  })

  // PR title
  const prTitle = await input({
    message: 'PR title:',
    default: 'Updates from designer playground',
  })

  // PR description
  const prDescription = await editor({
    message: 'PR description (opens editor):',
    default:
      'This PR contains updates made in the designer-playground repository for rapid prototyping and experimentation.',
  })

  // PR type
  const prType = await select({
    message: 'PR type:',
    choices: [
      { name: 'Enhancement', value: 'enhancement' },
      { name: 'Bug Fix', value: 'bug' },
      { name: 'Refactor', value: 'refactor' },
      { name: 'Documentation', value: 'documentation' },
      { name: 'Test', value: 'test' },
      { name: 'Chore', value: 'chore' },
    ],
    default: 'enhancement',
  })

  // Customer-facing
  const customerFacing = await confirm({
    message: 'Is this customer-facing?',
    default: false,
  })

  return {
    branchName,
    commitMessage,
    title: prTitle,
    description: prDescription,
    type: prType,
    customerFacing,
  }
}

// Run the script
main().catch((error) => {
  console.error(chalk.red(`\n❌ Fatal error: ${error.message}\n`))
  process.exit(1)
})
