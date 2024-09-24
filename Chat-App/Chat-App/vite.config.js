import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
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
      exposes: {
        './ChatBox': './src/App.jsx', // Expose your ChatBox component
      },
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
