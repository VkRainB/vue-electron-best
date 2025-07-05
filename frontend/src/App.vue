<script setup>
import { RouterView } from 'vue-router';
import { imagesIpc } from '@/api/ipc';

const versions = reactive({ ...window.electron.process.versions });

async function getPicturesDirectory() {
  const picturesDirectory = await imagesIpc.getPicturesDirectory();
  console.log('picturesDirectory', picturesDirectory);
}

onMounted(() => {
  getPicturesDirectory();
  console.log('versions', versions);
});
</script>

<template>
  <RouterView />
</template>

<style></style>
