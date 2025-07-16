import * as elIcons from '@element-plus/icons-vue';
import Icon from '@/components/icon/index.vue';

/**
 * @description 注册图标
 * 使用方式:<Icon name="name" size="size" color="color" />
 * @param {*} app
 */
export function registerIcons(app) {
  app.component('Icon', Icon);

  // 全局注册element Plus的icon
  for (const i in elIcons) {
    app.component(`el-icon-${elIcons[i].name}`, elIcons[i]);
  }
}
