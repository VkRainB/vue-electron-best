<script setup>
import { RouterView } from 'vue-router';


const size = 'small'

const versions = reactive({ ...window.electron.process.versions });

onMounted(() => {
  console.log('versions', versions);
});
</script>

<template>
  <el-config-provider :locale="locale" :size="size" :button="buttonConfig">
    <RouterView />
  </el-config-provider>
</template>

<style></style>
