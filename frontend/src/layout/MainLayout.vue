<template>
  <el-container class="main-content w-screen h-screen overflow-hidden">
    <!-- 顶部导航栏 -->
    <el-header
      class="h-15 bg-gradient-to-r from-indigo-500 to-purple-600 border-b border-gray-200 shadow-lg p-0 flex items-center relative z-1000"
    >
      <div class="w-full h-full flex items-center justify-between px-6 md:px-4 sm:px-3">
        <!-- 左侧：应用标题/Logo -->
        <div class="flex items-center">
          <div class="flex items-center gap-3 text-white font-semibold text-lg">
            <el-icon class="text-6 text-white">
              <House />
            </el-icon>
            <span class="text-white font-semibold tracking-wide md:hidden">Vue Electron App</span>
          </div>
        </div>

        <!-- 右侧：导航菜单 -->
        <div class="flex items-center">
          <div class="flex items-center gap-2 md:gap-1">
            <!-- 图标页面链接 -->
            <el-button
              class="text-white! text-sm px-4 py-2 md:px-3 md:py-1.5 md:text-xs rounded-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              @click="$router.push('/icons')"
            >
              <el-icon class="mr-1.5 text-4 sm:mr-0">
                <Grid />
              </el-icon>
              <span class="sm:hidden">图标</span>
            </el-button>
            <el-button
              class="text-white! text-sm px-4 py-2 md:px-3 md:py-1.5 md:text-xs rounded-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
            >
              <el-icon class="mr-1.5 text-4 sm:mr-0">
                <Setting />
              </el-icon>
              <span class="sm:hidden">设置</span>
            </el-button>
            <el-button
              class="text-white! text-sm px-4 py-2 md:px-3 md:py-1.5 md:text-xs rounded-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
            >
              <el-icon class="mr-1.5 text-4 sm:mr-0">
                <User />
              </el-icon>
              <span class="sm:hidden">用户</span>
            </el-button>
          </div>
        </div>
      </div>
    </el-header>

    <!-- 主内容区域 -->
    <el-main class="main-content bg-gray-50 p-0 overflow-y-auto overflow-x-hidden">
      <div class="w-full min-h-full p-6 md:p-4 sm:p-3 box-border">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { House, Setting, User, Grid } from '@element-plus/icons-vue'
</script>

<style scoped>
/* 确保路由视图内容正确显示 */
:deep(.router-view-content) {
  width: 100%;
  min-height: 100%;
}
</style>
