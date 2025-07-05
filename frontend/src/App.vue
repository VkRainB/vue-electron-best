<script setup>
import { RouterView } from 'vue-router';

const versions = reactive({ ...window.electron.process.versions });
</script>

<template>
  <RouterView />
</template>

<style></style>
