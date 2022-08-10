import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// vite.config.ts
import viteEslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteEslint()]
});
