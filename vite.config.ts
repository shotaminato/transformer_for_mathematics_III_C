import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS
    ? '/transformer_for_mathematics_III_C/'
    : '/',
  plugins: [react()],
})
