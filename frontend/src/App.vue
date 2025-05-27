<script setup>
import Versions from '@/components/Versions.vue'
import { RouterView } from 'vue-router'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <RouterView />
  <Versions />
</template>

<script>
console.log(process.env.NODE_ENV === 'development')
</script>
