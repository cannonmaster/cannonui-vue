import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig((config) => ({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      sourcemap: true,
      brotliSize: true,
      entry: resolve(__dirname, 'src/cmpStore/main.vue.ts'),
      name: 'CannonVue',
      // the proper extensions will be added
      fileName: 'cannon-vue',
      formats: ['esm', 'umd', 'iife'],
      cssCodeSplit: true,
      chunkSizeWarningLimit: 500,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
    outDir: 'cannonVue',
  },
  esbuild: {
    drop: config.mode !== 'development' ? ['console', 'debugger'] : [],
  },
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
  plugins: [
    dts({
      outputDir: path.resolve(__dirname, './cannonVue/types/'),
      copyDtsFiles: false,
      beforeWriteFile: (filePath, contents) => {
        if (
          !filePath.endsWith('main.vue.d.ts') &&
          filePath.endsWith('.vue.d.ts')
        ) {
          const folderName = filePath.split('/').slice(-3, -2)[0];
          const componentName = `cannonui-${folderName.toLowerCase()}`;
          const append = `
declare module 'vue' {
  interface GlobalComponents {
      '${componentName}': typeof _sfc_main;
  }
}`;
          return {
            filePath,
            content: `
              ${contents}\n\n
              ${append}   
            `,
          };
        }
        return {
          filePath,
          content: contents,
        };
      },
    }),
    vue(),
  ],
}));
