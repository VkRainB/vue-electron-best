/**
 * 用户状态管理
 * 管理用户信息、认证状态等
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref({
    id: null,
    username: '',
    email: '',
    avatar: '',
    nickname: '',
    role: 'user',
    permissions: []
  })

  // 认证状态
  const auth = ref({
    isLoggedIn: false,
    token: '',
    refreshToken: '',
    loginTime: null,
    lastActiveTime: null
  })

  // 用户偏好设置
  const preferences = ref({
    // 界面偏好
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',

    // 功能偏好
    autoSave: true,
    notifications: true,
    soundEnabled: true,

    // 显示偏好
    showWelcomeMessage: true,
    showTips: true,
    compactMode: false
  })

  // 计算属性
  const isAuthenticated = computed(() => auth.value.isLoggedIn && !!auth.value.token)
  const hasPermission = computed(() => (permission) => {
    return userInfo.value.permissions.includes(permission)
  })
  const displayName = computed(() => {
    return userInfo.value.nickname || userInfo.value.username || '未知用户'
  })

  // 登录
  const login = async (credentials) => {
    try {
      // 这里可以调用实际的登录API
      // const response = await authAPI.login(credentials)

      // 模拟登录成功
      const mockUser = {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        avatar: '',
        nickname: credentials.username,
        role: 'user',
        permissions: ['read', 'write']
      }

      const mockAuth = {
        isLoggedIn: true,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        loginTime: Date.now(),
        lastActiveTime: Date.now()
      }

      userInfo.value = mockUser
      auth.value = mockAuth

      return { success: true, user: mockUser }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: error.message }
    }
  }

  // 登出
  const logout = async () => {
    try {
      // 这里可以调用实际的登出API
      // await authAPI.logout()

      // 清除用户状态
      userInfo.value = {
        id: null,
        username: '',
        email: '',
        avatar: '',
        nickname: '',
        role: 'user',
        permissions: []
      }

      auth.value = {
        isLoggedIn: false,
        token: '',
        refreshToken: '',
        loginTime: null,
        lastActiveTime: null
      }

      return { success: true }
    } catch (error) {
      console.error('Logout failed:', error)
      return { success: false, error: error.message }
    }
  }

  // 更新用户信息
  const updateUserInfo = (newInfo) => {
    userInfo.value = { ...userInfo.value, ...newInfo }
  }

  // 更新用户偏好
  const updatePreferences = (newPreferences) => {
    preferences.value = { ...preferences.value, ...newPreferences }
  }

  // 更新最后活跃时间
  const updateLastActiveTime = () => {
    if (auth.value.isLoggedIn) {
      auth.value.lastActiveTime = Date.now()
    }
  }

  // 检查权限
  const checkPermission = (permission) => {
    return userInfo.value.permissions.includes(permission)
  }

  // 检查角色
  const hasRole = (role) => {
    return userInfo.value.role === role
  }

  // 刷新token
  const refreshToken = async () => {
    try {
      // 这里可以调用实际的刷新token API
      // const response = await authAPI.refreshToken(auth.value.refreshToken)

      // 模拟刷新成功
      auth.value.token = 'new-mock-jwt-token'
      auth.value.lastActiveTime = Date.now()

      return { success: true }
    } catch (error) {
      console.error('Token refresh failed:', error)
      // 刷新失败，清除认证状态
      await logout()
      return { success: false, error: error.message }
    }
  }

  return {
    // 状态
    userInfo,
    auth,
    preferences,

    // 计算属性
    isAuthenticated,
    hasPermission,
    displayName,

    // 方法
    login,
    logout,
    updateUserInfo,
    updatePreferences,
    updateLastActiveTime,
    checkPermission,
    hasRole,
    refreshToken
  }
})
