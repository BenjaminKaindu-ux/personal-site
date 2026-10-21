import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Dev-only helper for the Writing Studio (never runs during `vite build`).
import localWriter from './local-writer-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localWriter()],
})