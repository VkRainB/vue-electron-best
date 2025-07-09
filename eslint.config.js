import antfu from '@antfu/eslint-config';

// 使用 antfu 配置
export default antfu({
  vue: {
    overrides: {
      'vue/block-order': [
        'error',
        {
          order: [['template', 'script'], 'style'],
        },
      ],
    },
  },
  stylistic: {
    indent: 2, // 缩进
    semi: true, // 语句分号
    quotes: 'single', // 单引号
  },
  rules: {
    'new-cap': ['off', { newIsCap: true, capIsNew: false }],
    'no-console': 'off', // 忽略console
  },
  ignores: ['**/dist/**', '**/out/**', '**/node_modules/**', '**/*.min.js', '**/build/**', 'frontend/types/**'],
});
