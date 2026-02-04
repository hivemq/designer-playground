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
    // hmr: false,
    port: 5175,
    // fs: {
    //   allow: [
    //     searchForWorkspaceRoot(process.cwd()),
    //     '../../hivemq-platform-sdk/control-center-frontend-sdk',
    //     '../../hivemq-kafka-extension/kafka-control-center-frontend',
    //   ],
    // },
  },
})
