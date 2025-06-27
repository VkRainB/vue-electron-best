import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function createVitePlugins() {
  return [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          // importStyle: 'sass', // 覆盖源：使用空间命名，全局配置namespace="ep"才开启，开启后不走默认的 CSS 文件，.el- 前缀
        })
      ],
      dts: 'types/components.d.ts'
    }),
    ElementPlus({
      useSource: true
    })
  ]
}
