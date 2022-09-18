import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
const useDevMode = true

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:7108/',
  plugins: [
    // useDevMode = true 时不开启热更新
    vue(),
    qiankun('webgl-fundamentals2', {
      useDevMode
    })
  ],
  server: {
    port: 7108,
    cors: true,
    origin: 'http://localhost:7108'
  },

})
