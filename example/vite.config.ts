import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import nameSpace from 'vite-plugin-name-space';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), nameSpace()],
});
