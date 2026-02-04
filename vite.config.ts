import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      // We have to manually resolve the mqtt module to ESM because our project is using modular imports.
      // MQTT.js is exposing a commonjs module by default.
      mqtt: resolve(__dirname, './node_modules/mqtt/dist/mqtt.esm.js'),
    },
  },
  server: {
    port: 7272,
    fs: {
      // Allow Vite to serve files from workspace packages
      allow: ['..'],
    },
    watch: {
      // Watch workspace packages for changes
      ignored: ['!**/packages/**', '**/node_modules/**'],
    },
  },
  optimizeDeps: {
    // CRITICAL: Exclude workspace packages from pre-bundling
    // This enables hot-reload for ui-theme and ui-library
    exclude: ['@hivemq/ui-theme', '@hivemq/ui-library'],
  },
})
