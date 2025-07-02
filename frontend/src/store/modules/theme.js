/**
 * 主题状态管理
 * 管理应用主题、样式配置等
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 主题配置
  const theme = ref({
    // 当前主题模式
    mode: 'light', // 'light' | 'dark' | 'auto'

    // 主色调
    primaryColor: '#409EFF',

    // 成功色
    successColor: '#67C23A',

    // 警告色
    warningColor: '#E6A23C',

    // 危险色
    dangerColor: '#F56C6C',

    // 信息色
    infoColor: '#909399',

    // 字体大小
    fontSize: 'medium', // 'small' | 'medium' | 'large'

    // 圆角大小
    borderRadius: 'medium', // 'small' | 'medium' | 'large'

    // 动画效果
    animation: true,

    // 阴影效果
    shadow: true
  })

  // 布局配置
  const layout = ref({
    // 头部高度
    headerHeight: 60,

    // 侧边栏宽度
    sidebarWidth: 240,

    // 侧边栏折叠宽度
    sidebarCollapsedWidth: 64,

    // 内容区域内边距
    contentPadding: 24,

    // 是否固定头部
    fixedHeader: true,

    // 是否显示标签页
    showTabs: false,

    // 是否显示面包屑
    showBreadcrumb: true,

    // 是否显示页脚
    showFooter: false
  })

  // 预定义主题
  const presetThemes = ref({
    light: {
      mode: 'light',
      primaryColor: '#409EFF',
      successColor: '#67C23A',
      warningColor: '#E6A23C',
      dangerColor: '#F56C6C',
      infoColor: '#909399'
    },
    dark: {
      mode: 'dark',
      primaryColor: '#409EFF',
      successColor: '#67C23A',
      warningColor: '#E6A23C',
      dangerColor: '#F56C6C',
      infoColor: '#909399'
    },
    blue: {
      mode: 'light',
      primaryColor: '#1890ff',
      successColor: '#52c41a',
      warningColor: '#faad14',
      dangerColor: '#f5222d',
      infoColor: '#8c8c8c'
    },
    purple: {
      mode: 'light',
      primaryColor: '#722ed1',
      successColor: '#52c41a',
      warningColor: '#faad14',
      dangerColor: '#f5222d',
      infoColor: '#8c8c8c'
    }
  })

  // 计算属性
  const isDark = computed(() => {
    if (theme.value.mode === 'auto') {
      // 自动模式下根据系统主题判断
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme.value.mode === 'dark'
  })

  const currentThemeClass = computed(() => {
    return isDark.value ? 'theme-dark' : 'theme-light'
  })

  const cssVariables = computed(() => {
    return {
      '--el-color-primary': theme.value.primaryColor,
      '--el-color-success': theme.value.successColor,
      '--el-color-warning': theme.value.warningColor,
      '--el-color-danger': theme.value.dangerColor,
      '--el-color-info': theme.value.infoColor,
      '--app-header-height': `${layout.value.headerHeight}px`,
      '--app-sidebar-width': `${layout.value.sidebarWidth}px`,
      '--app-sidebar-collapsed-width': `${layout.value.sidebarCollapsedWidth}px`,
      '--app-content-padding': `${layout.value.contentPadding}px`
    }
  })

  // 设置主题模式
  const setThemeMode = (mode) => {
    theme.value.mode = mode
    applyTheme()
  }

  // 设置主色调
  const setPrimaryColor = (color) => {
    theme.value.primaryColor = color
    applyTheme()
  }

  // 应用预设主题
  const applyPresetTheme = (presetName) => {
    const preset = presetThemes.value[presetName]
    if (preset) {
      Object.assign(theme.value, preset)
      applyTheme()
    }
  }

  // 更新主题配置
  const updateTheme = (newTheme) => {
    Object.assign(theme.value, newTheme)
    applyTheme()
  }

  // 更新布局配置
  const updateLayout = (newLayout) => {
    Object.assign(layout.value, newLayout)
    applyTheme()
  }

  // 应用主题到DOM
  const applyTheme = () => {
    const root = document.documentElement

    // 应用CSS变量
    Object.entries(cssVariables.value).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // 应用主题类名
    root.className = root.className.replace(/theme-(light|dark)/g, '')
    root.classList.add(currentThemeClass.value)

    // 应用字体大小类名
    root.className = root.className.replace(/font-size-(small|medium|large)/g, '')
    root.classList.add(`font-size-${theme.value.fontSize}`)

    // 应用圆角大小类名
    root.className = root.className.replace(/border-radius-(small|medium|large)/g, '')
    root.classList.add(`border-radius-${theme.value.borderRadius}`)

    // 应用动画效果
    if (theme.value.animation) {
      root.classList.add('enable-animation')
    } else {
      root.classList.remove('enable-animation')
    }

    // 应用阴影效果
    if (theme.value.shadow) {
      root.classList.add('enable-shadow')
    } else {
      root.classList.remove('enable-shadow')
    }
  }

  // 切换主题模式
  const toggleTheme = () => {
    const newMode = isDark.value ? 'light' : 'dark'
    setThemeMode(newMode)
  }

  // 重置主题
  const resetTheme = () => {
    theme.value = {
      mode: 'light',
      primaryColor: '#409EFF',
      successColor: '#67C23A',
      warningColor: '#E6A23C',
      dangerColor: '#F56C6C',
      infoColor: '#909399',
      fontSize: 'medium',
      borderRadius: 'medium',
      animation: true,
      shadow: true
    }
    applyTheme()
  }

  // 初始化主题
  const initTheme = () => {
    applyTheme()

    // 监听系统主题变化
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', () => {
        if (theme.value.mode === 'auto') {
          applyTheme()
        }
      })
    }
  }

  return {
    // 状态
    theme,
    layout,
    presetThemes,

    // 计算属性
    isDark,
    currentThemeClass,
    cssVariables,

    // 方法
    setThemeMode,
    setPrimaryColor,
    applyPresetTheme,
    updateTheme,
    updateLayout,
    applyTheme,
    toggleTheme,
    resetTheme,
    initTheme
  }
})
