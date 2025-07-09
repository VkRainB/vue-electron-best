<template>
  <div class="window-controls">
    <el-icon :size="16" @click="minWindow">
      <Minus />
    </el-icon>
    <el-icon :size="16" @click="toggleFullScreen">
      <FullScreen />
    </el-icon>
    <el-icon :size="16" @click="closeWindow">
      <Close />
    </el-icon>
  </div>
</template>

<script setup>
import { Close, FullScreen, Minus } from '@element-plus/icons-vue';

function minWindow() {
  window.electron.ipcRenderer.send('win:invoke', 'min');
}

function closeWindow() {
  window.electron.ipcRenderer.send('win:invoke', 'close');
}

function toggleFullScreen() {
  window.electron.ipcRenderer.send('win:invoke', 'max');
}
</script>

<style scoped>
.window-controls {
  -webkit-app-region: no-drag;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.el-icon {
  cursor: pointer;
  transition: color 0.2s ease;
}

.el-icon:hover {
  color: var(--el-color-primary);
}
</style>
