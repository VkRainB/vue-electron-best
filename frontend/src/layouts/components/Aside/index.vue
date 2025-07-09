<template>
  <el-aside
    class="aside-container"
    :class="{ 'is-collapse': isCollapse }"
  >
    <div>侧边栏内容</div>
  </el-aside>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDesignStore } from '@/stores';

const designStore = useDesignStore();
const { isCollapse } = storeToRefs(designStore);
</script>

<style lang="scss" scoped>
.aside-container {
  height: 100%;
  width: var(--sidebar-width, 200px);
  transition: width 0.3s;
  background-color: white;
  border-right: 1px solid var(--el-border-color-light);
  position: fixed;
  left: 0;
  top: 85px; // header 高度
  bottom: 0;
  z-index: 1000;
}
.is-collapse {
  width: 0px;
  visibility: hidden;
}
</style>
