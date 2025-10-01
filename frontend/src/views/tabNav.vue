<script setup>
// 使用标签页的规则

// 1：跳转到标签页定义query结构 path必填，id必填,info是传递到页面的数据
// router.push({ name: 'tabNav', query: { path: '/makeOrder', id:'',...info } });

// 2:在路由的meta中定义istabPage:true 属性,用于选中高亮

// 3:在stores/modules/keepAlive定义添加组件名，用于清除缓存
</script>

<template>
  <slot></slot>
</template>

<style scoped lang="scss"></style>
