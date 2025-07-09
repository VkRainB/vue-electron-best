<script setup>
import { computed, h, resolveComponent } from 'vue';
import { isExternal } from '@/utils/common';

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: '18px' },
  color: { type: String, default: '#000' },
});

// 处理 size 值，确保返回带单位的字符串
const normalizedSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`;
  }
  // 如果是字符串但不包含单位，添加 px
  if (typeof props.size === 'string' && /^\d+$/.test(props.size)) {
    return `${props.size}px`;
  }
  return props.size;
});

const iconStyle = computed(() => ({
  fontSize: normalizedSize.value,
  width: normalizedSize.value,
  height: normalizedSize.value,
  color: props.color,
}));

function renderIcon() {
  if (props.name.startsWith('el-icon-')) {
    return h(resolveComponent(props.name), { style: iconStyle.value, class: '' });
  }
  else if (props.name.startsWith('svg-')) {
    return h(resolveComponent(props.name), { style: iconStyle.value, class: '' });
  }
  else if (isExternal(props.name)) {
    return h('img', { src: props.name, style: iconStyle.value, class: '' });
  }
  else {
    return h('i', { class: [props.name], style: iconStyle.value });
  }
}
</script>

<template>
  <component :is="renderIcon()" />
</template>
