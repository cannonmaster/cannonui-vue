import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import path from 'path';
import { fileURLToPath } from 'url';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src/'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
  },
  integrations: [
    // Enable Preact to support Preact JSX components.
    preact(),
    // Enable React for the Algolia search component.
    react(),
    mdx(),
    vue(),
  ],
  site: `http://astro.build`,
});
