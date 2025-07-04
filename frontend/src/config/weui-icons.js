/**
 * WeUI图标映射配置
 * 定义常用功能对应的WeUI图标，支持语义化使用
 */

// 导航类图标 - 只包含确实存在的WeUI图标
export const navigationIcons = {
  home: 'i-weui-home-outlined',
  back: 'i-weui-back',
  menu: 'i-weui-list-outlined',
  close: 'i-weui-close-outlined',
  down: 'i-weui-arrow-down-outlined',
  up: 'i-weui-arrow-up-outlined'
}

// 操作类图标 - 只包含确实存在的WeUI图标
export const actionIcons = {
  add: 'i-weui-add-outlined',
  delete: 'i-weui-delete-outlined',
  edit: 'i-weui-edit-outlined',
  search: 'i-weui-search-outlined',
  download: 'i-weui-download-outlined',
  share: 'i-weui-share-outlined'
}

// 状态类图标 - 只包含确实存在的WeUI图标
export const statusIcons = {
  success: 'i-weui-success-outlined',
  error: 'i-weui-error-outlined',
  warning: 'i-weui-warning-outlined',
  info: 'i-weui-info-outlined'
}

// 用户相关图标 - 只包含确实存在的WeUI图标
export const userIcons = {
  user: 'i-weui-user-outlined',
  settings: 'i-weui-setting-outlined'
}

// 通信类图标 - 只包含确实存在的WeUI图标
export const communicationIcons = {
  phone: 'i-weui-phone-outlined',
  message: 'i-weui-message-outlined'
}

// 文件相关图标 - 只包含确实存在的WeUI图标
export const fileIcons = {
  file: 'i-weui-file-outlined',
  folder: 'i-weui-folder-outlined'
}

// 系统功能图标 - 只包含确实存在的WeUI图标
export const systemIcons = {
  location: 'i-weui-location-outlined',
  camera: 'i-weui-camera-outlined'
}

// 主题相关图标 - 只包含确实存在的WeUI图标
export const themeIcons = {
  light: 'i-weui-sun-outlined',
  dark: 'i-weui-moon-outlined'
}

// 其他常用图标
export const otherIcons = {
  // 这里可以添加其他确实存在的WeUI图标
}

// 合并所有图标配置
export const allIcons = {
  ...navigationIcons,
  ...actionIcons,
  ...statusIcons,
  ...userIcons,
  ...communicationIcons,
  ...fileIcons,
  ...systemIcons,
  ...themeIcons,
  ...otherIcons
}

// 图标分类映射
export const iconCategories = {
  navigation: navigationIcons,
  action: actionIcons,
  status: statusIcons,
  user: userIcons,
  communication: communicationIcons,
  file: fileIcons,
  system: systemIcons,
  theme: themeIcons,
  other: otherIcons
}

// 获取图标的工具函数
export const getIcon = (category, name) => {
  const categoryIcons = iconCategories[category]
  return categoryIcons?.[name] || allIcons[name] || 'i-weui-circle-outlined'
}

// 检查图标是否存在
export const hasIcon = (category, name) => {
  const categoryIcons = iconCategories[category]
  return !!(categoryIcons?.[name] || allIcons[name])
}

// 获取分类下的所有图标
export const getCategoryIcons = (category) => {
  return iconCategories[category] || {}
}

// 搜索图标
export const searchIcons = (query) => {
  const results = []
  const lowerQuery = query.toLowerCase()

  Object.entries(allIcons).forEach(([name, icon]) => {
    if (name.toLowerCase().includes(lowerQuery) || icon.toLowerCase().includes(lowerQuery)) {
      results.push({ name, icon })
    }
  })

  return results
}

// 常用图标快捷方式 - 只使用确实存在的WeUI图标
export const commonIcons = {
  // 最常用的图标
  home: getIcon('navigation', 'home'),
  user: getIcon('user', 'user'),
  settings: getIcon('user', 'settings'),
  search: getIcon('action', 'search'),
  add: getIcon('action', 'add'),
  edit: getIcon('action', 'edit'),
  delete: getIcon('action', 'delete'),
  success: getIcon('status', 'success'),
  error: getIcon('status', 'error'),
  warning: getIcon('status', 'warning'),
  info: getIcon('status', 'info'),
  menu: getIcon('navigation', 'menu'),
  close: getIcon('navigation', 'close'),
  back: getIcon('navigation', 'back'),
  download: getIcon('action', 'download'),
  share: getIcon('action', 'share')
}

export default {
  allIcons,
  iconCategories,
  commonIcons,
  getIcon,
  hasIcon,
  getCategoryIcons,
  searchIcons
}
