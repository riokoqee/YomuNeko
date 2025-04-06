import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/YomuNeko/",
  server: {
    proxy: {
      '/api': 'http://localhost:3001', // Прокси для запросов к серверу
    },
  },
})
