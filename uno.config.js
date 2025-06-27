import { defineConfig, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      collections: {
        // 可以添加更多图标集合
        weui: () => import('@iconify-json/weui/icons.json').then((i) => i.default)
      }
    })
  ],
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
