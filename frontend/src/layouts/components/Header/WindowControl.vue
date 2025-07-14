<script setup>
const props = defineProps({
  iconColor: {
    type: String,
    default: '#696868',
  },
  // 渲染的控件
  controls: {
    type: Array,
    default: () => ['min', 'max', 'close'],
  },
});
function minWindow() {
  window.electron.ipcRenderer.send('win:invoke', 'min');
}

function closeWindow() {
  window.electron.ipcRenderer.send('win:invoke', 'close');
}

async function toggleFullScreen() {
  window.electron.ipcRenderer.send('win:invoke', 'max');
}

onMounted(() => {
  window.electron.ipcRenderer.removeAllListeners('win:maximize-state');
  window.electron.ipcRenderer.on('win:maximize-state', (event, { isMaximized }) => {
    console.log('窗口是否最大化:', isMaximized);
    // 这里可以做UI切换等
  });
});
</script>

<template>
  <div class="window-controls">
    <Icon v-if="controls.includes('min')" name="el-icon-semiSelect" size="16" :color="props.iconColor" @click="minWindow" />
    <Icon v-if="controls.includes('max')" name="svg-sys-max" size="16" :color="iconColor" @click="toggleFullScreen" />
    <Icon v-if="controls.includes('close')" name="el-icon-closeBold" size="16" :color="iconColor" @click="closeWindow" />
  </div>
</template>

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
  /* color: var(--el-color-primary); */
}
</style>
