/**
 * Pinia状态管理入口文件
 * 统一导出所有store模块
 */

import { createPinia } from 'pinia';

// 导入所有store模块
import { useAppStore } from './modules/app';
import { useThemeStore } from './modules/theme';
import { useUserStore } from './modules/user';

/**
 * 创建并配置Pinia实例
 * @param {object} app - Vue应用实例
 */
export function setupStore(app) {
  const pinia = createPinia();
  app.use(pinia);
}

/**
 * 导出所有store模块
 */
export {
  useAppStore,
  useThemeStore,
  useUserStore,
};

/**
 * 获取所有store实例的便捷方法
 * 在组件外部使用时很有用
 */
export function useStores() {
  return {
    app: useAppStore(),
    user: useUserStore(),
    theme: useThemeStore(),
  };
}
