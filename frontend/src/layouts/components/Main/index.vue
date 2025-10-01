<!-- Main -->
<script setup>
import { useKeepAliveStore } from '@/store/modules/keepAlive';

const keepAliveStore = useKeepAliveStore();

// 刷新当前路由页面缓存方法
const isRouterShow = ref(true);
const refreshMainPage = (val) => (isRouterShow.value = val);
provide('refresh', refreshMainPage);
</script>

<template>
  <div class="main" style="height: calc(100vh - var(--top-height))">
    <slot></slot>
    <div class="main-router main-container--fixed w-full">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in" appear>
          <!-- <keep-alive :max="10" :include="keepAliveStore.keepAliveName"> -->
          <keep-alive :exclude="keepAliveStore.excludeName">
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
.main-container--fixed {
  height: calc(100% - var(--tabs-height));
  box-sizing: border-box;
  overflow-y: hidden;
}
/* ＜768px 允许滚动 */
@media screen and (max-width: 1024px) {
  .main-container--fixed {
    overflow-y: auto;
  }
}
</style>
