import * as elIcons from '@element-plus/icons-vue';
import Icon from '@/components/icon/index.vue';

export function registerIcons(app) {
  /*
   * 全局注册 Icon
   * 使用方式: <Icon name="name" size="size" color="color" />
   */
  app.component('Icon', Icon);

  /*
   * 全局注册element Plus的icon
   */
  const icons = elIcons;
  console.log(icons);
  for (const i in icons) {
    app.component(`el-icon-${icons[i].name}`, icons[i]);
  }
}

/**
 * 是否是外部链接
 * @param path
 */
export function isExternal(path) {
  return /^(?:https?|ftp|mailto|tel):/.test(path);
}
