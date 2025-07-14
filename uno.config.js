import icons from '@iconify-json/weui/icons.json';

import { defineConfig, presetIcons, presetWind3 } from 'unocss';

function generateSafeList() {
  return Object.keys(icons.icons).flatMap((item) => {
    return `i-weui-${item}`;
  });
}

const safeList = generateSafeList();

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      collections: {
        weui: () => import('@iconify-json/weui/icons.json').then(i => i.default),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  safelist: safeList,
  shortcuts: [
    // 自定义快捷方式
    ['card', 'bg-white rounded-lg shadow-md p-6'],
    ['flex-center', 'flex items-center justify-center'],
  ],
  theme: {
    breakpoints: {
      'xs': '300px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  rules: [
    // 自定义规则
  ],
});
