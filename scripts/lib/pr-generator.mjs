import { execCommand } from './git-operations.mjs'

/**
 * PR labels by type
 */
const PR_LABELS = {
  bug: 'bug',
  enhancement: 'enhancement',
  refactor: 'refactor',
  documentation: 'documentation',
  test: 'test',
  chore: 'chore',
}

/**
 * Build PR body from template
 */
function buildPRBody({ description, type, customerFacing = false }) {
  const todos = generateTodoChecklist(type, customerFacing)

  return `## Why

${description}

## What

<!-- Describe your changes in detail -->

## Todos

${todos.map((todo) => `- [ ] ${todo}`).join('\n')}
`
}

/**
 * Generate todo checklist based on PR type
 */
function generateTodoChecklist(type, customerFacing) {
  const todos = ['Code review completed', 'Tests added/updated', 'Documentation updated']

  if (type === 'bug') {
    todos.unshift('Root cause identified')
    todos.push('Regression test added')
  }

  if (customerFacing) {
    todos.push('Release notes prepared')
    todos.push('Customer communication plan reviewed')
  }

  return todos
}

/**
 * Create a pull request using gh CLI
 */
export async function createPullRequest(packageInfo, prInfo) {
  const { repo, path: pkgPath } = packageInfo
  const { title, description, type, customerFacing } = prInfo

  try {
    // Build PR body
    const body = buildPRBody({ description, type, customerFacing })

    // Build gh command
    const labelArg = PR_LABELS[type] ? `--label "${PR_LABELS[type]}"` : ''
    const customerFacingLabel = customerFacing ? '--label "customer-facing 🙋‍♂️"' : ''

    const command = [
      'gh pr create',
      `--repo ${repo}`,
      `--title "${title}"`,
      `--body "${body}"`,
      labelArg,
      customerFacingLabel,
    ]
      .filter(Boolean)
      .join(' ')

    // Create PR
    const result = await execCommand(command, { cwd: pkgPath })

    // Extract PR URL from output
    const prUrl = extractPRUrl(result)

    return {
      url: prUrl,
      number: extractPRNumber(prUrl),
    }
  } catch (error) {
    throw new Error(`Failed to create PR: ${error.message}`)
  }
}

/**
 * Extract PR URL from gh CLI output
 */
function extractPRUrl(output) {
  const match = output.match(/https:\/\/github\.com\/[^\s]+/)
  if (!match) {
    throw new Error('Could not extract PR URL from output')
  }
  return match[0]
}

/**
 * Extract PR number from URL
 */
function extractPRNumber(url) {
  const match = url.match(/\/pull\/(\d+)/)
  return match ? match[1] : null
}

/**
 * Add comment to PR
 */
export async function addPRComment(repo, prNumber, comment) {
  try {
    await execCommand(`gh pr comment ${prNumber} --repo ${repo} --body "${comment}"`)
  } catch (error) {
    console.error(`⚠️  Failed to add comment: ${error.message}`)
  }
}

/**
 * Add cross-references between related PRs
 */
export async function addCrossReferences(createdPRs) {
  if (createdPRs.length <= 1) return

  for (let i = 0; i < createdPRs.length; i++) {
    const relatedPRs = createdPRs.filter((_, idx) => idx !== i)
    const comment = `Related PRs:\n${relatedPRs.map((pr) => `- ${pr.prUrl}`).join('\n')}`

    await addPRComment(createdPRs[i].repo, createdPRs[i].prNumber, comment)
  }
}
