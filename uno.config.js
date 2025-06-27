import { defineConfig, presetIcons, presetUno, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetIcons({
      collections: {
        // 可以添加更多图标集合
        weui: () => import('@iconify-json/weui/icons.json').then((i) => i.default)
      }
    })
  ],
  shortcuts: [
    // 自定义快捷方式
    [
      'btn',
      'px-4 py-2 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
    ],
    ['btn-primary', 'bg-blue-500 hover:bg-blue-600 text-white'],
    ['btn-secondary', 'bg-gray-500 hover:bg-gray-600 text-white'],
    ['card', 'bg-white rounded-lg shadow-md p-6'],
    ['flex-center', 'flex items-center justify-center'],
    ['text-gradient', 'bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent']
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      }
    },
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
    [/^min-w-(\d+)$/, ([, d]) => ({ 'min-width': `${d * 0.25}rem` })],
    // 滚动条规则
    ['scrollbar-thin', { 'scrollbar-width': 'thin' }],
    ['scrollbar-none', { 'scrollbar-width': 'none' }],
    [
      /^scrollbar-thumb-(.+)$/,
      ([, color]) => {
        const colorMap = {
          'gray-300': '#d1d5db',
          'gray-400': '#9ca3af',
          'gray-500': '#6b7280'
        }
        return { 'scrollbar-color': `${colorMap[color] || color} transparent` }
      }
    ],
    [
      /^scrollbar-track-(.+)$/,
      ([, color]) => {
        const colorMap = {
          'gray-100': '#f3f4f6',
          'gray-200': '#e5e7eb'
        }
        return { 'scrollbar-color': `currentColor ${colorMap[color] || color}` }
      }
    ]
  ],
  safelist: [
    // 确保这些类不会被清除
    'bg-gradient-to-r',
    'from-blue-500',
    'to-purple-600',
    'bg-clip-text',
    'text-transparent',
    'scrollbar-thin',
    'scrollbar-thumb-gray-300',
    'scrollbar-track-gray-100',
    'hover:scrollbar-thumb-gray-400'
  ]
})
