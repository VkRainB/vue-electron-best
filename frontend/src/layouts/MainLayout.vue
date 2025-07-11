<!-- 纵向布局作为基础布局 -->
<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import Icon from '@/components/icon/index.vue';
import Aside from '@/layouts/components/Aside/index.vue';
import Header from '@/layouts/components/Header/index.vue';
import Main from '@/layouts/components/Main/index.vue';

import { useDesignStore } from '@/stores';

const router = useRouter();
const designStore = useDesignStore();
const { isCollapse, navbarHeight } = storeToRefs(designStore);

function toggleSidebar() {
  designStore.setCollapse(!isCollapse.value);
}

function goRouter() {
  router.push('/icons');
}
</script>

<template>
  <el-container class="main-layout">
    <el-header class="main-layout__header" :height="navbarHeight">
      <Header>
        <template #nav-left>
          <el-icon class="main-layout__toggle-btn" @click="toggleSidebar">
            <Icon v-if="isCollapse" name="el-icon-menu" />
            <Icon v-else name="el-icon-grid" />
          </el-icon>
        </template>

        <template #nav-right>
          <Icon name="svg-sys-electron" @click="goRouter" />
        </template>
      </Header>
    </el-header>

    <el-container class="main-layout__body" :class="{ collapse: isCollapse }">
      <el-main class="main-layout__content">
        <Aside />
        <Main>
          <template #default>
            <div class="h-30px bg-#E9ECF2">
              标签页
            </div>
          </template>
        </Main>
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
    margin-left: var(--sidebar-width, 200px);
    transition: margin-left 0.3s ease;

  }
  &__content {
    --el-main-padding:0px;
  }

  .collapse {
      margin-left: 0px;
    }

}
</style>

<style lang="scss">

</style>
