/**
 * 应用全局状态管理
 * 管理应用级别的配置和状态
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  // 应用基础信息
  const appInfo = ref({
    name: 'Vue Electron App',
    version: '1.0.0',
    description: '基于Vue 3和Electron的桌面应用',
  });

  // 应用配置
  const config = ref({
    // 语言设置
    locale: 'zh-CN',
    // 是否显示侧边栏
    showSidebar: false,
    // 侧边栏折叠状态
    sidebarCollapsed: false,
    // 当前布局类型
    layoutType: 'main', // 'simple' | 'main' | 'sidebar'
    // 是否全屏模式
    isFullscreen: false,
    // 窗口大小
    windowSize: {
      width: 1200,
      height: 800,
    },
    // SidebarLayout 特有配置
    sidebarLayout: {
      // 侧边栏宽度
      sidebarWidth: 240,
      // 侧边栏折叠宽度
      sidebarCollapsedWidth: 64,
      // 是否显示面包屑
      showBreadcrumb: true,
      // 是否固定侧边栏
      fixedSidebar: true,
      // 移动端自动折叠
      autoCollapseOnMobile: true,
    },
  });

  // 加载状态
  const loading = ref({
    global: false,
    page: false,
  });

  // 错误状态
  const error = ref({
    message: '',
    code: null,
    timestamp: null,
  });

  // 计算属性
  const isLoading = computed(() => loading.value.global || loading.value.page);
  const hasError = computed(() => !!error.value.message);

  // 设置全局加载状态
  const setGlobalLoading = (status) => {
    loading.value.global = status;
  };

  // 设置页面加载状态
  const setPageLoading = (status) => {
    loading.value.page = status;
  };

  // 设置错误信息
  const setError = (message, code = null) => {
    error.value = {
      message,
      code,
      timestamp: Date.now(),
    };
  };

  // 清除错误信息
  const clearError = () => {
    error.value = {
      message: '',
      code: null,
      timestamp: null,
    };
  };

  // 切换侧边栏显示状态
  const toggleSidebar = () => {
    config.value.showSidebar = !config.value.showSidebar;
  };

  // 切换侧边栏折叠状态
  const toggleSidebarCollapse = () => {
    config.value.sidebarCollapsed = !config.value.sidebarCollapsed;
  };

  // 设置全屏模式
  const setFullscreen = (status) => {
    config.value.isFullscreen = status;
  };

  // 更新窗口大小
  const updateWindowSize = (width, height) => {
    config.value.windowSize = { width, height };
  };

  // 设置语言
  const setLocale = (locale) => {
    config.value.locale = locale;
  };

  // 设置布局类型
  const setLayoutType = (type) => {
    config.value.layoutType = type;
  };

  // 更新SidebarLayout配置
  const updateSidebarLayoutConfig = (newConfig) => {
    config.value.sidebarLayout = { ...config.value.sidebarLayout, ...newConfig };
  };

  // 切换面包屑显示
  const toggleBreadcrumb = () => {
    config.value.sidebarLayout.showBreadcrumb = !config.value.sidebarLayout.showBreadcrumb;
  };

  // 重置应用状态
  const resetApp = () => {
    config.value = {
      locale: 'zh-CN',
      showSidebar: false,
      sidebarCollapsed: false,
      layoutType: 'main',
      isFullscreen: false,
      windowSize: {
        width: 1200,
        height: 800,
      },
      sidebarLayout: {
        sidebarWidth: 240,
        sidebarCollapsedWidth: 64,
        showBreadcrumb: true,
        fixedSidebar: true,
        autoCollapseOnMobile: true,
      },
    };
    clearError();
    setGlobalLoading(false);
    setPageLoading(false);
  };

  return {
    // 状态
    appInfo,
    config,
    loading,
    error,

    // 计算属性
    isLoading,
    hasError,

    // 方法
    setGlobalLoading,
    setPageLoading,
    setError,
    clearError,
    toggleSidebar,
    toggleSidebarCollapse,
    setFullscreen,
    updateWindowSize,
    setLocale,
    setLayoutType,
    updateSidebarLayoutConfig,
    toggleBreadcrumb,
    resetApp,
  };
});
