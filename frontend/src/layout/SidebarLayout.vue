<template>
  <el-container class="sidebar-layout w-screen h-screen overflow-hidden">
    <!-- 侧边栏 -->
    <el-aside
      :width="sidebarCollapsed ? '64px' : '240px'"
      class="sidebar bg-white border-r border-gray-200 shadow-sm transition-all duration-300 overflow-hidden"
    >
      <div class="sidebar-content h-full flex flex-col">
        <!-- 侧边栏头部 -->
        <div
          class="sidebar-header p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-500 to-purple-600"
        >
          <div v-if="!sidebarCollapsed" class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
            >
              <Icon name="i-weui-home-outlined" size="20px" color="white" :tooltip="'首页'" />
            </div>
            <span class="font-semibold text-white">Vue Electron App</span>
          </div>
          <div v-else class="flex justify-center">
            <div
              class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
            >
              <Icon name="i-weui-home-outlined" size="20px" color="white" :tooltip="'首页'" />
            </div>
          </div>
        </div>

        <!-- 侧边栏菜单 -->
        <div class="sidebar-menu flex-1 p-2 overflow-y-auto custom-scrollbar">
          <nav class="space-y-1">
            <!-- 首页 -->
            <router-link
              to="/sidebar/dashboard"
              class="sidebar-menu-item flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
              :class="{ 'justify-center': sidebarCollapsed }"
              active-class="bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
            >
              <el-icon class="text-5 flex-shrink-0">
                <House />
              </el-icon>
              <span v-if="!sidebarCollapsed" class="font-medium">仪表板</span>
            </router-link>

            <!-- 数据管理 -->
            <router-link
              to="/sidebar/data"
              class="sidebar-menu-item flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
              :class="{ 'justify-center': sidebarCollapsed }"
              active-class="bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
            >
              <el-icon class="text-5 flex-shrink-0">
                <DataBoard />
              </el-icon>
              <span v-if="!sidebarCollapsed" class="font-medium">数据管理</span>
            </router-link>

            <!-- 用户管理 -->
            <router-link
              to="/sidebar/users"
              class="sidebar-menu-item flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
              :class="{ 'justify-center': sidebarCollapsed }"
              active-class="bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
            >
              <Icon
                name="i-weui-user-outlined"
                size="20px"
                color="currentColor"
                class="flex-shrink-0"
                :tooltip="'用户管理'"
              />
              <span v-if="!sidebarCollapsed" class="font-medium">用户管理</span>
            </router-link>

            <!-- 系统设置 -->
            <router-link
              to="/sidebar/settings"
              class="sidebar-menu-item flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
              :class="{ 'justify-center': sidebarCollapsed }"
              active-class="bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
            >
              <Icon
                name="i-weui-setting-outlined"
                size="20px"
                color="currentColor"
                class="flex-shrink-0"
                :tooltip="'系统设置'"
              />
              <span v-if="!sidebarCollapsed" class="font-medium">系统设置</span>
            </router-link>

            <!-- 分隔线 -->
            <div v-if="!sidebarCollapsed" class="my-2 border-t border-gray-200"></div>

            <!-- 帮助中心 -->
            <router-link
              to="/sidebar/help"
              class="sidebar-menu-item flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
              :class="{ 'justify-center': sidebarCollapsed }"
              active-class="bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
            >
              <Icon
                name="i-weui-info-outlined"
                size="20px"
                color="currentColor"
                class="flex-shrink-0"
                :tooltip="'帮助中心'"
              />
              <span v-if="!sidebarCollapsed" class="font-medium">帮助中心</span>
            </router-link>
          </nav>
        </div>

        <!-- 侧边栏底部 -->
        <div class="sidebar-footer p-2 border-t border-gray-100">
          <!-- 折叠/展开按钮 -->
          <button
            @click="toggleSidebarCollapse"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
            :class="{ 'justify-center': sidebarCollapsed }"
          >
            <el-icon class="text-5 flex-shrink-0">
              <component :is="sidebarCollapsed ? 'Expand' : 'Fold'" />
            </el-icon>
            <span v-if="!sidebarCollapsed" class="font-medium text-sm">
              {{ sidebarCollapsed ? '展开' : '收起' }}
            </span>
          </button>
        </div>
      </div>
    </el-aside>

    <!-- 主内容区域 -->
    <el-container class="flex-1 overflow-hidden">
      <!-- 顶部工具栏 -->
      <el-header
        class="header-toolbar h-16 bg-white border-b border-gray-200 shadow-sm p-0 flex items-center"
      >
        <div class="w-full h-full flex items-center justify-between px-6">
          <!-- 左侧：面包屑导航 -->
          <div class="flex items-center">
            <el-breadcrumb separator="/" class="text-sm">
              <el-breadcrumb-item
                v-for="item in breadcrumbItems"
                :key="item.path"
                :to="item.path"
                class="text-gray-600 hover:text-indigo-600"
              >
                <el-icon v-if="item.icon" class="mr-1">
                  <component :is="item.icon" />
                </el-icon>
                {{ item.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!-- 右侧：用户操作 -->
          <div class="flex items-center gap-2">
            <!-- 主题切换 -->
            <button
              @click="toggleTheme"
              class="toolbar-button flex items-center justify-center w-10 h-10 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Icon
                :name="isDark ? 'i-weui-sun-outlined' : 'i-weui-moon-outlined'"
                size="20px"
                color="currentColor"
                :tooltip="isDark ? '切换到亮色主题' : '切换到暗色主题'"
              />
            </button>

            <!-- 用户菜单 -->
            <el-dropdown @command="handleUserCommand">
              <button
                class="toolbar-button flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Icon
                  name="i-weui-user-outlined"
                  size="20px"
                  color="currentColor"
                  :tooltip="'用户菜单'"
                />
                <span class="text-sm font-medium">用户</span>
                <el-icon class="text-3">
                  <ArrowDown />
                </el-icon>
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">
                    <Icon
                      name="i-weui-user-outlined"
                      size="16px"
                      color="currentColor"
                      class="mr-2"
                    />
                    个人资料
                  </el-dropdown-item>
                  <el-dropdown-item command="settings">
                    <Icon
                      name="i-weui-setting-outlined"
                      size="16px"
                      color="currentColor"
                      class="mr-2"
                    />
                    设置
                  </el-dropdown-item>
                  <el-dropdown-item divided command="logout">
                    <el-icon class="mr-2">
                      <SwitchButton />
                    </el-icon>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <!-- 主内容区域 -->
      <el-main class="p-0 overflow-hidden flex flex-col bg-gray-50">
        <!-- 路由视图内容 -->
        <div class="router-view-content flex-1 overflow-auto custom-scrollbar">
          <div class="w-full min-h-full p-6 box-border">
            <router-view />
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed, watch } from 'vue'
import { House, DataBoard, Expand, Fold, ArrowDown, SwitchButton } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAppStore, useThemeStore } from '@/store'
import Icon from '@/components/Icon.vue'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const themeStore = useThemeStore()

// 响应式状态
const sidebarCollapsed = computed(() => appStore.config.sidebarCollapsed)
const isDark = computed(() => themeStore.isDark)

// 面包屑导航配置
const breadcrumbItems = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const items = []

  // 根据路由路径生成面包屑
  if (pathSegments.length > 0) {
    items.push({ title: '首页', path: '/sidebar/dashboard', icon: 'House' })

    if (pathSegments[1]) {
      const pageMap = {
        dashboard: { title: '仪表板', icon: 'House' },
        data: { title: '数据管理', icon: 'DataBoard' },
        users: { title: '用户管理', icon: 'User' },
        settings: { title: '系统设置', icon: 'Setting' },
        help: { title: '帮助中心', icon: 'QuestionFilled' }
      }

      const currentPage = pageMap[pathSegments[1]]
      if (currentPage && pathSegments[1] !== 'dashboard') {
        items.push({
          title: currentPage.title,
          path: route.path,
          icon: currentPage.icon
        })
      }
    }
  }

  return items
})

// 切换主题
const toggleTheme = () => {
  themeStore.toggleTheme()
  ElMessage.success(`已切换到${themeStore.isDark ? '暗色' : '亮色'}主题`)
}

// 切换侧边栏折叠状态
const toggleSidebarCollapse = () => {
  appStore.toggleSidebarCollapse()
}

// 处理用户菜单命令
const handleUserCommand = (command) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人资料功能开发中...')
      break
    case 'settings':
      ElMessage.info('设置功能开发中...')
      break
    case 'logout':
      ElMessage.success('已退出登录')
      router.push('/auth/login')
      break
  }
}

// 监听路由变化，在移动端自动收起侧边栏
watch(route, () => {
  if (window.innerWidth < 768 && !sidebarCollapsed.value) {
    appStore.toggleSidebarCollapse()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/sidebar-layout.scss';
</style>
