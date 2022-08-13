import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import glsl from 'vite-plugin-glsl';
// vite.config.ts
import viteEslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteEslint(), glsl()],
  resolve: {
    // 别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets'),
    },
  },
});
