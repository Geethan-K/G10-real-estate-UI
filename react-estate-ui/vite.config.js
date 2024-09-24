// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

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
      remotes: {
        chatApp: 'http://localhost:3001/assets/remoteEntry.js', // Point to your remote app's URL
      },
    }),
  ],
});
