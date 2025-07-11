<!-- 简单布局 -->
<script setup>
import Header from '@/layouts/components/Header/index.vue';
</script>

<template>
  <el-container class="main-layout">
    <el-header class="main-layout__header" height="var(--window-controls-height">
      <Header class="bg-#409EFF" color="white" :controls="['min', 'close']">
        <template #app-icon>
          <div class="text-white">
            标题
          </div>
        </template>
      </Header>
    </el-header>

    <el-container class="main-layout__body">
      <el-main class="main-layout__content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.main-layout {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__header {
    --el-header-padding:0px;
  }

  &__body {
    flex: 1;
    min-height: 0;

  }
  &__content {
    --el-main-padding:0px;
  }
}
</style>

<style lang="scss">

</style>
