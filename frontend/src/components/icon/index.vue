<script setup>
import { computed, h, resolveComponent } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: '20px' },
  color: { type: String, default: '#696868' },
  customClass: { type: String, default: '' },
  customStyle: { type: String, default: '' },
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

const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.customClass}`;
  }
  return 'svg-icon';
});

function toPascalCase(str) {
  // 支持:el-icon-alarm-clock  / el-icon-AlarmClock
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .split(/[-_]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}
function renderIcon() {
  // 处理el-icon
  if (props.name.startsWith('el-icon-')) {
    const iconName = props.name.slice(8);
    const pascalName = `el-icon-${toPascalCase(iconName)}`;
    return h(
      ElIcon,
      {
        class: props.customClass,
        style: props.customStyle,
        size: props.size,
        color: props.color,
      },
      {
        default: () => [h(resolveComponent(pascalName))],
      }
    );
  }
  // 处理本地svg
  else if (props.name.startsWith('svg-')) {
    return h(
      'svg',
      {
        class: svgClass.value,
        'aria-hidden': 'true',
        style: { fontSize: props.size },
      },
      [
        h('use', {
          'xlink:href': `#${props.name}`,
          fill: props.color,
        }),
      ]
    );
  }
  // 处理图标预设
  else {
    return h('i', { class: [props.name], style: iconStyle.value });
  }
}
</script>

<template>
  <component :is="renderIcon()" />
</template>

<style scoped lang="scss">
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  vertical-align: -2px;
  fill: currentColor;
}
</style>
