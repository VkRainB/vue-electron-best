<script setup>
import { RouterView } from 'vue-router';

const versions = reactive({ ...window.electron.process.versions });

onMounted(() => {
  console.log('versions', versions);
});
</script>

<template>
  <RouterView />
</template>

<style></style>
