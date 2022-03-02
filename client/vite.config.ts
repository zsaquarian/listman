/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { getAliases } from 'vite-aliases';
import preprocess from 'svelte-preprocess';

const aliases = getAliases();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ preprocess: preprocess(), hot: !process.env.VITEST })],
  publicDir: './assets/',
  build: {
    outDir: './public/',
    minify: 'esbuild',
    target: 'esnext',
  },
  resolve: {
    alias: aliases,
  },
  optimizeDeps: { exclude: ['@roxi/routify', '@urql/svelte'] },
  test: {
    environment: 'jsdom',
    deps: { inline: ['@steeze-ui/svelte-icon', 'luxon'] },
    coverage: {
      all: true,
      exclude: [
        'android/**',
        'assets/**',
        'capacitor.config.ts',
        'codegen.yml',
        'cypress/**',
        'index.html',
        'postcss.config.cjs',
        'public/**',
        'vite.config.ts',
        '.lintstagedrc.js',
        'svelte.config.js',
        'tailwind.config.cjs',
        '.routify/**',
        'test/**',
      ],
    },
    setupFiles: './test/setup.ts',
  },
});
