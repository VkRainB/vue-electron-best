<!-- Main -->
<script setup>
import { storeToRefs } from 'pinia';

import { useDesignStore } from '@/stores';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';

const designStore = useDesignStore();
const keepAliveStore = useKeepAliveStore();
const { navbarHeight } = storeToRefs(designStore);

// 刷新当前路由页面缓存方法
const isRouterShow = ref(true);
const refreshMainPage = val => (isRouterShow.value = val);
provide('refresh', refreshMainPage);
</script>

<template>
  <div class="main" :style="{ height: `calc(100vh - ${navbarHeight})` }">
    <slot />
    <div class="main-router p-5">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in" appear>
          <keep-alive :max="10" :include="keepAliveStore.keepAliveName">
            <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  overflow: hidden;
}
</style>
