import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/app/static/', // the trailing slash is important!
  build: {
    chunkSizeWarningLimit: 2000,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // authError: resolve(__dirname, 'auth-error.html'),
      },
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@pulse/api': resolve(__dirname, './src/api/__generated__'),
      // We have to manually resolve the mqtt module to ESM because our project is using modular imports.
      // MQTT.js is exposing a commonjs module by default.
      mqtt: resolve(__dirname, './node_modules/mqtt/dist/mqtt.esm.js'),
    },
  },
})
