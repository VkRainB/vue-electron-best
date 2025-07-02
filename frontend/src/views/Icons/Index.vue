<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- 控制面板 -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <h1 class="text-2xl font-bold mb-4">WeUI Icon Gallery</h1>
      <div class="flex items-center gap-4 mb-4">
        <label class="flex items-center gap-2">
          <span class="text-sm font-medium">图标大小:</span>
          <select v-model="iconSize" class="border rounded px-2 py-1">
            <option value="4">16px (w-4 h-4)</option>
            <option value="5">20px (w-5 h-5)</option>
            <option value="6">24px (w-6 h-6)</option>
            <option value="8">32px (w-8 h-8)</option>
            <option value="10">40px (w-10 h-10)</option>
            <option value="12">48px (w-12 h-12)</option>
            <option value="16">64px (w-16 h-16)</option>
          </select>
        </label>

        <label class="flex items-center gap-2">
          <span class="text-sm font-medium">图标颜色:</span>
          <select v-model="iconColor" class="border rounded px-2 py-1">
            <option value="text-gray-600">默认灰色</option>
            <option value="text-blue-500">蓝色</option>
            <option value="text-green-500">绿色</option>
            <option value="text-red-500">红色</option>
            <option value="text-purple-500">紫色</option>
            <option value="text-orange-500">橙色</option>
          </select>
        </label>

        <label class="flex items-center gap-2">
          <span class="text-sm font-medium">每行显示:</span>
          <select v-model="columnsCount" class="border rounded px-2 py-1">
            <option value="6">6个</option>
            <option value="8">8个</option>
            <option value="10">10个</option>
            <option value="12">12个</option>
            <option value="16">16个</option>
          </select>
        </label>
      </div>

      <div class="text-sm text-gray-500">共 {{ allIcons.length }} 个图标</div>
    </div>

    <!-- 图标网格 -->
    <div
      class="grid gap-4 bg-white p-6 rounded-lg shadow-sm"
      :style="{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }"
    >
      <div
        v-for="(iconClass, index) in allIcons"
        :key="index"
        class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer group"
        @click="copyIconClass(iconClass)"
      >
        <!-- 图标 -->
        <div
          :class="[
            iconClass,
            `w-${iconSize}`,
            `h-${iconSize}`,
            iconColor,
            'mb-2 group-hover:scale-110 transition-transform duration-200'
          ]"
        ></div>

        <!-- 图标名称 -->
        <div class="text-xs text-gray-500 text-center break-all leading-tight">
          {{ iconClass.replace('i-weui-', '') }}
        </div>
      </div>
    </div>

    <!-- 复制提示 -->
    <div
      v-if="showCopyTip"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
    >
      已复制: {{ copiedIcon }}
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const allIcons = ref([])
const iconSize = ref('6') // 默认 24px
const iconColor = ref('text-gray-600') // 默认灰色
const columnsCount = ref('10') // 默认每行10个
const showCopyTip = ref(false)
const copiedIcon = ref('')

// 模拟加载图标数据
onBeforeMount(async () => {
  try {
    const iconsModule = await import('@iconify-json/weui/icons.json')
    const iconNames = Object.keys(iconsModule.icons)

    iconNames.forEach((name) => {
      allIcons.value.push(`i-weui-${name}`)
    })
  } catch (error) {
    console.error('加载图标失败:', error)
  }
})

// 复制图标类名
const copyIconClass = async (iconClass) => {
  try {
    await navigator.clipboard.writeText(iconClass)
    copiedIcon.value = iconClass
    showCopyTip.value = true

    // 3秒后隐藏提示
    setTimeout(() => {
      showCopyTip.value = false
    }, 3000)
  } catch (error) {
    console.error('复制失败:', error)
  }
}
</script>

<style scoped>
/* 如果需要自定义样式可以在这里添加 */
</style>
