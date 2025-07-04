/**
 * 图标工具函数
 * 提供图标相关的实用工具方法
 */

import { commonIcons, getIcon, hasIcon } from '@/config/weui-icons'

/**
 * 图标尺寸映射
 */
export const iconSizes = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '48px'
}

/**
 * 主题颜色映射
 */
export const themeColors = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#6b7280',
  // 暗色主题颜色
  'primary-dark': '#60a5fa',
  'success-dark': '#34d399',
  'warning-dark': '#fbbf24',
  'danger-dark': '#f87171',
  'info-dark': '#9ca3af'
}

/**
 * 获取标准化的图标类名
 * @param {string} name - 图标名称
 * @param {string} category - 图标分类
 * @returns {string} 完整的图标类名
 */
export const getIconClass = (name, category = '') => {
  if (name.startsWith('i-weui-')) {
    return name
  }
  
  if (category) {
    return getIcon(category, name)
  }
  
  return commonIcons[name] || `i-weui-${name}`
}

/**
 * 获取图标的CSS类名组合
 * @param {Object} options - 配置选项
 * @param {string} options.name - 图标名称
 * @param {string} options.category - 图标分类
 * @param {string} options.size - 图标尺寸
 * @param {string} options.color - 图标颜色
 * @param {boolean} options.clickable - 是否可点击
 * @returns {string} CSS类名字符串
 */
export const buildIconClasses = (options = {}) => {
  const {
    name,
    category = '',
    size = 'md',
    color = '',
    clickable = false
  } = options
  
  const classes = []
  
  // 添加图标类名
  classes.push(getIconClass(name, category))
  
  // 添加尺寸类名
  const sizeClass = getSizeClass(size)
  if (sizeClass) {
    classes.push(sizeClass)
  }
  
  // 添加颜色类名
  if (color && themeColors[color]) {
    classes.push(`text-${color}`)
  }
  
  // 添加交互类名
  if (clickable) {
    classes.push('cursor-pointer hover:scale-110 transition-transform duration-200')
  }
  
  return classes.join(' ')
}

/**
 * 获取尺寸对应的CSS类名
 * @param {string} size - 尺寸标识
 * @returns {string} CSS类名
 */
export const getSizeClass = (size) => {
  const sizeClassMap = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  return sizeClassMap[size] || sizeClassMap.md
}

/**
 * 获取尺寸的像素值
 * @param {string} size - 尺寸标识
 * @returns {string} 像素值
 */
export const getSizeValue = (size) => {
  return iconSizes[size] || iconSizes.md
}

/**
 * 创建图标配置对象
 * @param {string} name - 图标名称
 * @param {Object} options - 配置选项
 * @returns {Object} 图标配置对象
 */
export const createIconConfig = (name, options = {}) => {
  return {
    name,
    category: options.category || '',
    size: options.size || 'md',
    color: options.color || '',
    clickable: options.clickable || false,
    hoverEffect: options.hoverEffect || 'scale',
    tooltip: options.tooltip || '',
    disabled: options.disabled || false,
    customClass: options.customClass || ''
  }
}

/**
 * 验证图标是否存在
 * @param {string} name - 图标名称
 * @param {string} category - 图标分类
 * @returns {boolean} 是否存在
 */
export const validateIcon = (name, category = '') => {
  if (name.startsWith('i-weui-')) {
    return true // 假设完整类名都是有效的
  }
  
  if (category) {
    return hasIcon(category, name)
  }
  
  return !!commonIcons[name]
}

/**
 * 获取功能对应的推荐图标
 * @param {string} action - 功能动作
 * @returns {string} 推荐的图标类名
 */
export const getActionIcon = (action) => {
  const actionIconMap = {
    // 基础操作
    create: commonIcons.add,
    add: commonIcons.add,
    new: commonIcons.add,
    edit: commonIcons.edit,
    update: commonIcons.edit,
    modify: commonIcons.edit,
    delete: commonIcons.delete,
    remove: commonIcons.delete,
    save: commonIcons.save,
    submit: commonIcons.save,
    cancel: commonIcons.cancel,
    close: commonIcons.close,
    
    // 导航操作
    back: commonIcons.back,
    home: commonIcons.home,
    menu: commonIcons.menu,
    
    // 数据操作
    search: commonIcons.search,
    filter: getIcon('action', 'filter'),
    sort: getIcon('action', 'sort'),
    refresh: commonIcons.refresh,
    reload: commonIcons.refresh,
    download: commonIcons.download,
    upload: commonIcons.upload,
    export: commonIcons.download,
    import: commonIcons.upload,
    
    // 用户操作
    login: getIcon('user', 'login'),
    logout: getIcon('user', 'logout'),
    register: getIcon('user', 'register'),
    profile: getIcon('user', 'profile'),
    settings: commonIcons.settings,
    
    // 状态显示
    success: commonIcons.success,
    error: commonIcons.error,
    warning: commonIcons.warning,
    info: commonIcons.info,
    loading: commonIcons.loading
  }
  
  return actionIconMap[action] || commonIcons.info
}

/**
 * 获取页面类型对应的图标
 * @param {string} pageType - 页面类型
 * @returns {string} 对应的图标类名
 */
export const getPageIcon = (pageType) => {
  const pageIconMap = {
    dashboard: getIcon('system', 'dashboard'),
    home: commonIcons.home,
    user: commonIcons.user,
    users: getIcon('user', 'users'),
    settings: commonIcons.settings,
    profile: getIcon('user', 'profile'),
    data: getIcon('system', 'table'),
    analytics: getIcon('system', 'analytics'),
    chart: getIcon('system', 'chart'),
    file: getIcon('file', 'file'),
    folder: getIcon('file', 'folder'),
    help: commonIcons.info,
    about: commonIcons.info,
    contact: getIcon('communication', 'phone'),
    message: getIcon('communication', 'message'),
    notification: getIcon('communication', 'notification')
  }
  
  return pageIconMap[pageType] || commonIcons.home
}

/**
 * 根据文件类型获取图标
 * @param {string} fileType - 文件类型或扩展名
 * @returns {string} 对应的图标类名
 */
export const getFileIcon = (fileType) => {
  const fileIconMap = {
    // 文档类型
    pdf: getIcon('file', 'pdf'),
    doc: getIcon('file', 'word'),
    docx: getIcon('file', 'word'),
    xls: getIcon('file', 'excel'),
    xlsx: getIcon('file', 'excel'),
    ppt: getIcon('file', 'document'),
    pptx: getIcon('file', 'document'),
    txt: getIcon('file', 'document'),
    
    // 图片类型
    jpg: getIcon('file', 'image'),
    jpeg: getIcon('file', 'image'),
    png: getIcon('file', 'image'),
    gif: getIcon('file', 'image'),
    svg: getIcon('file', 'image'),
    webp: getIcon('file', 'image'),
    
    // 视频类型
    mp4: getIcon('file', 'video'),
    avi: getIcon('file', 'video'),
    mov: getIcon('file', 'video'),
    wmv: getIcon('file', 'video'),
    
    // 音频类型
    mp3: getIcon('file', 'audio'),
    wav: getIcon('file', 'audio'),
    flac: getIcon('file', 'audio'),
    
    // 压缩文件
    zip: getIcon('file', 'folder'),
    rar: getIcon('file', 'folder'),
    '7z': getIcon('file', 'folder')
  }
  
  const type = fileType.toLowerCase().replace('.', '')
  return fileIconMap[type] || getIcon('file', 'file')
}

export default {
  iconSizes,
  themeColors,
  getIconClass,
  buildIconClasses,
  getSizeClass,
  getSizeValue,
  createIconConfig,
  validateIcon,
  getActionIcon,
  getPageIcon,
  getFileIcon
}
