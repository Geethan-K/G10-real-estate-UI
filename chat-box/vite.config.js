import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',  // Specify the host
    port: 3001,         // Specify the port (e.g., 3001)
    open: true,         // Open the browser automatically
  },
  plugins: [react()],
})
