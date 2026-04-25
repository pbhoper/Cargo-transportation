import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly', // Enables camelCase named imports
      generateScopedName: '[name]__[local]___[hash:base64:5]', // Custom name format
    },
  },
})
