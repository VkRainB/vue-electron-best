<template>
  <div class="window-controls">
    <Icon name="el-icon-minus" size="16" @click="minWindow" />
    <Icon name="el-icon-fullScreen" size="16" @click="toggleFullScreen" />
    <Icon name="el-icon-close" size="16" @click="closeWindow" />
  </div>
</template>

<script setup>
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
