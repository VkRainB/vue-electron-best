<script setup>
import { RouterView } from 'vue-router';
import NetTips from '@/components/app/netTips.vue';
import { netDisconnect, reloadListener, trayRefresh } from './utils/listeners';

const netStart = netDisconnect();
const versions = reactive({ ...window.electron.process.versions });

onMounted(() => {
  trayRefresh();
  reloadListener();
  console.log('versions', versions);
});
</script>

<template>
  <el-config-provider size="small" :message="{ offset: 37 }">
    <RouterView />
  </el-config-provider>
  <NetTips v-if="!netStart" />
</template>

<style></style>
