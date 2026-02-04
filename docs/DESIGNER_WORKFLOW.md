# Designer Workflow Guide

This guide walks you through using designer-playground for rapid UI prototyping and experimentation.

## 🎨 For UX Designers

### First Time Setup

1. **Clone the repository**

   ```bash
   git clone --recursive git@github.com:hivemq/designer-playground.git
   cd designer-playground
   ```

   The `--recursive` flag automatically clones all the package submodules.

2. **Run setup**

   ```bash
   pnpm setup
   ```

   This will:
   - Initialize git submodules
   - Install all dependencies
   - Build the packages
   - Install frontend-toolkit agents to `~/.claude/`

3. **Start development**

   ```bash
   pnpm dev
   ```

   This opens 3 watch processes:
   - **APP** (cyan): Vite dev server at http://localhost:7272
   - **THEME** (magenta): ui-theme build watcher
   - **LIBRARY** (yellow): ui-library build watcher

   Keep this running while you work!

### Daily Workflow

#### Tweaking Colors and Themes

**Goal**: Experiment with different color schemes, spacing, and design tokens.

1. **Open the theme files**

   ```
   packages/ui-theme/theme/src/
   ├── colors.ts          # Color palette
   ├── semantic-tokens.ts # Semantic color mappings
   ├── index.ts          # Main theme export
   └── ...
   ```

2. **Make changes**

   Example: Change the primary blue color

   ```typescript
   // packages/ui-theme/theme/src/colors.ts
   export const blue = {
     '200': '#60A5FA', // Changed from #3B82F6
     // ...
   }
   ```

3. **See instant feedback**

   Within 1 second, your browser at http://localhost:7272 will update with the new color across all components!

4. **Experiment freely**

   - Try different color combinations
   - Adjust spacing scales
   - Tweak semantic tokens
   - All changes hot-reload immediately

#### Working with Components

**Goal**: Design and prototype new components or modify existing ones.

1. **Open ui-library files**

   ```
   packages/ui-library/src/components/
   ├── Shell.tsx          # Main app shell
   ├── Header.tsx         # Top navigation bar
   ├── Sidebar.tsx        # Side navigation
   └── ...
   ```

2. **Modify components**

   Example: Change the header layout

   ```tsx
   // packages/ui-library/src/components/Header.tsx
   export function Header() {
     return (
       <header>
         {/* Your changes here */}
       </header>
     )
   }
   ```

3. **See changes instantly**

   The browser updates automatically with your new component structure.

4. **Experiment with slots system**

   Try different layouts and slot configurations to see what works best.

### Creating a Pull Request

When you're happy with your changes and want to share them with the team:

1. **Run the PR creation script**

   ```bash
   pnpm create-prs
   ```

2. **Follow the interactive prompts**

   The script will ask you:

   - **Branch name**: Suggest something descriptive (e.g., `feature/new-primary-color`)
   - **Commit message**: Describe what you changed (e.g., `feat: update primary color for better contrast`)
   - **PR title**: Short title for the pull request
   - **PR description**: Detailed explanation of your changes
   - **PR type**: enhancement, bug, refactor, etc.
   - **Customer-facing?**: Will end users see this change?

3. **Review the created PRs**

   The script will output URLs to your pull requests. Share these with your team for review!

   Example output:
   ```
   ✨ PR created successfully!
      https://github.com/hivemq/ui-theme/pull/42
   ```

### Tips for Working with Claude Code

This playground is optimized for working with Claude Code agents. Here are some tips:

#### Using Agents for Prototyping

After running `pnpm setup`, you have access to specialized agents:

- `/agent-frontend` - React/TypeScript expert for component work
- `/agent-ux` - UX design specialist for user experience decisions
- `/agent-ui-engineer` - Figma-to-code implementation

Example conversation:

```
You: /agent-ux I want to redesign the header to be more compact
Agent: [Analyzes current header, suggests options with trade-offs]

You: I like option 2. /agent-ui-engineer Implement option 2
Agent: [Creates new header component with your specifications]
```

#### Creating New Agents

Want to create a custom agent for your workflow?

1. **Edit agents in frontend-toolkit**

   ```bash
   cd packages/frontend-toolkit/agents
   # Edit or create new agent .md files
   ```

2. **Reinstall to ~/.claude/**

   ```bash
   pnpm install:toolkit
   ```

3. **Restart Claude Code**

   The new agent will now be available!

4. **Share with the team**

   ```bash
   pnpm create-prs
   # Select frontend-toolkit
   # Your custom agent will be available to everyone!
   ```

## 🎯 Common Scenarios

### Scenario 1: Testing a New Color Scheme

**Situation**: You want to try a new color palette for the entire app.

1. Open `packages/ui-theme/theme/src/colors.ts`
2. Modify the color values
3. Watch the app update in real-time
4. Iterate until you find the perfect combination
5. Run `pnpm create-prs` to share

### Scenario 2: Redesigning the App Shell

**Situation**: You want to experiment with a new layout for the app shell with slots.

1. Open `packages/ui-library/src/components/Shell.tsx`
2. Modify the component structure
3. See changes instantly in the running app
4. Test different slot configurations
5. Once satisfied, create a PR

### Scenario 3: Prototyping with a Designer

**Situation**: A designer sends you a Figma file, and you want to quickly prototype it.

1. Use `/agent-ui-engineer` in Claude Code
2. Paste the Figma link or describe the design
3. Agent creates components in `packages/ui-library/src/components/`
4. Review and refine with instant hot-reload
5. Share the working prototype via PR

## 🐛 Common Issues

### "Hot-reload stopped working"

**Solution**:

1. Check terminal - are all 3 processes still running?
2. If any crashed, stop all (Ctrl+C) and restart: `pnpm dev`

### "I don't see my changes"

**Checklist**:

- [ ] Are you editing files in `packages/*/src/` (not `dist/`)?
- [ ] Did you save the file?
- [ ] Is the watch process running for that package?
- [ ] Check browser console for errors

### "My PR creation failed"

**Common causes**:

1. **Not authenticated with GitHub**

   ```bash
   gh auth login
   ```

2. **Branch already exists**

   Choose a different branch name when prompted

3. **No changes staged**

   Make sure you saved your files!

## 💡 Pro Tips

1. **Keep `pnpm dev` running**: Don't stop and restart unnecessarily - it takes time to rebuild
2. **Use descriptive commit messages**: Makes it easier to track changes later
3. **Create PRs frequently**: Don't wait until you have "perfect" changes
4. **Experiment fearlessly**: Git submodules keep everything separate - you can always reset
5. **Ask Claude for help**: The agents are optimized for this workflow!

## 📚 Next Steps

- Read the [main README](../README.md) for technical details
- Check out the [Linear ticket](https://linear.app/hivemq/issue/APP-612) for project goals
- Join the #design channel to share your prototypes!

Happy designing! 🎨
