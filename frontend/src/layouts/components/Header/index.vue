<script setup>
import { useSlots } from 'vue';
import WindowControl from './WindowControl.vue';

const props = defineProps({
  color: String, // 图标颜色
  controls: Array, // 渲染的控件
});

const slots = useSlots();

const hasAnyNavSlot = computed(() => {
  return !!(
    (slots['nav-left'] && slots['nav-left']().length) ||
    (slots['nav-center'] && slots['nav-center']().length) ||
    (slots['nav-right'] && slots['nav-right']().length)
  );
});
</script>

<template>
  <header class="app-header">
    <!-- 标题栏：窗口拖拽和控制按钮 -->
    <div class="title-bar">
      <div class="app-icon">
        <slot name="app-icon" />
      </div>
      <WindowControl :icon-color="props.color" :controls="props.controls" />
    </div>

    <!-- 导航内容区域 -->
    <nav
      v-if="hasAnyNavSlot"
      class="nav-content"
      :style="hasAnyNavSlot ? 'height: var(--navbar-height);' : 'h-0 hidden'"
    >
      <div class="nav-left">
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

<style lang="scss" scoped>
.app-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  // 过度背景颜色
  transition: all 0.3s;
}

.title-bar {
  /* 透明渐变毛玻璃 */
  // backdrop-filter: blur(10px);
  z-index: 99;
  width: 100%;
  height: var(--window-controls-height);
  -webkit-app-region: drag;
  display: flex;
  background-color: rgba(0, 0, 0, 0);
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
}

.nav-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: var(--navbar-bg-color);
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
