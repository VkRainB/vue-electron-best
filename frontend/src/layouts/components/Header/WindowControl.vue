<script setup>
import { useRoute } from 'vue-router';

defineProps({
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

const route = useRoute();
const closeAction = route.matched.find((r) => r.name === 'login') || {};
const isMax = ref(false);
function minWindow() {
  ipc.send('win:invoke', 'min');
}

function closeWindow() {
  if (closeAction?.meta?.close === 'exit') {
    console.log('exit');
    ipc.send('app:exit');
  } else {
    ipc.send('win:invoke', 'close');
  }
}

async function toggleFullScreen() {
  ipc.send('win:invoke', 'max');
}

onMounted(() => {
  ipc.removeAllListeners('win:maximize-state');
  ipc.on('win:maximize-state', (event, { isMaximized }) => {
    isMax.value = isMaximized;
  });
});
</script>

<template>
  <div class="window-controls">
    <Icon v-if="controls.includes('min')" name="el-icon-semiSelect" size="16" :color="iconColor" @click="minWindow" />
    <Icon
      v-if="controls.includes('max')"
      :name="isMax ? 'i-weui-photo-wall-outlined' : 'svg-sys-max'"
      size="16"
      :color="iconColor"
      @click="toggleFullScreen"
    />
    <Icon
      v-if="controls.includes('close')"
      name="el-icon-closeBold"
      size="16"
      :color="iconColor"
      @click="closeWindow"
    />
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
