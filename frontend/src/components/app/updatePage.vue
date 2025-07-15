<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/modules/app';

const percentage = ref(0); // 升级进度
const progressStaus = ref('');
const visionInfo = ref({});
const showUpdate = storeToRefs(useAppStore()).showUpdate; // 是否升级系统

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#6f7ad3', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#5cb87a', percentage: 100 },
];
// 检查更新
function checkUpdate() {
// 自动更新检测更新
// ipc.invoke('check-update', 1);
  ipc.removeAllListeners('UpdateMsg');
  ipc.on('UpdateMsg', (event, data) => {
    if (data.type === 2)
      return;
    switch (data.state) {
      case 1: {
        const isoTime = new Date(data.msg.releaseDate);
        data.msg.newDate = isoTime.toLocaleString();
        visionInfo.value = data.msg;
        if (data.type === 1) {
          showUpdate.value = true;
        }
        break;
      }
      case 10: {
        percentage.value = 1;
        showUpdate.value = true;

        break;
      }
      case 3:
        percentage.value = Number(data.msg.percent.toFixed(0));
        break;
      case 4:
        progressStaus.value = 'success';
        ElMessage.success('更新完成,退出开始安装');
        setTimeout(() => {
          ipc.send('windowClose');
          ipc.invoke('confirm-update');
        }, 500);
        break;
      default:
        break;
    }
  });
}

// 组件挂载时自动检测更新
checkUpdate();
function beginUpdate() {
  ipc.invoke('confirm-downloadUpdate');
}
</script>

<template>
  <div class="m-4">
    <template v-if="percentage > 0">
      <p class="text-lg text-center">
        正在更新 V{{ visionInfo.version }}
      </p>
      <p class="text-center mb-7">
        {{ visionInfo.newDate }}
      </p>
      <p class="primary-color">
        正在下载产品文件...
      </p>
      <el-progress
        class="mt-1"
        :stroke-width="18"
        :text-inside="true"
        :color="colors"
        :percentage="percentage"
        :status="progressStaus"
      />
    </template>
    <div v-else class="flex flex-col justify-center items-center gap-2">
      <p class="mt-10">
        请更新软件
      </p>
      <el-button type="primary" @click="beginUpdate()">
        立即更新
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
