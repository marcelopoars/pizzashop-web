import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, UserConfig } from 'vite'
import { InlineConfig } from 'vitest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
  },
} as UserConfig & {
  test: InlineConfig
})
