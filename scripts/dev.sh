#!/bin/bash

echo "🚀 Starting designer-playground development environment..."
echo ""
echo "This will start 3 watch processes:"
echo "  📱 APP     - Vite dev server (http://localhost:5175)"
echo "  🎨 THEME   - ui-theme build watcher"
echo "  📦 LIBRARY - ui-library build watcher"
echo ""
echo "Press Ctrl+C to stop all processes"
echo ""

# Start all processes in parallel with colored output
pnpm concurrently \
  --names "APP,THEME,LIBRARY" \
  --prefix-colors "cyan,magenta,yellow" \
  "pnpm dev:app" \
  "pnpm dev:theme" \
  "pnpm dev:library"
