import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'; // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() , 
    federation({
      name: "shell",
      remotes: {
        newsfeed: "http://localhost:3001/_next/static/chunks/remoteEntry.js'",
      },
      shared: ["react", "react-dom"]
    })
  ],
  build: {
    target: 'esnext',
  },
})
