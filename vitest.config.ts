import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { type ViteUserConfig, defineConfig } from 'vitest/config'

const EXCLUDE_FILES = [
  '**/__generated__/**',
  '**/node_modules/**',
  '**/*.d.ts',
  '**/__test-utils__/**',
  'src/main.tsx',
]

type TestSuite = 'unit' | 'component'

const suite = process.env.TEST_SUITE as TestSuite

if (!suite) {
  throw new Error('TEST_SUITE is not defined')
}

const DEFAULT_TEST_CONFIG: ViteUserConfig['test'] = {
  reporters: ['default', 'junit'],
}

const TEST_SUITE_CONFIG: Record<TestSuite, ViteUserConfig['test']> = {
  unit: {
    include: ['**/*.spec.{js,mjs,cjs,ts,mts,cts}'],
    exclude: ['**/*.{jsx,tsx}'].concat(EXCLUDE_FILES),
    coverage: {
      include: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
      exclude: ['**/*.spec.{js,mjs,cjs,ts,mts,cts}', 'src/hooks/*.ts'].concat(EXCLUDE_FILES),
    },
  },
  component: {
    setupFiles: './src/__test-utils__/components-setup.tsx',
    environment: 'happy-dom',
    include: ['**/*.spec.{jsx,tsx}'],
    exclude: ['**/*.{js,mjs,cjs,ts,mts,cts}'].concat(EXCLUDE_FILES),
    coverage: {
      include: ['src/**/*.{jsx,tsx}', 'src/hooks/*.ts'],
      exclude: ['**/*.spec.{jsx,tsx}'].concat(EXCLUDE_FILES),
    },
  },
}

export default defineConfig({
  test: Object.assign({}, DEFAULT_TEST_CONFIG, TEST_SUITE_CONFIG[suite]),
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@pulse/api': resolve(__dirname, './src/api/__generated__'),
    },
  },
})
