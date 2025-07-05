<script setup>
import { computed, h, resolveComponent } from 'vue';
import { isExternal } from '@/utils/common';

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: '18px' },
  color: { type: String, default: '#000' },
});

const iconStyle = computed(() => ({
  fontSize: props.size,
  color: props.color,
}));

function renderIcon() {
  if (props.name.startsWith('el-icon-')) {
    return h(resolveComponent(props.name), { style: iconStyle.value, class: 'icon' });
  }
  else if (props.name.startsWith('svg-')) {
    return h(resolveComponent(props.name), { style: iconStyle.value, class: 'icon' });
  }
  else if (isExternal(props.name)) {
    return h('img', { src: props.name, style: iconStyle.value, class: 'icon' });
  }
  else {
    return h('i', { class: [props.name, 'icon'], style: iconStyle.value });
  }
}
</script>

<template>
  <span class="icon-wrapper">
    <component :is="renderIcon()" />
  </span>
</template>
