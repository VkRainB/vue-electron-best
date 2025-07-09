<template>
  <div class="w-screen h-screen overflow-hidden bg-white flex flex-col">
    <router-view />
  </div>
</template>

<script setup>
// 简单布局，无需任何逻辑
</script>

<style scoped>
/* 确保内容全屏显示 */
:deep(.router-view-content) {
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>
