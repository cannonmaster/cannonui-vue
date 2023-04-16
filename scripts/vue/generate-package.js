import fs from 'fs/promises';
import path from 'path';

const packageJson = {
  name: '@cannonui/vue',
  type: 'module',
  version: '0.8.3',
  private: false,
  files: ['*'],
  main: './cannon-vue.umd.cjs',
  module: './cannon-vue.esm.js',
  types: './types/cmpStore/main.vue.d.ts',
  exports: {
    '.': {
      import: './cannon-vue.esm.js',
      require: './cannon-vue.umd.cjs'
    },
    './cannonVue/style.css': './style.css'
  }
};

(async () => {
  try {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.resolve(__dirname, '../../cannonVue/package.json');
    await fs.writeFile(filePath, JSON.stringify(packageJson, null, 2));
    console.log('File created successfully!');
  } catch (err) {
    console.error(err);
  }
})();
