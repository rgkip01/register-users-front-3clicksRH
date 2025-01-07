import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite que o servidor escute em 0.0.0.0
    port: 5173, // Porta padrão do Vite
    watch: {
      usePolling: true, // Necessário para hot reload com Docker
    },
  },
})
