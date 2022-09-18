import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';
const useDevMode = true;

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:8081/',
  plugins: [
    // useDevMode = true 时不开启热更新
    vue(),
    qiankun('webgl-fundamentals', {
      useDevMode
    })
  ],
  server: {
    port: 8081,
    cors: true,
    origin: 'http://localhost:8081'
  },

});
