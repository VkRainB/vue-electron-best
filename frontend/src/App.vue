<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
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
  <el-config-provider :locale="zhCn" size="default" :message="{ offset: 37 }">
    <RouterView />
  </el-config-provider>
  <NetTips v-if="!netStart" />
</template>

<style></style>
