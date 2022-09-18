import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import glsl from 'vite-plugin-glsl';
import viteEslint from 'vite-plugin-eslint';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

export default defineConfig({
  plugins: [vue(), viteEslint(), glsl(), vueJsx()],
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.jsx', '.tsx', '.json', '.vue'],
    // 别名配置
    alias: {
      '@': path.join(__dirname, 'src'),
      '@assets': path.join(__dirname, 'src/assets'),
      '@comps': path.join(__dirname, 'src/components'),
      '@utils': path.join(__dirname, 'src/utils'),
      '@router': path.join(__dirname, 'src/router'),
      '@store': path.join(__dirname, 'src/store'),
    },

  },
});
