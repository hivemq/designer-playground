#!/bin/bash
set -e

echo "🚀 Setting up designer-playground..."
echo ""

# Initialize and update submodules
echo "📦 Updating git submodules..."
git submodule update --init --recursive
echo "✅ Submodules updated"
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
