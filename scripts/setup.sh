#!/bin/bash
set -e

echo "🚀 Setting up designer-playground..."
echo ""

# Initialize and update submodules
echo "📦 Updating git submodules..."
git submodule update --init --recursive
echo "✅ Submodules updated"
echo ""

# Relax engine requirements in workspace packages
# ui-theme requires node 22 / pnpm 10, ui-library requires node 20 / pnpm 9
# In the playground we accept any compatible version
echo "🔧 Patching workspace package engines for compatibility..."
node -e "
const fs = require('fs');
for (const p of ['packages/ui-theme/theme/package.json', 'packages/ui-library/package.json']) {
  const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
  pkg.engines = { node: '>=20' };
  delete pkg.packageManager;
  fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
}
"
echo "✅ Engines patched"
echo ""

# Install all dependencies (root + workspaces)
echo "📦 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo ""

# Build workspace packages initially
echo "🔨 Building workspace packages..."
echo "  Building @hivemq/ui-theme..."
pnpm --filter @hivemq/ui-theme build
echo "  Building @hivemq/ui-library..."
pnpm --filter @hivemq/ui-library build
echo "✅ Workspace packages built"
echo ""

# Install frontend-toolkit to ~/.claude/
echo "🔧 Installing frontend-toolkit..."
cd packages/frontend-toolkit && ./install.sh --install && cd ../..
echo "✅ Frontend-toolkit installed"
echo ""

echo "✨ Setup complete!"
echo ""
echo "To start development, run:"
echo "  pnpm dev"
echo ""
