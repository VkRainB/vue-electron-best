<template>
  <div class="icons-page min-h-full bg-gray-50">
    <!-- 页面头部 -->
    <div class="page-header bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">WeUI 图标库</h1>
          <p class="text-sm text-gray-600 mt-1">
            共 {{ filteredIcons.length }} / {{ allIcons.length }} 个图标
            <span v-if="selectedIcons.length > 0" class="ml-2 text-indigo-600">
              (已选择 {{ selectedIcons.length }} 个)
            </span>
          </p>
        </div>

        <!-- 操作按钮 -->
        <div class="flex items-center gap-3">
          <el-button
            v-if="selectedIcons.length > 0"
            type="primary"
            @click="copySelectedIcons"
            :loading="copying"
          >
            <el-icon class="mr-1"><DocumentCopy /></el-icon>
            批量复制 ({{ selectedIcons.length }})
          </el-button>

          <el-button v-if="selectedIcons.length > 0" @click="clearSelection">
            <el-icon class="mr-1"><Close /></el-icon>
            清除选择
          </el-button>

          <el-button
            @click="selectAll"
            v-if="filteredIcons.length > 0 && selectedIcons.length === 0"
          >
            <el-icon class="mr-1"><Select /></el-icon>
            全选
          </el-button>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选面板 -->
    <div class="filter-panel bg-white border-b border-gray-200 px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <!-- 搜索框 -->
        <div class="lg:col-span-2">
          <el-input
            v-model="searchQuery"
            placeholder="搜索图标名称..."
            clearable
            @input="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <!-- 分类筛选 -->
        <div>
          <el-select
            v-model="selectedCategory"
            placeholder="选择分类"
            clearable
            @change="handleCategoryChange"
          >
            <el-option label="全部分类" value="" />
            <el-option
              v-for="category in categories"
              :key="category.value"
              :label="category.label"
              :value="category.value"
            />
          </el-select>
        </div>

        <!-- 显示设置 -->
        <div>
          <el-select v-model="viewMode" placeholder="显示模式">
            <el-option label="网格视图" value="grid" />
            <el-option label="列表视图" value="list" />
          </el-select>
        </div>
      </div>

      <!-- 显示选项 -->
      <div class="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700">图标大小:</span>
          <el-radio-group v-model="iconSize" size="small">
            <el-radio-button label="4">小</el-radio-button>
            <el-radio-button label="6">中</el-radio-button>
            <el-radio-button label="8">大</el-radio-button>
          </el-radio-group>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700">每行显示:</span>
          <el-slider
            v-model="columnsCount"
            :min="4"
            :max="12"
            :step="2"
            :show-tooltip="false"
            style="width: 100px"
          />
          <span class="text-sm text-gray-500 min-w-8">{{ columnsCount }}</span>
        </div>

        <div class="flex items-center gap-2">
          <el-checkbox v-model="showIconNames">显示图标名称</el-checkbox>
        </div>
      </div>
    </div>

    <!-- 图标展示区域 -->
    <div class="icons-content flex-1 p-6">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <el-icon class="animate-spin text-4xl text-indigo-500"><Loading /></el-icon>
        <span class="ml-3 text-gray-600">加载图标中...</span>
      </div>

      <!-- 空状态 -->
      <div
        v-else-if="filteredIcons.length === 0"
        class="flex flex-col items-center justify-center py-20"
      >
        <el-icon class="text-6xl text-gray-400 mb-4"><Search /></el-icon>
        <h3 class="text-lg font-medium text-gray-900 mb-2">未找到匹配的图标</h3>
        <p class="text-gray-500">尝试调整搜索条件或清除筛选器</p>
        <el-button @click="clearFilters" class="mt-4">清除筛选</el-button>
      </div>

      <!-- 网格视图 -->
      <div
        v-else-if="viewMode === 'grid'"
        class="icon-grid"
        :style="{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }"
      >
        <div
          v-for="(icon, index) in filteredIcons"
          :key="icon.name"
          class="icon-item"
          :class="{ selected: selectedIcons.includes(icon.name) }"
          @click="toggleIconSelection(icon.name)"
          @dblclick="copyIconClass(icon.name)"
        >
          <!-- 选择指示器 -->
          <div class="selection-indicator">
            <el-icon v-if="selectedIcons.includes(icon.name)" class="text-white">
              <Check />
            </el-icon>
          </div>

          <!-- 图标 -->
          <div class="icon-display">
            <div :class="[icon.name, `w-${iconSize}`, `h-${iconSize}`, 'text-gray-600']"></div>
          </div>

          <!-- 图标名称 -->
          <div v-if="showIconNames" class="icon-name">
            {{ icon.displayName }}
          </div>

          <!-- 操作按钮 -->
          <div class="icon-actions">
            <el-button
              size="small"
              type="primary"
              @click.stop="copyIconClass(icon.name)"
              :loading="copyingIcon === icon.name"
            >
              <el-icon><DocumentCopy /></el-icon>
            </el-button>
          </div>
        </div>
      </div>

      <!-- 列表视图 -->
      <div v-else class="icon-list space-y-2">
        <div
          v-for="icon in filteredIcons"
          :key="icon.name"
          class="icon-list-item"
          :class="{ selected: selectedIcons.includes(icon.name) }"
          @click="toggleIconSelection(icon.name)"
        >
          <div class="flex items-center gap-4">
            <!-- 选择框 -->
            <el-checkbox
              :model-value="selectedIcons.includes(icon.name)"
              @change="toggleIconSelection(icon.name)"
              @click.stop
            />

            <!-- 图标 -->
            <div :class="[icon.name, 'w-6 h-6', 'text-gray-600']"></div>

            <!-- 图标信息 -->
            <div class="flex-1">
              <div class="font-medium text-gray-900">{{ icon.displayName }}</div>
              <div class="text-sm text-gray-500">{{ icon.name }}</div>
              <div v-if="icon.category" class="text-xs text-gray-400">{{ icon.category }}</div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex items-center gap-2">
              <el-button
                size="small"
                @click.stop="copyIconClass(icon.name)"
                :loading="copyingIcon === icon.name"
              >
                <el-icon><DocumentCopy /></el-icon>
                复制
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filteredIcons.length"
          layout="prev, pager, next, sizes, total"
          :page-sizes="[50, 100, 200, 500]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Search, DocumentCopy, Close, Select, Check, Loading } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useCopyText, useSearchDebounce } from '@/hooks'

// 响应式数据
const loading = ref(true)
const allIcons = ref([])
const selectedIcons = ref([])
const copying = ref(false)
const copyingIcon = ref('')

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('')
const viewMode = ref('grid')

// 显示设置
const iconSize = ref('6')
const columnsCount = ref(8)
const showIconNames = ref(true)

// 分页
const currentPage = ref(1)
const pageSize = ref(100)

// 图标分类
const categories = ref([
  { label: '导航', value: 'navigation' },
  { label: '操作', value: 'action' },
  { label: '状态', value: 'status' },
  { label: '媒体', value: 'media' },
  { label: '通信', value: 'communication' },
  { label: '文件', value: 'file' },
  { label: '编辑', value: 'edit' },
  { label: '设备', value: 'device' },
  { label: '其他', value: 'other' }
])

// 使用搜索防抖hook
const { searchResults, isSearching, setSearchQuery } = useSearchDebounce(async (query) => {
  if (!query.trim()) return allIcons.value

  return allIcons.value.filter(
    (icon) =>
      icon.displayName.toLowerCase().includes(query.toLowerCase()) ||
      icon.name.toLowerCase().includes(query.toLowerCase())
  )
}, 300)

// 使用复制hook
const { copy } = useCopyText()

// 计算属性
const filteredIcons = computed(() => {
  let icons = searchQuery.value ? searchResults.value : allIcons.value

  // 按分类筛选
  if (selectedCategory.value) {
    icons = icons.filter((icon) => icon.category === selectedCategory.value)
  }

  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return icons.slice(start, end)
})

const totalPages = computed(() => {
  const total = searchQuery.value ? searchResults.value.length : allIcons.value.length
  return Math.ceil(total / pageSize.value)
})

// 图标分类映射
const getCategoryByName = (name) => {
  const categoryMap = {
    add: 'action',
    delete: 'action',
    edit: 'edit',
    close: 'action',
    back: 'navigation',
    arrow: 'navigation',
    home: 'navigation',
    search: 'action',
    setting: 'action',
    user: 'communication',
    phone: 'communication',
    message: 'communication',
    mail: 'communication',
    file: 'file',
    folder: 'file',
    image: 'media',
    video: 'media',
    music: 'media',
    camera: 'device',
    location: 'device',
    time: 'status',
    success: 'status',
    error: 'status',
    warning: 'status',
    info: 'status'
  }

  for (const [key, category] of Object.entries(categoryMap)) {
    if (name.includes(key)) {
      return category
    }
  }

  return 'other'
}

// 方法
const loadIcons = async () => {
  loading.value = true
  try {
    const iconsModule = await import('@iconify-json/weui/icons.json')
    const iconNames = Object.keys(iconsModule.icons)

    allIcons.value = iconNames.map((name) => {
      const iconName = `i-weui-${name}`
      return {
        name: iconName,
        displayName: name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        category: getCategoryByName(name),
        originalName: name
      }
    })

    // 预加载图标类名以解决UnoCSS缓存问题
    const iconClasses = allIcons.value.map((icon) => icon.name)
    await preloadIconClasses(iconClasses)
  } catch (error) {
    console.error('加载图标失败:', error)
    ElMessage.error('加载图标失败，请刷新页面重试')
  } finally {
    loading.value = false
  }
}

// 预加载图标类名以解决UnoCSS动态类名缓存问题
const preloadIconClasses = async (iconClasses) => {
  // 创建隐藏的div来触发UnoCSS加载这些类名
  const preloadDiv = document.createElement('div')
  preloadDiv.style.position = 'absolute'
  preloadDiv.style.left = '-9999px'
  preloadDiv.style.top = '-9999px'
  preloadDiv.style.visibility = 'hidden'

  iconClasses.forEach((iconClass) => {
    const iconEl = document.createElement('div')
    iconEl.className = `${iconClass} w-4 h-4 w-6 h-6 w-8 h-8`
    preloadDiv.appendChild(iconEl)
  })

  document.body.appendChild(preloadDiv)

  // 等待一帧后移除
  await new Promise((resolve) => requestAnimationFrame(resolve))
  document.body.removeChild(preloadDiv)
}

const handleSearch = (query) => {
  setSearchQuery(query)
  currentPage.value = 1
}

const handleCategoryChange = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
}

const toggleIconSelection = (iconName) => {
  const index = selectedIcons.value.indexOf(iconName)
  if (index > -1) {
    selectedIcons.value.splice(index, 1)
  } else {
    selectedIcons.value.push(iconName)
  }
}

const selectAll = () => {
  selectedIcons.value = filteredIcons.value.map((icon) => icon.name)
}

const clearSelection = () => {
  selectedIcons.value = []
}

const copyIconClass = async (iconName) => {
  copyingIcon.value = iconName
  try {
    const success = await copy(iconName)
    if (success) {
      ElMessage.success(`已复制: ${iconName}`)
    } else {
      ElMessage.error('复制失败')
    }
  } catch (error) {
    ElMessage.error('复制失败')
  } finally {
    copyingIcon.value = ''
  }
}

const copySelectedIcons = async () => {
  if (selectedIcons.value.length === 0) return

  copying.value = true
  try {
    const iconList = selectedIcons.value.join('\n')
    const success = await copy(iconList)
    if (success) {
      ElMessage.success(`已复制 ${selectedIcons.value.length} 个图标类名`)
      clearSelection()
    } else {
      ElMessage.error('批量复制失败')
    }
  } catch (error) {
    ElMessage.error('批量复制失败')
  } finally {
    copying.value = false
  }
}

const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page) => {
  currentPage.value = page
}

// 监听搜索查询变化
watch(searchQuery, () => {
  currentPage.value = 1
})

// 组件挂载时加载图标
onMounted(() => {
  loadIcons()
})
</script>

<style scoped>
.icons-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.page-header {
  flex-shrink: 0;
}

.filter-panel {
  flex-shrink: 0;
}

.icons-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 图标网格样式 */
.icon-grid {
  display: grid;
  gap: 16px;
  padding: 16px;
  overflow-y: auto;
}

.icon-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 120px;
}

.icon-item:hover {
  border-color: #6366f1;
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
}

.icon-item.selected {
  border-color: #6366f1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.icon-item.selected .icon-name {
  color: white;
}

/* 选择指示器 */
.selection-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.icon-item:hover .selection-indicator,
.icon-item.selected .selection-indicator {
  opacity: 1;
}

.icon-item.selected .selection-indicator {
  background: rgba(255, 255, 255, 0.2);
}

/* 图标显示区域 */
.icon-display {
  margin-bottom: 12px;
  transition: transform 0.2s ease;
}

.icon-item:hover .icon-display {
  transform: scale(1.1);
}

/* 图标名称 */
.icon-name {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 8px;
}

/* 操作按钮 */
.icon-actions {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.icon-item:hover .icon-actions {
  opacity: 1;
}

.icon-item.selected .icon-actions {
  opacity: 1;
}

.icon-item.selected .icon-actions .el-button {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

/* 列表视图样式 */
.icon-list {
  padding: 16px;
  overflow-y: auto;
}

.icon-list-item {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-list-item:hover {
  border-color: #6366f1;
  background: #f8fafc;
}

.icon-list-item.selected {
  border-color: #6366f1;
  background: #eef2ff;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .icon-grid {
    grid-template-columns: repeat(6, 1fr) !important;
    gap: 12px;
    padding: 12px;
  }

  .icon-item {
    padding: 12px;
    min-height: 100px;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 16px;
  }

  .page-header .flex {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .filter-panel {
    padding: 16px;
  }

  .filter-panel .grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .filter-panel .flex {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .icon-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 8px;
    padding: 8px;
  }

  .icon-item {
    padding: 8px;
    min-height: 80px;
  }

  .icon-name {
    font-size: 10px;
  }
}

@media (max-width: 640px) {
  .icon-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }

  .icon-item {
    min-height: 70px;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon-item {
  animation: fadeIn 0.3s ease;
}

/* 滚动条样式 */
.icon-grid::-webkit-scrollbar,
.icon-list::-webkit-scrollbar {
  width: 6px;
}

.icon-grid::-webkit-scrollbar-track,
.icon-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.icon-grid::-webkit-scrollbar-thumb,
.icon-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.icon-grid::-webkit-scrollbar-thumb:hover,
.icon-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
