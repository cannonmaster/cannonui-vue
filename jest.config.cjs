module.exports = {
  moduleFileExtensions: ['vue', 'js', 'ts', 'tsx'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  testPathIgnorePatterns: [
    './node_modules',
    './dist',
    './scripts',
    './src/styles',
    '<rootDir>/src/cmpStore/\\*\\*/\\*\\.(css|scss)$',
  ],
  transform: {
    '^.+\\.vue$': require.resolve('@vue/vue3-jest'), // vue 文件用 vue-jest 转换
    '^.+\\.[jt]sx?$': 'ts-jest', // ts 文件用 ts-jest 转换,
  },
  // 匹配 __test__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
  testRegex: '(/__test__/*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  //testRegex: '__tests__.action.spec.ts',
  // 支持源代码中相同的 `@` -> `src` 别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  // 是否开启将测试覆盖率信息输出为报告
  collectCoverage: false,
  // 报告应从那些文件中收集
  collectCoverageFrom: [
    'src/cmpStore/**/*.{js,jsx,ts,tsx,vue}',
    '!**/node_modules/**',
    '!**/demo.tsx/**',
    '!**/demo.vue/**',
  ],
};
