// eslint.config.js (ESLint 9+ 扁平配置)
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // 基础配置
    vue: true,
    typescript: true,
    unocss: true,
    
    // 格式化相关 - 与 Prettier 保持一致
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
      trailingComma: 'none'
    },
    
    // 忽略文件
    ignores: [
      'dist',
      'node_modules',
      '*.min.js',
      'out'
    ]
  },
  
  // 自定义规则覆盖
  {
    rules: {
      // 导入顺序规则 (antfu 配置已包含，这里是自定义调整)
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',       // Node.js 内置模块
            'external',      // 外部依赖
            'internal',      // 内部模块
            'parent',        // 父级目录
            'sibling',       // 同级目录
            'index'          // index 文件
          ],
          'newlines-between': 'always',
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
          },
          'pathGroups': [
            {
              'pattern': '@/**',
              'group': 'internal',
              'position': 'before'
            },
            {
              'pattern': '*.vue',
              'group': 'sibling',
              'position': 'after'
            }
          ],
          'pathGroupsExcludedImportTypes': ['builtin']
        }
      ],
      
      // 其他常用规则调整
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prefer-const': 'error',
      'no-unused-vars': 'warn'
    }
  },
  
  // Vue 特定规则
  {
    files: ['**/*.vue'],
    rules: {
      'vue/html-self-closing': [
        'error',
        {
          'html': {
            'void': 'always',
            'normal': 'always',
            'component': 'always'
          },
          'svg': 'always',
          'math': 'always'
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          'singleline': 3,
          'multiline': 1
        }
      ]
    }
  }
)