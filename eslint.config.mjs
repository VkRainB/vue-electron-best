import antfu from '@antfu/eslint-config';

export default antfu({
  vue: {
    overrides: {
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
    },
  },
  stylistic: false,
  rules: {
    'new-cap': ['off', { newIsCap: true, capIsNew: false }],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', argsIgnorePattern: '^_', caughtErrors: 'none' },
    ],
  },
  ignores: ['**/dist/**', '**/out/**', '**/node_modules/**', '**/*.min.js', '**/build/**', 'frontend/types/**'],
  languageOptions: {
    globals: {
      ipc: 'readonly',
    },
  },
});
