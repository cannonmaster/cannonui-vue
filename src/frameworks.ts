import { frameworks } from './config';
export const getCurrentFramework = (url: string) => {
  const match = frameworks.map((framework: string) => {
    const match = `/(${framework})/`;
    return new RegExp(match);
  });

  match.forEach((pattern) => {
    const isMatch = url.match(pattern);
    if (isMatch) {
      const framework = isMatch[1];

      return framework as typeof frameworks[number];
    }
  });

  return 'vue' as typeof frameworks[number];
};
