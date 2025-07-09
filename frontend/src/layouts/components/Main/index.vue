<!-- Main -->
<script setup>
// import { useDesignStore } from '@/stores';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';

// const designStore = useDesignStore();
const keepAliveStore = useKeepAliveStore();

// 刷新当前路由页面缓存方法
const isRouterShow = ref(true);
const refreshMainPage = val => (isRouterShow.value = val);
provide('refresh', refreshMainPage);
</script>

<template>
  <div class="main">
    <slot />
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" appear>
        <keep-alive :max="10" :include="keepAliveStore.keepAliveName">
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">

</style>
