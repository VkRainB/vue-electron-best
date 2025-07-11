<script setup>
import * as elIcons from '@element-plus/icons-vue';
import icons from '@iconify-json/weui/icons.json';
import { ElMessage } from 'element-plus';
import ids from 'virtual:svg-icons-names';

// svg 图标名数组（svg-[dir]-[name]）
const svgIconNames = ids;

// el 图标名数组（转为 el-icon-xxx 格式）
const elIconNames = Object.entries(elIcons).map(item => `el-icon-${item[1].__name}`);

// weui 图标名数组（转为 i-weui-xxx 格式）
const weuiIconNames = Object.keys(icons.icons).map(name => `i-weui-${name}`);

// 打印
// console.log('svgIconNames', svgIconNames);
// console.log('elIconNames', elIconNames);
// console.log('weuiIconNames', weuiIconNames);

function copyName(name) {
  navigator.clipboard.writeText(name);
  ElMessage.success(`已复制: ${name}`);
}
</script>

<template>
  <div class="p-0">
    <h1 class="text-3xl font-bold mb-6 border-b pb-2">
      Icons
    </h1>
    <div>
      <h2 class="text-xl font-semibold mb-2 mt-6">
        SVG 图标
      </h2>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="name in svgIconNames"
          :key="name"
          class="w-18 h-16 flex flex-col items-center justify-center bg-white rounded shadow hover:shadow-lg transition cursor-pointer"
          @click="copyName(name)"
        >
          <Icon :name="name" />
          <span class="text-xs mt-2 break-all text-gray-500 text-center">{{ name }}</span>
        </div>
      </div>

      <h2 class="text-xl font-semibold mb-2 mt-6">
        Element Plus 图标
      </h2>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="name in elIconNames"
          :key="name"
          class="w-18 h-16 flex flex-col items-center justify-center bg-white rounded shadow hover:shadow-lg transition cursor-pointer"
          @click="copyName(name)"
        >
          <Icon :name="name" color="#A6A7A9" />
          <span class="text-xs mt-2 break-all text-gray-500 text-center">{{ name.replace('el-icon-', '') }}</span>
        </div>
      </div>

      <h2 class="text-xl font-semibold mb-2 mt-6">
        WeUI 图标
      </h2>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="name in weuiIconNames"
          :key="name"
          class="w-18 h-16 flex flex-col items-center justify-center bg-white rounded shadow hover:shadow-lg transition cursor-pointer"
          @click="copyName(name)"
        >
          <Icon :name="name" />
          <span class="text-xs mt-2 break-all text-gray-500 text-center">{{ name.replace('i-weui-', '') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
