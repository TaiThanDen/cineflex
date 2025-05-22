import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { inspectorServer } from '@react-dev-inspector/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),inspectorServer(),],
  
})
