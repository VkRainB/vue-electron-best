<template>
  <!-- WeUI 图标 -->
  <span
    v-if="isWeUIIcon"
    :class="iconClasses"
    :style="iconStyles"
    :title="tooltip"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
  
  <!-- Element Plus 图标 -->
  <el-icon
    v-else
    :class="elIconClasses"
    :style="iconStyles"
    :title="tooltip"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <component :is="elementIcon" />
  </el-icon>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ElIcon } from 'element-plus'
import { getIcon, hasIcon } from '@/config/weui-icons'
import * as ElementPlusIcons from '@element-plus/icons-vue'

// Props定义
const props = defineProps({
  // 图标名称或完整类名
  name: {
    type: String,
    required: true
  },
  // 图标分类（可选，用于语义化获取图标）
  category: {
    type: String,
    default: ''
  },
  // 图标类型：weui 或 element
  type: {
    type: String,
    default: 'auto',
    validator: (value) => ['auto', 'weui', 'element'].includes(value)
  },
  // 图标尺寸：16px, 20px, 24px, 32px, 48px 或自定义
  size: {
    type: [String, Number],
    default: '24px',
    validator: (value) => {
      const validSizes = ['16px', '20px', '24px', '32px', '48px']
      return validSizes.includes(value) || !isNaN(Number(value))
    }
  },
  // 图标颜色
  color: {
    type: String,
    default: ''
  },
  // 是否可点击
  clickable: {
    type: Boolean,
    default: false
  },
  // 悬停效果类型：scale, color, opacity
  hoverEffect: {
    type: String,
    default: 'scale',
    validator: (value) => ['scale', 'color', 'opacity', 'none'].includes(value)
  },
  // 悬停时的颜色
  hoverColor: {
    type: String,
    default: '#3b82f6'
  },
  // tooltip提示文本
  tooltip: {
    type: String,
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 自定义CSS类
  customClass: {
    type: String,
    default: ''
  }
})

// Emits定义
const emit = defineEmits(['click'])

// 响应式状态
const isHovered = ref(false)

// 判断是否为 WeUI 图标
const isWeUIIcon = computed(() => {
  if (props.type === 'weui') return true
  if (props.type === 'element') return false
  
  // 自动判断
  return props.name.startsWith('i-weui-') || 
         (props.category && hasIcon(props.category, props.name))
})

// 获取 Element Plus 图标组件
const elementIcon = computed(() => {
  if (isWeUIIcon.value) return null
  
  // 将 kebab-case 转换为 PascalCase
  const iconName = props.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  
  return ElementPlusIcons[iconName] || ElementPlusIcons.QuestionFilled
})

// 计算 WeUI 图标类名
const iconClasses = computed(() => {
  if (!isWeUIIcon.value) return ''
  
  const classes = []

  // 获取图标类名
  let iconClass = props.name
  if (props.category && !props.name.startsWith('i-weui-')) {
    iconClass = getIcon(props.category, props.name)
  } else if (!props.name.startsWith('i-weui-')) {
    iconClass = `i-weui-${props.name}`
  }

  classes.push(iconClass)

  // 添加尺寸类
  const sizeClass = getSizeClass(props.size)
  if (sizeClass) {
    classes.push(sizeClass)
  }

  // 添加交互状态类
  if (props.clickable) {
    classes.push('cursor-pointer')
  }

  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed pointer-events-none')
  }

  if (isHovered.value && props.hoverEffect !== 'none') {
    if (props.hoverEffect === 'scale') {
      classes.push('transform scale-110')
    } else if (props.hoverEffect === 'opacity') {
      classes.push('opacity-80')
    }
  }

  // 添加自定义类
  if (props.customClass) {
    classes.push(props.customClass)
  }

  return classes.join(' ')
})

// 计算 Element Plus 图标类名
const elIconClasses = computed(() => {
  if (isWeUIIcon.value) return ''
  
  const classes = []

  // 添加交互状态类
  if (props.clickable) {
    classes.push('cursor-pointer')
  }

  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed pointer-events-none')
  }

  if (isHovered.value && props.hoverEffect !== 'none') {
    if (props.hoverEffect === 'scale') {
      classes.push('transform scale-110')
    } else if (props.hoverEffect === 'opacity') {
      classes.push('opacity-80')
    }
  }

  // 添加自定义类
  if (props.customClass) {
    classes.push(props.customClass)
  }

  return classes.join(' ')
})

// 计算图标样式
const iconStyles = computed(() => {
  const styles = {}

  // 设置尺寸
  const size = getSizeValue(props.size)
  if (size) {
    if (isWeUIIcon.value) {
      // WeUI 图标使用 width/height/fontSize
      styles.width = size
      styles.height = size
      styles.fontSize = size
    } else {
      // Element Plus 图标只使用 fontSize
      styles.fontSize = size
    }
  }

  // 设置颜色
  if (props.color) {
    styles.color = props.color
  }

  // 悬停时的颜色变化
  if (isHovered.value && props.hoverEffect === 'color' && props.hoverColor) {
    styles.color = props.hoverColor
  }

  return styles
})

// 获取尺寸类名
const getSizeClass = (size) => {
  const sizeMap = {
    '16px': 'w-4 h-4',
    '20px': 'w-5 h-5',
    '24px': 'w-6 h-6',
    '32px': 'w-8 h-8',
    '48px': 'w-12 h-12'
  }
  return sizeMap[size] || ''
}

// 获取尺寸值
const getSizeValue = (size) => {
  if (typeof size === 'number') {
    return `${size}px`
  }
  if (typeof size === 'string' && !isNaN(Number(size))) {
    return `${size}px`
  }
  return size
}

// 事件处理
const handleClick = (event) => {
  if (!props.disabled && props.clickable) {
    emit('click', event)
  }
}

const handleMouseEnter = () => {
  if (!props.disabled) {
    isHovered.value = true
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<style lang="scss" scoped>
span,
:deep(.el-icon) {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.2s ease;

  &.cursor-pointer:active {
    transform: scale(0.95);
  }
}
</style>
