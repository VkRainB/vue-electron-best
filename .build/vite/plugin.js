import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import createSvgIcon from './svg-icon';

export function createVitePlugins({ command }) {
  return [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-imports.d.ts',
    }),
    ElementPlus({
      useSource: true, // 获得更好的 tree shaking
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass', // false, 手动控制样式顺便覆盖变量值
        }),
      ],
      dts: 'types/components.d.ts',
    }),
    UnoCSS(),
    createSvgIcon(command === 'build'),
  ];
}
