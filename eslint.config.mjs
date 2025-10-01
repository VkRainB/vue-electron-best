import antfu from '@antfu/eslint-config';

// 使用 antfu 配置
export default antfu({
  vue: {
    overrides: {
      'vue/eqeqeq': 'off',
      'vue/html-self-closing': ['warn', { html: { normal: 'never', void: 'always' } }],
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
  stylistic: false,
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'antfu/top-level-function': 'warn',
    'unicorn/prefer-includes': 'off',
    'new-cap': ['off', { newIsCap: true, capIsNew: false }],
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-returns-check': 'off',
    'no-console': 'off',
    eqeqeq: 'off',
    'array-callback-return': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', argsIgnorePattern: '^_', caughtErrors: 'none' },
    ],
    '@stylistic/arrow-parens': 'off',
    'antfu/if-newline': 'off',
    'style/brace-style': 'off',
  },
  ignores: ['**/dist/**', '**/out/**', '**/node_modules/**', '**/*.min.js', '**/build/**', 'frontend/types/**'],
  languageOptions: {
    globals: {
      ipc: 'readonly',
    },
  },
});
