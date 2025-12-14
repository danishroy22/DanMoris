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
})


