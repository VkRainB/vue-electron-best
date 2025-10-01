import icons from '@iconify-json/weui/icons.json';

import { defineConfig, presetIcons, presetWind3, transformerDirectives } from 'unocss';

function generateSafeList() {
  return Object.keys(icons.icons).flatMap((item) => {
    return `i-weui-${item}`;
  });
}
const wrapperTargetMap = {
  input: '.el-input__wrapper',
  select: '.el-select__wrapper',
  button: 'button',
};
const safeList = generateSafeList();

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      collections: {
        weui: () => import('@iconify-json/weui/icons.json').then((i) => i.default),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerDirectives()],
  safelist: safeList,
  shortcuts: {
    // 自定义快捷方式
    'flex-center': 'flex items-center justify-center',
  },
  theme: {
    breakpoints: {
      xs: '300px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  variants: [
    // wrapper-* variant
    (matcher) => {
      const wrapperMatch = matcher.match(/^wrapper-(\w+):(.*)$/);
      if (!wrapperMatch) return matcher;

      const [, key, rest] = wrapperMatch;
      const targetSelector = wrapperTargetMap[key];
      if (!targetSelector) return matcher;

      return {
        matcher: rest,
        selector: (s) => `${s} ${targetSelector}`,
      };
    },
  ],
  rules: [],
});
