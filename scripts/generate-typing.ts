import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const typingsDir = path.join(__dirname, '../cannonVue/types/cmpStore');

// Read all directories in the typings directory
fs.promises
  .readdir(typingsDir)
  .then((dirs) => {
    // Generate import statements for each component TypeScript declaration file
    const imports = dirs
      .map((dir) => {
        const indexPath = path.join(typingsDir, dir, 'vue/index.d.ts');
        if (fs.existsSync(indexPath)) {
          return `import ${dir} from './cmpStore/${dir}/vue';\nexport { ${dir} };`;
        } else {
          console.warn(
            `No TypeScript declaration file found for component ${dir}`
          );
          return null;
        }
      })
      .filter(Boolean);
    const install = `
      declare namespace _default {
        export { install };
      }
      export function install(app: any): void;
      export default _default;
    `;
    // Write the entry file
    const entryFilePath = path.join(
      __dirname,
      '../cannonVue/types',
      'index.d.ts'
    );
    const code = install + '\n' + imports.join('\n');
    fs.promises
      .writeFile(entryFilePath, code)
      .then(() => {
        console.log(`Entry file written to ${entryFilePath}`);
      })
      .then(() => {
        prettier.format(fs.readFileSync(entryFilePath, 'utf8'), {
          filepath: entryFilePath
        });
      })
      .catch((err) => {
        console.error(`Error writing entry file: ${err}`);
      });
  })
  .catch((err) => {
    console.error(`Error reading typings directory: ${err}`);
  });
