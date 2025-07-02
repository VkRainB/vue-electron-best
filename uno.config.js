import { defineConfig, presetIcons, presetWind3 } from 'unocss'

import icons from '@iconify-json/weui/icons.json'

const generateSafeList = () => {
  return Object.keys(icons.icons).flatMap((item) => {
    return `i-weui-${item}`
  })
}

const safeList = generateSafeList()

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      collections: {
        weui: () => import('@iconify-json/weui/icons.json').then((i) => i.default)
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],
  safelist: safeList,
  shortcuts: [
    // 自定义快捷方式
    ['card', 'bg-white rounded-lg shadow-md p-6'],
    ['flex-center', 'flex items-center justify-center']
  ],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  rules: [
    // 自定义规则
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d}px` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${d}px` })],
    // 高度规则
    [/^h-(\d+)$/, ([, d]) => ({ height: `${d * 0.25}rem` })],
    // z-index 规则
    [/^z-(\d+)$/, ([, d]) => ({ 'z-index': d })],
    // 文本大小规则
    [/^text-(\d+(?:\.\d+)?)$/, ([, d]) => ({ 'font-size': `${d * 0.25}rem` })],
    // 圆角规则
    [/^rounded-(\d+)$/, ([, d]) => ({ 'border-radius': `${d * 0.25}rem` })],
    // 最小宽度规则
    [/^min-w-(\d+)$/, ([, d]) => ({ 'min-width': `${d * 0.25}rem` })]
  ]
})
