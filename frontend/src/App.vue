<script setup>
import { RouterView } from 'vue-router';

const versions = reactive({ ...window.electron.process.versions });

onMounted(() => {
  console.log('versions', versions);
});
</script>

<template>
  <el-config-provider :locale="locale" size="small" :message="{ offset: 37 }">
    <RouterView />
  </el-config-provider>
</template>

<style></style>
