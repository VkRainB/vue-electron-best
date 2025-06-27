<template>
  <div class="simple-layout">
    <router-view />
  </div>
</template>

<script setup>
// 简单布局，无需任何逻辑
</script>

<style scoped>
.simple-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
}

/* 确保内容全屏显示 */
.simple-layout :deep(.router-view-content) {
  width: 100%;
  height: 100%;
}
</style>
