import { resolve } from 'node:path';
import process from 'node:process';

import { externalizeDepsPlugin } from 'electron-vite';
import { visualizer } from 'rollup-plugin-visualizer';

const root = process.cwd();
function pathResolve(dir) {
  return resolve(root, '.', dir);
}

// 主进程和预加载配置
export function createElectronConfig(entryPath) {
  return {
    plugins: [externalizeDepsPlugin()], // 外部化依赖
    build: {
      rollupOptions: {
        input: {
          index: pathResolve(entryPath),
        },
      },
    },
  };
}

// 打包配置
export function rendererBuildConfig() {
  return {
    rollupOptions: {
      input: {
        index: pathResolve('frontend/index.html'),
      },
      plugins: [
        visualizer({
          filename: 'temp/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap', // flamegraph 火焰图
        }),
      ],
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        advancedChunks: {
          minSize: 30 * 1024, // 最小chunk 30KB
          maxSize: 400 * 1024, // 最大chunk 400KB
          groups: [
            {
              name: 'element-plus',
              test: (id) => id.includes('node_modules/element-plus'),
              priority: 10,
            },
            // { name: 'jszip', test: id => id.includes('node_modules/jszip'), priority: 9 }
          ],
        },
      },
    },
    // 代码压缩
    minify: 'terser', // 代码压缩增加时间
    chunkSizeWarningLimit: 700,
    terserOptions: {
      compress: {
        pure_funcs: ['console.log', 'console.warn'], // 需要去除的 pure_funcs: ['console.log', 'console.warn', 'console.info', 'console.debug']
        drop_debugger: true,
        // drop_console: true
      },
    },
  };
}
