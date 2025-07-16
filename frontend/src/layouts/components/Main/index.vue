<!-- Main -->
<script setup>
import { useKeepAliveStore } from '@/stores/modules/keepAlive';

const keepAliveStore = useKeepAliveStore();

// 刷新当前路由页面缓存方法
const isRouterShow = ref(true);
const refreshMainPage = val => (isRouterShow.value = val);
provide('refresh', refreshMainPage);
</script>

<template>
  <div class="main" style="height: calc(100vh - var(--top-height));">
    <slot />
    <div class="main-router main-scroll  w-full p-2">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in" appear>
          <!-- <keep-alive :max="10" :include="keepAliveStore.keepAliveName"> -->
          <keep-alive>
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
.main-scroll{
  height: calc(100% - var(--tabs-height));
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
