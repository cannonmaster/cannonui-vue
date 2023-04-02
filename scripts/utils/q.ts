import { SIDEBAR, KNOWN_LANGUAGE_CODES, frameworks } from '../../src/config';
const q = {
  cmpQ: [
    {
      type: 'input',
      name: 'name',
      message: '组件英文名(每个单词的首字母都大写，如TextBox)：',
      validate(name: string) {
        frameworks.forEach((framework) => {
          Object.entries(SIDEBAR['en'][framework]).forEach(([, children]) => {
            children.forEach((cmp) => {
              if (cmp.text === name) {
                return '组件已经存在！';
              }
            });
          });
        });
        if (name && name.match(/^[A-Z]/) && !/[^A-Za-z0-9]+/.test(name))
          return true;
        else return '组件名字需要使用大驼峰规则, 只能包含字母和数字';
      },
    },
    {
      type: 'input',
      name: 'cName',
      message: '组件中文名字(不能超过10个子)：',
      validate(value: string) {
        if (value && value.length <= 10) return true;
        return '不能超过10个字符';
      },
    },
    {
      type: 'input',
      name: 'author',
      message: '组件作者：',
    },
    {
      type: 'list',
      name: 'category',
      choices: [
        'General-基础组件',
        'Layout-布局组件',
        'Display-数据展示',
        'Nav-导航组件',
        'Feedback-操作反馈',
        'Featured-特色组件',
      ],
      message: '请选择组件分类(输入编号)：',
      validate(value: string) {
        return true;
        // if (/^[1-7]$/.test(value)) {
        //   return true;
        // }
        // return '请选择对应的组件类型前的数字';
      },
    },
  ],
};
export default q;
