// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import './src/context/TestContext'
export default defineConfig({
  server: {
    cors: {
      origin: '*',  // Allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    federation({
      name:'host',
      filename: 'remoteEntry.js',
      remotes: {
        // Point to the URL where remoteEntry.js is served
        chatApp: 'http://localhost:3001/dist/assets/remoteEntry.js',
      },
      exposes:{
        './AuthContext':'./src/context/AuthContext.jsx',
        './SocketContext':'./src/context/SocketContext.jsx',
        './ApiRequest':'./src/lib/apiRequest.js',
        './SharedStore':'./src/redux-store/shared-store.js',
        './TestValue': './src/context/TestContext.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom','react-redux','@reduxjs/toolkit','timeago.js','axios'],
    }),
  ],
  build: {
    target: 'esnext',
    assetsDir: 'assets', // Ensure assets are served from the correct directory
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',  // Make sure the entry file is placed under /assets
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
