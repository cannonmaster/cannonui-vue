import inquirer from 'inquirer';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import q from './utils/q';
import template from './utils/template';
import chalk from 'chalk';
import { SIDEBAR, frameworks, KNOWN_LANGUAGE_CODES } from '../src/config';
import prettier from 'prettier';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let cmp = {
  version: '1.0.0',
  name: '',
  type: '',
  cName: '',
  desc: '',
  sort: 0,
  show: true,
  author: '',
  category: '',
};
let cmpPath = '';
let filePath = '';
let content = '';
enum PathExistValidate {
  No = 0,
  Yes = 1,
}
function folderGenerate() {
  const cmpName = cmp.name;
  cmpPath = join(__dirname, '../src/cmpStore/') + cmpName;
  if (!existsSync(cmpPath)) mkdirSync(cmpPath);

  return returnGenerate('组件文件夹创建成功');
}
function indexGenerate() {
  frameworks.forEach((framework) => {
    const dir = `${cmpPath}/${framework}`;
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    filePath = join(`${dir}/`, 'index.ts');
    if (framework === 'vue') content = template('index_vue', cmp.name);
    if (framework === 'react') content = template('index_react', cmp.name);
    writeFile();
  });
  return returnGenerate('index 文件创建完成');
}
function cmpGenerate() {
  // e.g cmppath = 'cmpStore/VirtualList'
  // e.g cmp.name = 'VirtualList'
  frameworks.forEach((framework: any) => {
    const fileExt = framework === 'vue' ? 'vue' : 'tsx';
    filePath = join(
      `${cmpPath}/${framework}/`,
      `${cmp.name.toLowerCase()}.${fileExt}`
    );
    content = template(framework, cmp.name);
    writeFile();
  });

  return returnGenerate('react 文件创建完成');
}
function cssGenerate() {
  filePath = join(`${cmpPath}`, `${cmp.name.toLowerCase()}.scss`);
  content = template('css', cmp.name);
  writeFile();

  return returnGenerate('css 文件创建完成');
}
function demoGenerate() {
  frameworks.forEach((framework) => {
    const fileExt = framework === 'vue' ? 'vue' : 'tsx';
    filePath = join(`${cmpPath}/${framework}/`, `demo.${fileExt}`);
    content = template(`${framework}_demo` as any, cmp.name);
    writeFile();
  });

  return returnGenerate('demo 文件创建完成');
}
function docGenerate() {
  frameworks.forEach((framework) => {
    filePath = join(`${cmpPath}/${framework}/`, 'doc.md');
    content = template('doc', cmp.name);
    writeFile();
  });

  return returnGenerate('doc 文件创建完成');
}
function packageJsonUpdate() {
  const category = cmp.category.split('-');
  KNOWN_LANGUAGE_CODES.forEach((lang) => {
    frameworks.forEach((framework) => {
      if (lang === 'zh-CN') {
        SIDEBAR[lang][framework][category[1]] =
          SIDEBAR[lang][framework][category[1]] || [];
        SIDEBAR[lang][framework][category[1]].push({
          text: `${cmp.cName}`,
          link: `${lang}/${framework}/${cmp.name.toLowerCase()}`,
          show: true,
        });
      }

      if (lang === 'en') {
        SIDEBAR[lang][framework][category[0]] =
          SIDEBAR[lang][framework][category[0]] || [];
        SIDEBAR[lang][framework][category[0]].push({
          text: `${cmp.name}`,
          link: `${lang}/${framework}/${cmp.name.toLowerCase()}`,
          show: true,
        });
      }
    });
  });

  filePath = join(__dirname, '../src/sidebar.json');
  content = JSON.stringify(SIDEBAR, null, 4);

  writeFile(PathExistValidate.No);
  return returnGenerate('json 文件更新完成');
}
function addPage() {
  KNOWN_LANGUAGE_CODES.forEach((lang) => {
    frameworks.forEach((framework) => {
      filePath = join(
        __dirname,
        `../src/pages/${lang}/${framework}`,
        `${cmp.name.toLowerCase()}.mdx`
      );
      content = template('page', cmp.name);
      writeFile();
    });
  });
  return returnGenerate('页面添加成功');
}
function returnGenerate(message: string) {
  return new Promise((resolve, reject) => {
    console.log(chalk.green(message));
    resolve(message);
  });
}
function formatFile(
  file: string,
  filepath: string,
  options = { semi: false, filepath }
) {
  return prettier.format(file, options);
}
function writeFile(checkPathExists = PathExistValidate.Yes) {
  if (!checkPathExists) {
    writeFileSync(filePath, formatFile(content, filePath));
    return;
  }
  if (!existsSync(filePath)) {
    writeFileSync(filePath, formatFile(content, filePath));
    return;
  }
  throw Error(`${filePath} 已经存在！`);
}
async function generateCmp() {
  await folderGenerate();
  await indexGenerate();
  await cmpGenerate();
  await cssGenerate();
  await demoGenerate();
  await docGenerate();
  await packageJsonUpdate();
  await addPage();

  console.log(chalk.green(`${cmp.name}组件创建完成🍺`));
}
function init() {
  inquirer.prompt(q.cmpQ).then((res) => {
    cmp = Object.assign(cmp, res);

    generateCmp();
  });
}
init();
