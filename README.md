# Designer Playground

**Linear Ticket**: [APP-612](https://linear.app/hivemq/issue/APP-612)

A rapid prototyping environment for HiveMQ UI designers and developers to experiment with ui-theme, ui-library, and frontend-toolkit packages with instant hot-reload feedback.

## 🎯 Goals

- **Instant Feedback**: See theme and component changes in <1 second via hot-reload
- **Streamlined Workflow**: No more version bump cycles - edit locally, see changes immediately
- **Easy PR Creation**: One command to create PRs back to original repos
- **All-in-One Setup**: Clone one repo, run one command, start building

## 🚀 Quick Start

```bash
# Clone with submodules
git clone --recursive git@github.com:hivemq/designer-playground.git
cd designer-playground

# Configure GitHub Packages (first time only)
cp .npmrc.example .npmrc
# Edit .npmrc and add your GitHub personal access token

# Setup (first time only)
pnpm setup

# Start development
pnpm dev
```

That's it! The app will be running at **http://localhost:7272**

## 📦 What's Inside

This repo includes three workspace packages as git submodules:

- **packages/ui-theme** - HiveMQ Chakra UI theme configuration
- **packages/ui-library** - Shared UI components (Shell, Header, Sidebar, etc.)
- **packages/frontend-toolkit** - Claude Code agents and skills

## 🛠️ Development Workflow

### Making Changes to ui-theme

1. Edit files in `packages/ui-theme/theme/src/` (e.g., colors, tokens)
2. Save - your browser will update automatically in <1 second
3. Experiment freely!

Example: Change primary color in `packages/ui-theme/theme/src/colors.ts`

### Making Changes to ui-library

1. Edit components in `packages/ui-library/src/components/`
2. Save - hot-reload updates the UI immediately
3. Test app shell variations, slots system, etc.

Example: Modify `packages/ui-library/src/components/Shell.tsx`

### Creating Pull Requests

When you're happy with your changes:

```bash
pnpm create-prs
```

This interactive script will:

1. Detect which packages have changes
2. Guide you through creating branches
3. Create commits with your changes
4. Push to GitHub
5. Create PRs on the original repos
6. Link related PRs together

## 📚 Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `pnpm setup`        | Initial setup (install deps, build packages)     |
| `pnpm dev`          | Start all watch processes (app + packages)       |
| `pnpm dev:app`      | Start Vite dev server only                       |
| `pnpm dev:theme`    | Watch and rebuild ui-theme                       |
| `pnpm dev:library`  | Watch and rebuild ui-library                     |
| `pnpm create-prs`   | Create PRs for your changes                      |
| `pnpm install:toolkit` | Install frontend-toolkit to ~/.claude/        |
| `pnpm build`        | Build production bundle                          |
| `pnpm test`         | Run all tests                                    |
| `pnpm lint:check`   | Check code formatting                            |

## 🏗️ Architecture

```
designer-playground/
├── src/                    # Main application code
├── packages/               # Workspace packages (git submodules)
│   ├── ui-theme/          # Submodule: hivemq/ui-theme
│   ├── ui-library/        # Submodule: hivemq/ui-shell
│   └── frontend-toolkit/  # Submodule: hivemq/frontend-toolkit
└── scripts/               # Automation scripts
    ├── setup.sh           # Initial setup
    ├── dev.sh             # Development environment
    └── create-prs.mjs     # PR creation automation
```

### How Hot-Reload Works

```
You edit: packages/ui-theme/theme/src/colors.ts
    ↓
ui-theme watcher rebuilds to dist/ (~100ms)
    ↓
Vite dev server detects change
    ↓
Browser updates via HMR (~500ms)
    ↓
Total time: <1 second!
```

## 🔧 Technical Details

### pnpm Workspaces

This repo uses pnpm workspaces with the `workspace:*` protocol to link packages locally:

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/ui-theme/theme'
  - 'packages/ui-library'
```

This enables hot-reload while maintaining separate git repositories for each package.

### Vite Configuration

The `vite.config.ts` includes critical settings for workspace hot-reload:

```typescript
export default defineConfig({
  server: {
    fs: { allow: ['..'] }, // Allow serving from workspace
    watch: { ignored: ['!**/packages/**'] }, // Watch packages
  },
  optimizeDeps: {
    exclude: ['@hivemq/ui-theme', '@hivemq/ui-library'], // Don't pre-bundle
  },
})
```

### Git Submodules

Each package is a git submodule, meaning it has its own git history. This allows you to:

- Make changes locally
- Create feature branches
- Push to the original repo
- Create PRs back to the source

## 🐛 Troubleshooting

### Hot-reload not working

1. Make sure all watch processes are running (`pnpm dev`)
2. Check that packages built successfully on startup
3. Try restarting the dev server

### Changes not showing up

1. Verify you're editing files in `packages/*/src/` (not `dist/`)
2. Check the console for build errors
3. Ensure TypeScript compilation succeeded

### Can't create PR

1. Verify `gh` CLI is installed and authenticated: `gh auth status`
2. Check that you have push access to the repo
3. Ensure you're not on `main` branch in the submodule

### Submodules out of sync

If upstream repos have changed, update submodules:

```bash
git submodule update --remote
cd packages/ui-theme && pnpm install && pnpm build
cd ../ui-library && pnpm install && pnpm build
cd ../..
```

## 📖 Further Reading

- [Designer Workflow Guide](./docs/DESIGNER_WORKFLOW.md) - Detailed guide for designers
- [APP-612](https://linear.app/hivemq/issue/APP-612) - Original Linear ticket
- [pnpm Workspaces](https://pnpm.io/workspaces) - Documentation on workspaces
- [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) - Understanding submodules

## 🤝 Contributing

This repo is designed for rapid experimentation. When you have changes you want to share:

1. Use `pnpm create-prs` to create PRs to the original repos
2. Your PRs will be reviewed in the context of the main packages
3. Once merged, the changes become available to all projects

## 📝 License

Apache-2.0 (same as HiveMQ projects)
