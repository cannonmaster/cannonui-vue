import fs from 'fs/promises';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
(async () => {
  try {
    const sourceDir = path.join(__dirname, '../');
    const destDir = path.join(__dirname, '../cannonVue');

    // Copy README.md
    const readmeSrcPath = path.join(sourceDir, 'README.md');
    const readmeDestPath = path.join(destDir, 'README.md');
    await fs.copyFile(readmeSrcPath, readmeDestPath);

    // Copy LICENSE
    const licenseSrcPath = path.join(sourceDir, 'LICENSE');
    const licenseDestPath = path.join(destDir, 'LICENSE');
    await fs.copyFile(licenseSrcPath, licenseDestPath);

    console.log('Files copied successfully!');
  } catch (err) {
    console.error(err);
  }
})();
