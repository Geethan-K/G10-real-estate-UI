import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
//import './src/App.jsx'
export default defineConfig({
  cors: {
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  },
  plugins: [react({
    jsxRuntime: 'automatic', // Enable automatic JSX runtime
  }),
    federation({
      name: 'chatApp', // Name of your remote app
      filename: 'remoteEntry.js',
      remotes: {
        host: 'http://localhost:5000/dist/assets/remoteEntry.js', 
      },
      exposes: {
        './ChatBox': './src/App.jsx', // Expose your ChatBox component
      },
      shared: ['react', 'react-dom','react-router-dom','timeago.js', 'react-redux', '@reduxjs/toolkit'],
    }),
  ],
  build: {
    target: 'esnext',
    assetsDir: 'assets', // Ensure assets are served from the correct directory
    rollupOptions: {
      external: ['host/ApiRequest','host/AuthContext','host/SocketContext','host/TestValue','host/SharedStore'], 
      output: {
        entryFileNames: 'assets/[name].js',  // Make sure the entry file is placed under /assets
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
