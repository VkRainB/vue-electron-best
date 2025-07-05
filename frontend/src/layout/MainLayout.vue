<script setup>
import { House } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Icon from '@/components/icon/index.vue';
import { useAppStore, useThemeStore } from '@/store';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const themeStore = useThemeStore();

// 响应式状态
const showSidebar = computed(() => appStore.config.showSidebar);
const sidebarCollapsed = computed(() => appStore.config.sidebarCollapsed);
const isDark = computed(() => themeStore.isDark);

// 面包屑导航配置
const showBreadcrumb = computed(() => route.path !== '/' && route.path !== '/home');

// 面包屑项目
const breadcrumbItems = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean);
  const items = [{ title: '首页', path: '/home', icon: 'House' }];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;

    // 根据路径生成面包屑项目
    let title = segment;
    let icon = null;

    switch (segment) {
      case 'icons':
        title = '图标库';
        icon = 'Grid';
        break;
      case 'auth':
        title = '认证';
        icon = 'User';
        break;
      case 'login':
        title = '登录';
        break;
      case 'settings':
        title = '设置';
        icon = 'Setting';
        break;
      default:
        title = segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    items.push({ title, path: currentPath, icon });
  });

  return items;
});

// 切换主题
function toggleTheme() {
  themeStore.toggleTheme();
  ElMessage.success(`已切换到${themeStore.isDark ? '暗色' : '亮色'}主题`);
}

// 切换侧边栏显示
function toggleSidebar() {
  appStore.toggleSidebar();
}

// 切换侧边栏折叠状态
function toggleSidebarCollapse() {
  appStore.toggleSidebarCollapse();
}

// 处理设置点击
function handleSettings() {
  ElMessage.info('设置功能开发中...');
}

// 处理个人资料点击
function handleProfile() {
  ElMessage.info('个人资料功能开发中...');
}

// 处理退出登录
function handleLogout() {
  ElMessage.success('已退出登录');
  router.push('/auth/login');
}

// 监听路由变化，在移动端自动隐藏侧边栏
watch(route, () => {
  if (window.innerWidth < 768 && showSidebar.value) {
    appStore.toggleSidebar();
  }
});
</script>

<template>
  <el-container class="main-content w-screen h-screen overflow-hidden">
    <!-- 顶部导航栏 -->
    <el-header
      class="header-container h-16 bg-gradient-to-r from-indigo-500 to-purple-600 border-b border-gray-200 shadow-lg p-0 flex items-center relative z-1000"
    >
      <div class="w-full h-full flex items-center justify-between px-6 md:px-4 sm:px-3">
        <!-- 左侧：应用标题 Logo -->
        <div class="flex items-center">
          <div class="flex items-center gap-3 text-white font-semibold text-lg">
            <div class="logo-icon w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span class="i-weui-home-outlined" />
            </div>
            <span class="text-white font-semibold tracking-wide md:hidden">Vue Electron App</span>
          </div>
        </div>

        <!-- 右侧：导航菜单 -->
        <div class="flex items-center">
          <nav class="flex items-center gap-1">
            <!-- 图标页面链接 -->
            <button
              class="nav-button flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium"
              @click="$router.push('/icons')"
            >
              <Icon name="gallery" category="system" size="16px" color="white" tooltip="图标" />
              <span class="sm:hidden">图标</span>
            </button>

            <!-- 侧边栏布局链接 -->
            <button
              class="nav-button flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium"
              @click="$router.push('/sidebar/dashboard')"
            >
              <Icon name="menu" category="navigation" size="16px" color="white" tooltip="管理后台" />
              <span class="sm:hidden">管理后台</span>
            </button>

            <!-- 主题切换按钮 -->
            <button
              class="nav-button flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium"
              :title="isDark ? '切换到亮色主题' : '切换到暗色主题'"
              @click="toggleTheme"
            >
              <Icon
                :name="isDark ? 'light' : 'dark'"
                category="theme"
                size="16px"
                color="white"
                :tooltip="isDark ? '切换到亮色主题' : '切换到暗色主题'"
              />
              <span class="sm:hidden">{{ isDark ? '亮色' : '暗色' }}</span>
            </button>

            <!-- 侧边栏切换按钮 -->
            <button
              class="nav-button flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium"
              :title="showSidebar ? '隐藏侧边栏' : '显示侧边栏'"
              @click="toggleSidebar"
            >
              <Icon name="menu" category="navigation" size="16px" color="white" tooltip="菜单" />
              <span class="sm:hidden">菜单</span>
            </button>

            <!-- 设置按钮 -->
            <button
              class="nav-button flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium"
              @click="handleSettings"
            >
              <Icon name="settings" category="user" size="16px" color="white" tooltip="设置" />
              <span class="sm:hidden">设置</span>
            </button>

            <!-- 用户菜单 -->
            <el-dropdown trigger="click" placement="bottom-end">
              <button
                class="nav-button flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <Icon name="user" category="user" size="16px" color="white" tooltip="用户菜单" />
                <span class="sm:hidden">用户</span>
                <Icon name="down" category="navigation" size="12px" color="white" class="sm:hidden" />
              </button>
              <template #dropdown>
                <el-dropdown-menu class="user-dropdown">
                  <el-dropdown-item @click="handleProfile">
                    <Icon name="profile" category="user" size="16px" color="currentColor" class="mr-2" />
                    个人资料
                  </el-dropdown-item>
                  <el-dropdown-item @click="handleSettings">
                    <Icon name="settings" category="user" size="16px" color="currentColor" class="mr-2" />
                    设置
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <Icon name="logout" category="user" size="16px" color="currentColor" class="mr-2" />
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </nav>
        </div>
      </div>
    </el-header>

    <!-- 主要内容区域 -->
    <el-container class="flex-1 overflow-hidden">
      <!-- 侧边栏 -->
      <el-aside
        v-if="showSidebar"
        :width="sidebarCollapsed ? '64px' : '240px'"
        class="sidebar bg-white border-r border-gray-200 shadow-sm transition-all duration-300 overflow-hidden"
      >
        <div class="sidebar-content h-full flex flex-col">
          <!-- 侧边栏头部 -->
          <div class="sidebar-header p-4 border-b border-gray-100">
            <div v-if="!sidebarCollapsed" class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <el-icon class="text-white text-4">
                  <Icon :name="`el-icon-${item.icon}`" size="1.2em" class="text-white text-4" />
                </el-icon>
              </div>
              <span class="font-semibold text-gray-800">导航菜单</span>
            </div>
            <div v-else class="flex justify-center">
              <div
                class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <el-icon class="text-white text-4">
                  <Icon :name="`el-icon-${item.icon}`" size="1.2em" class="text-white text-4" />
                </el-icon>
              </div>
            </div>
          </div>

          <!-- 侧边栏菜单 -->
          <div class="sidebar-menu flex-1 p-2 overflow-y-auto custom-scrollbar">
            <nav class="space-y-1">
              <router-link
                to="/home"
                class="sidebar-menu-item flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
                :class="{ 'justify-center': sidebarCollapsed }"
              >
                <el-icon class="text-5 flex-shrink-0">
                  <Icon :name="`el-icon-${item.icon}`" size="1.5em" class="text-5 flex-shrink-0" />
                </el-icon>
                <span v-if="!sidebarCollapsed" class="font-medium">首页</span>
              </router-link>

              <router-link
                to="/icons"
                class="sidebar-menu-item flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
                :class="{ 'justify-center': sidebarCollapsed }"
              >
                <el-icon class="text-5 flex-shrink-0">
                  <Icon :name="`el-icon-${item.icon}`" size="1.5em" class="text-5 flex-shrink-0" />
                </el-icon>
                <span v-if="!sidebarCollapsed" class="font-medium">图标库</span>
              </router-link>

              <div
                class="sidebar-menu-item flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200 cursor-pointer"
                :class="{ 'justify-center': sidebarCollapsed }"
                @click="handleSettings"
              >
                <el-icon class="text-5 flex-shrink-0">
                  <Icon :name="`el-icon-${item.icon}`" size="1.5em" class="text-5 flex-shrink-0" />
                </el-icon>
                <span v-if="!sidebarCollapsed" class="font-medium">设置</span>
              </div>
            </nav>
          </div>

          <!-- 侧边栏底部 -->
          <div class="sidebar-footer p-2 border-t border-gray-100">
            <button
              class="w-full flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
              :title="sidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'"
              @click="toggleSidebarCollapse"
            >
              <el-icon class="text-5">
                <Icon :name="`el-icon-${sidebarCollapsed ? 'expand' : 'fold'}`" size="1.5em" class="text-5" />
              </el-icon>
            </button>
          </div>
        </div>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="p-0 overflow-hidden flex flex-col bg-gray-50">
        <!-- 面包屑导航 -->
        <div v-if="showBreadcrumb" class="breadcrumb-container bg-white border-b border-gray-100 px-6 py-3">
          <el-breadcrumb separator="/" class="text-sm">
            <el-breadcrumb-item
              v-for="item in breadcrumbItems"
              :key="item.path"
              :to="item.path"
              class="text-gray-600 hover:text-indigo-600"
            >
              <el-icon v-if="item.icon" class="mr-1">
                <Icon :name="`el-icon-${item.icon}`" size="1.2em" class="text-gray-600 mr-1" />
              </el-icon>
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 路由视图内容 -->
        <div class="router-view-content flex-1 overflow-auto custom-scrollbar">
          <div class="w-full min-h-full p-6 md:p-4 sm:p-3 box-border">
            <router-view />
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
