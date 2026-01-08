import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // bind to all network interfaces so other devices on the LAN can connect
    host: true,
    // default port is 5173, you can change it if needed
    port: 5173,
  },
  preview: {
    // allow preview to be reachable on the LAN as well
    host: true,
    port: 5173,
  },
  build: {
    // Optimize build output
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/auth'],
          'icons-vendor': ['lucide-react'],
        },
      },
    },
    // Enable minification (use esbuild for faster builds, or terser for better compression)
    minify: 'esbuild', // Faster than terser, good compression
    // Uncomment below and install terser for better compression (slower build)
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true, // Remove console.logs in production
    //   },
    // },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/firestore'],
  },
})


