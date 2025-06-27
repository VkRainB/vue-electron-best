<template>
  <el-container class="main-layout">
    <!-- 顶部导航栏 -->
    <el-header class="main-header">
      <div class="header-content">
        <!-- 左侧：应用标题/Logo -->
        <div class="header-left">
          <div class="app-logo">
            <el-icon class="logo-icon">
              <House />
            </el-icon>
            <span class="app-title">Vue Electron App</span>
          </div>
        </div>

        <!-- 右侧：导航菜单预留空间 -->
        <div class="header-right">
          <div class="nav-menu">
            <!-- 预留导航菜单空间 -->
            <el-button type="text" class="nav-item">
              <el-icon>
                <Setting />
              </el-icon>
              设置
            </el-button>
            <el-button type="text" class="nav-item">
              <el-icon>
                <User />
              </el-icon>
              用户
            </el-button>
          </div>
        </div>
      </div>
    </el-header>

    <!-- 主内容区域 -->
    <el-main class="main-content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { House, Setting, User } from '@element-plus/icons-vue'
</script>

<style scoped>
/* 主布局容器 */
.main-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 顶部导航栏 */
.main-header {
  height: 60px !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1000;
}

/* 导航栏内容容器 */
.header-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

/* 左侧区域 */
.header-left {
  display: flex;
  align-items: center;
}

.app-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-weight: 600;
  font-size: 18px;
}

.logo-icon {
  font-size: 24px;
  color: #ffffff;
}

.app-title {
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 右侧区域 */
.header-right {
  display: flex;
  align-items: center;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  color: #ffffff !important;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-item .el-icon {
  margin-right: 6px;
  font-size: 16px;
}

/* 主内容区域 */
.main-content {
  background-color: #f5f7fa;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.content-wrapper {
  width: 100%;
  min-height: 100%;
  padding: 24px;
  box-sizing: border-box;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }
  
  .app-title {
    display: none;
  }
  
  .nav-menu {
    gap: 4px;
  }
  
  .nav-item {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .content-wrapper {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 12px;
  }
  
  .nav-item span {
    display: none;
  }
  
  .nav-item .el-icon {
    margin-right: 0;
  }
  
  .content-wrapper {
    padding: 12px;
  }
}

/* 确保路由视图内容正确显示 */
.content-wrapper :deep(.router-view-content) {
  width: 100%;
  min-height: 100%;
}

/* 滚动条样式优化 */
.main-content::-webkit-scrollbar {
  width: 6px;
}

.main-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.main-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
