<script setup>
import * as elIcons from '@element-plus/icons-vue';
import icons from '@iconify-json/weui/icons.json';
import { ElMessage } from 'element-plus';
import ids from 'virtual:svg-icons-names';
import { computed, ref } from 'vue';

const search = ref('');

// svg 图标名数组（svg-[dir]-[name]）
const svgIconNames = ids;
// el 图标名数组（转为 el-icon-xxx 格式）
const elIconNames = Object.entries(elIcons).map(item => `el-icon-${item[1].__name}`);
// weui 图标名数组（转为 i-weui-xxx 格式）
const weuiIconNames = Object.keys(icons.icons).map(name => `i-weui-${name}`);

function copyName(name) {
  navigator.clipboard.writeText(name);
  ElMessage.success(`已复制: ${name}`);
}

function filterBySearch(list) {
  if (!search.value)
    return list;
  try {
    const reg = new RegExp(search.value, 'i');
    return list.filter(name => reg.test(name));
  }
  catch {
    return list;
  }
}

const filteredSvgIconNames = computed(() => filterBySearch(svgIconNames));
const filteredElIconNames = computed(() => filterBySearch(elIconNames));
const filteredWeuiIconNames = computed(() => filterBySearch(weuiIconNames));
</script>

<template>
  <div class="p-0">
    <h1 class="text-3xl font-bold mb-6 border-b pb-2">
      Icons
    </h1>
    <el-input v-model="search" style="width: 500px" placeholder="搜索图标名(支持正则)" clearable class="mb-6 h-8" />
    <div>
      <h2 class="text-xl font-semibold mb-2 mt-6">
        SVG 图标
      </h2>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="name in filteredSvgIconNames"
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
          v-for="name in filteredElIconNames"
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
          v-for="name in filteredWeuiIconNames"
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
