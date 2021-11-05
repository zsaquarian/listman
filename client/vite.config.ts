import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { getAliases } from 'vite-aliases';
import preprocess from 'svelte-preprocess';

const aliases = getAliases();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ preprocess: preprocess() })],
  publicDir: './assets/',
  build: {
    outDir: './public/',
  },
  resolve: {
    alias: aliases,
  },
  optimizeDeps: { exclude: ['@roxi/routify', '@urql/svelte'], include: ['svelte-hero-icons'] },
});
