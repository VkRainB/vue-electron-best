<!-- 基础布局 -->
<script setup>
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import images from '@/assets/images/index.js';
import Icon from '@/components/icon/index.vue';
import Aside from '@/layouts/components/Aside/index.vue';
import Header from '@/layouts/components/Header/index.vue';
import Main from '@/layouts/components/Main/index.vue';
import { useDesignStore } from '@/stores';
import { useUserStore } from '@/stores/modules/user';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const retLoginName = userStore.retLoginName;

const designStore = useDesignStore();
const { isCollapse } = storeToRefs(designStore);
const currentRouteName = computed(() => route.name);

setInterval(() => {
  console.log('currentRouteName', currentRouteName.value);
}, 1000);

const menuList = [
  { label: '页面1', componentName: 'Page1' },
  { label: '页面2', componentName: 'Page2' },
  { label: '页面3', componentName: 'Page3', count: 0 },
  { label: '图标', componentName: 'Icons' },
];

function toggleSidebar() {
  designStore.setCollapse(!isCollapse.value);
}

function changeRouter(val) {
  // 获取当前路由的名称
  const currentRouteName = router.currentRoute.value.name;
  if (currentRouteName !== val) {
    router.push({ name: val });
  }
}

function handleRefresh() {
  window.location.hash = '';
  location.reload();
}
</script>

<template>
  <el-container class="main-layout">
    <el-header class="main-layout__header" height="var(--navbar-height)">
      <Header class="header__bg">
        <template #app-icon>
          <Icon name="el-icon-house" size="16" class="cursor-pointer" @click="handleRefresh" />
          <div class="text-14px select-none">
            软件平台
          </div>
        </template>
        <template #nav-left>
          <el-icon class="main-layout__toggle-btn" @click="toggleSidebar">
            <Icon v-if="isCollapse" name="el-icon-menu" />
            <Icon v-else name="el-icon-grid" />
          </el-icon>
        </template>

        <template #nav-right>
          <div>
            <ul class="flex items-center">
              <li
                v-for="item in menuList"
                :key="item.index"
                class="relative 2xl:text-[16px] text-[15px] cursor-pointer hover:text-yellow-300 px-[15px]"
                :class="currentRouteName === item.componentName ? 'text-yellow-300' : 'text-white'"
                @click="changeRouter(item.componentName)"
              >
                {{ item.label }}
                <el-badge :show-zero="false" :value="item.count" :max="99" badge-class="border-none pr-[6px] pl-[5px] m-[2px] rounded-[7px]" class="absolute" />
              </li>
              <li class="ml-4">
                <div class="relative">
                  <el-popover popper-class="main-content-popover" placement="left-start" :width="120" trigger="click">
                    <div class="text-[12px] flex flex-col items-start gap-2">
                      <div class="flex items-center gap-1 cursor-pointer" @click="outLogin()">
                        <Icon name="el-icon-refreshRight" size="16" />
                        <span class="select-none">重新登录</span>
                      </div>
                      <div class="flex items-center gap-1 cursor-pointer" @click="exitLogin()">
                        <Icon name="svg-sys-exit" size="small" />
                        <span class="select-none">退出登录</span>
                      </div>
                      <div class="flex items-center gap-1 cursor-pointer" @click="changeWindowSize('max')">
                        <Icon name="el-icon-zoomIn" size="16" />

                        <span class="select-none">放大</span>
                      </div>
                      <div class="flex items-center gap-1 cursor-pointer" @click="changeWindowSize('min')">
                        <Icon name="el-icon-zoomOut" size="16" />

                        <span class="select-none">缩小</span>
                      </div>
                      <div class="flex items-center gap-1 cursor-pointer" @click="changeWindowSize('auto')">
                        <Icon name="el-icon-refresh" size="16" />
                        <span class="select-none">还原大小</span>
                      </div>
                    </div>
                    <template #reference>
                      <div class="cursor-pointer">
                        <img :src="images.dome.avatar" class="w-[28px]" alt="">
                        <p class="text-[12px] text-center ">
                          {{ retLoginName }}
                        </p>
                      </div>
                    </template>
                  </el-popover>
                </div>
              </li>
            </ul>
          </div>
        </template>
      </Header>
    </el-header>

    <el-container class="main-layout__body" :class="{ collapse: isCollapse }">
      <el-main class="main-layout__content">
        <Aside />
        <Main>
          <template #default>
            <div style="height: var(--tabs-height);" class=" bg-#E9ECF2">
              标签页
            </div>
          </template>
        </Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.main-layout {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__header {
    --el-header-padding:0px;
  }

  &__body {
    flex: 1;
    min-height: 0;
    margin-left: var(--sidebar-width, 200px);
    transition: margin-left 0.3s ease;

  }
  &__content {
    --el-main-padding:0px;
  }

  .collapse {
      margin-left: 0px;
    }

}
</style>

<style lang="scss">

</style>
