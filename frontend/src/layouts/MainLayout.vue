<!-- 纵向布局作为基础布局 -->
<script setup>
import { storeToRefs } from 'pinia';
import Aside from '@/layouts/components/Aside/index.vue';
import Header from '@/layouts/components/Header/index.vue';
import Main from '@/layouts/components/Main/index.vue';
import { useDesignStore } from '@/stores';

const designStore = useDesignStore();
const { isCollapse } = storeToRefs(designStore);
</script>

<template>
  <el-container class="layout-container">
    <el-header class="layout-header" height="85px">
      <Header>
        <template #nav-center>
          <div>中间</div>
        </template>
      </Header>
    </el-header>

    <el-container class="layout-container-main" :class="{ 'is-collapse': isCollapse }">
      <el-main class="layout-main">
        <Aside />
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .layout-header{
    --el-header-padding:0px;
  }

  .layout-container-main {
    flex: 1;
    min-height: 0;
    margin-left: var(--sidebar-width, 200px);
    transition: margin-left 0.3s ease;
  }
  .is-collapse{
    margin-left: 0px;
  }
}
</style>

<style lang="scss">

</style>
