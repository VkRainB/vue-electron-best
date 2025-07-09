<template>
  <header class="app-header">
    <!-- 标题栏：窗口拖拽和控制按钮 -->
    <div class="title-bar">
      <div class="app-icon" @click="handleRefresh">
        <Icon name="i-weui-star-outlined" />
        <div>Application</div>
      </div>
      <WindowControl />
    </div>

    <!-- 导航内容区域 -->
    <nav class="nav-content">
      <div class="nav-left">
        <el-icon class="toggle-btn" @click="toggleSidebar">
          <Menu v-if="isCollapse" />
          <Close v-else />
        </el-icon>
        <slot name="nav-left" />
      </div>
      <div class="nav-center">
        <slot name="nav-center" />
      </div>
      <div class="nav-right">
        <slot name="nav-right" />
      </div>
    </nav>
  </header>
</template>

<script setup>
import { Close, Menu } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import Icon from '@/components/icon/index.vue';
import { useDesignStore } from '@/stores';
import WindowControl from './WindowControl.vue';

const designStore = useDesignStore();
const { isCollapse } = storeToRefs(designStore);

function handleRefresh() {
  window.location.hash = '';
  location.reload();
}

function toggleSidebar() {
  designStore.setCollapse(!isCollapse.value);
}
</script>

<style lang="scss" scoped>
.app-header {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.title-bar {
  /* 透明渐变毛玻璃 */
  backdrop-filter: blur(10px);
  z-index: 99;
  width: 100%;
  height: 35px;
  -webkit-app-region: drag;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.app-icon {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  -webkit-app-region: no-drag;
  cursor: pointer;
}

.nav-content {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
}

.nav-left,
.nav-center,
.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-left {
  justify-content: flex-start;
}

.nav-center {
  justify-content: center;
  flex: 1;
}

.nav-right {
  justify-content: flex-end;
}

.toggle-btn {
  font-size: 20px;
  cursor: pointer;
  color: var(--el-text-color-secondary);
  transition: color 0.3s;
  -webkit-app-region: no-drag;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>

<!-- 可根据需要添加 Tailwind 或其他样式 -->
