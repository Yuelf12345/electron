import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    // port: 6000,
    // open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/sockjs-node': {
        target: 'http://127.0.0.1:3000',
        ws: false,
        changeOrigin: true
      }
    }
  },
  build: {
    // outDir: 'dist',
    // assetsDir: 'static',
    // emptyOutDir: true,
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor'
        }
        if (id.includes('view')) {
          return 'view'
        }
      }
    }
  }
})
