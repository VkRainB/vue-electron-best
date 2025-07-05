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
  for (const i in icons) {
    app.component(`el-icon-${icons[i].name}`, icons[i]);
  }

  // 自动注册 src/icons/svg 下的 svg 图标为全局组件，命名为 svg-xxx
  const svgFiles = import.meta.glob('@/icons/svg/*.svg', { eager: true });
  Object.keys(svgFiles).forEach((file) => {
    const name = `svg-${file.split('/').pop().replace('.svg', '')}`;
    app.component(name, svgFiles[file].default || svgFiles[file]);
  });
}

/**
 * 是否是外部链接
 * @param path
 */
export function isExternal(path) {
  return /^(?:https?|ftp|mailto|tel):/.test(path);
}
