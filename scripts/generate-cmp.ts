import inquirer from 'inquirer';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import q from './utils/q';
import template from './utils/template';
import chalk from 'chalk';
import * as nav from '../src/config';
import prettier from 'prettier';
// const prettier = require('prettier');
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
const frameworks = ['react', 'vue'];
const lang = ['en', 'zh-CN'];
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
    content = template('index', cmp.name);
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
  frameworks.forEach((framework) => {
    filePath = join(
      `${cmpPath}/${framework}`,
      `${cmp.name.toLowerCase()}.scss`
    );
    content = template('css', cmp.name);
    writeFile();
  });

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
  lang.forEach((lang) => {
    if (lang === 'zh-CN') {
      nav.SIDEBAR[lang][category[1]] = nav.SIDEBAR[lang][category[1]] || [];
      nav.SIDEBAR[lang][category[1]].push({
        text: `${cmp.cName}`,
        link: `${lang}/${cmp.name}`,
      });
    }

    if (lang === 'en') {
      nav.SIDEBAR[lang][category[0]] = nav.SIDEBAR[lang][category[0]] || [];
      nav.SIDEBAR[lang][category[0]].push({
        text: `${cmp.name}`,
        link: `${lang}/${cmp.name}`,
      });
    }
  });

  filePath = join(__dirname, '../src/config.ts');
  content = JSON.stringify(nav, null, 4);
  writeFile();
  return returnGenerate('json 文件更新完成');
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
function writeFile() {
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
  // await packageJsonUpdate();

  console.log(chalk.green(`${cmp.name}组件创建完成🍺`));
}
function init() {
  inquirer.prompt(q.cmpQ).then((res) => {
    cmp = Object.assign(cmp, res);

    generateCmp();
  });
}
init();
