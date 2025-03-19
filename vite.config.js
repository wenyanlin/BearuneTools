import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';
import Layouts from 'vite-plugin-vue-layouts';
import { resolve } from 'path'; 

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        page1: resolve(__dirname, "index.html"),
      }
    }
  },
  plugins: [
    vue(),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'MainLayout',
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',  // 綁定到所有本地IP
    strictPort: true, // 若該端口被佔用，則報錯而不是自動選擇另一個端口
    // proxy: {
    //   '/docs': {
    //     target: 'http://localhost:8080', // VitePress 開發伺服器地址
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/docs/, '')
    //   }
    // }
  },
})
