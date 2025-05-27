import vue from '@vitejs/plugin-vue'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { presetIcons, presetUno } from 'unocss'
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { loadEnv } from 'electron-vite'

// import { presetDaisy } from '@ameinhardt/unocss-preset-daisy';

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode)
  const { VITE_PORT } = env

  console.log('加载的环境变量', env)

  // 主进程和预加载配置
  const createElectronConfig = (entryPath) => ({
    plugins: [externalizeDepsPlugin({ exclude: [''] })], // 外部化依赖
    build: {
      rollupOptions: {
        input: {
          index: pathResolve(entryPath)
        }
      }
    }
  })

  // UnoCSS 配置
  const unocssConfig = {
    presets: [
      presetUno(),
      presetIcons({
        collections: {
          weui: 'weui'
        },
        // 图标属性
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle'
        }
      })
    ]
    // 如需使用 Daisy UI，取消下面注释
    // presets: [presetUno(), presetDaisy()]
  }

  // 渲染进程插件配置
  const rendererPlugins = [
    unocss(unocssConfig),
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'types/auto-imports.d.ts'
    })
  ]

  // 渲染进程构建配置
  const rendererBuildConfig = {
    rollupOptions: {
      input: {
        index: pathResolve('frontend/index.html')
      },
      plugins: [
        visualizer({
          filename: 'temp/stats.html',
          open: false, // 构建完成后不自动打开浏览器
          gzipSize: true, // 统计 gzip 压缩后的大小
          brotliSize: true, // 统计 brotli 压缩后的大小
          template: 'treemap' // 使用树状图模板（可选: flamegraph 火焰图）
        })
      ],
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 代码分块文件命名
        entryFileNames: 'js/[name]-[hash].js', // 入口文件命名
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 静态资源文件命名
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('element-plus')) {
              return 'element-plus'
            }
            // 其他第三方库打包到 vendor
            return 'vendor'
            // return id.toString().split('node_modules/')[1].split('/')[0]
          }
        }
      }
    }
  }

  return {
    // 主进程配置
    main: createElectronConfig('electron/main/index.js'),

    // 预加载脚本配置
    preload: createElectronConfig('electron/preload/index.js'),

    // 渲染进程配置
    renderer: {
      root: 'frontend',
      publicDir: 'frontend/public',
      server: {
        port: parseInt(VITE_PORT)
      },
      resolve: {
        alias: {
          '@': pathResolve('frontend/src')
        }
      },
      plugins: rendererPlugins,
      build: rendererBuildConfig
    }
  }
})
