<!-- 基础布局 -->
<script setup>
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import images from '@/assets/images/index.js';
import Icon from '@/components/icon/index.vue';
import { useSecretTrigger } from '@/hooks/useSecretTrigger';
import Aside from '@/layouts/components/Aside/index.vue';
import Header from '@/layouts/components/Header/index.vue';
import Main from '@/layouts/components/Main/index.vue';
import { useDesignStore, useKeepAliveStore } from '@/store';
import { useRecordBreadStore } from '@/store/modules/recordBread';

const router = useRouter();
const route = useRoute();

const designStore = useDesignStore();
const { isCollapse } = storeToRefs(designStore);
const currentRouteName = computed(() => route.name);

const { activeTab, recordBread: tabList } = storeToRefs(useRecordBreadStore());

const menuList = [{ label: '设置', componentName: 'settings' }];

function handleTabClick({ paneName }) {
  activeTab.value = paneName;
  const query = tabList.value.find((item) => item.id == paneName).query;
  router.replace({ path: query.path, query });
  // console.log('query', query);
}
function handleTabRemove(tabId) {
  useRecordBreadStore().remove(tabId);

  // 如果删除的是当前激活的标签页
  if (activeTab.value === tabId) {
    const remainingTabs = tabList.value.filter((t) => t.id !== tabId);
    if (remainingTabs.length > 0) {
      // 激活最后一个标签页
      const lastTab = remainingTabs[remainingTabs.length - 1];
      activeTab.value = lastTab.id;
      handleTabClick({ paneName: lastTab.id });
    } else {
      // 清理标签页缓存
      useKeepAliveStore().clearTabCache();
      // 没有标签页了，跳转到首页
      router.push('/home');
    }
  }
}

function toggleSidebar() {
  designStore.setCollapse(!isCollapse.value);
}

function changeRouter(val) {
  if (currentRouteName.value !== val) {
    router.push(`/${val}`);
  }
}

function changeZoom(direction) {
  ipc.send('zoom:changed', direction);
}

function outLogin() {
  localStorage.removeItem('autoLogin');
  router.push({ name: 'login' });
}

function exitLogin() {
  ipc.send('app:exit');
}
onBeforeMount(async () => {});

const { handleClick: goIcon } = useSecretTrigger({
  clickCount: 3,
  timeWindow: 3000,
  triggerKey: 'Control',
  callback: () => {
    router.push('/icons');
  },
});
</script>

<template>
  <el-container class="main-layout">
    <el-header class="main-layout__header" height="var(--top-height)">
      <Header class="header__bg">
        <template #app-icon>
          <img :src="images.dome.icon" class="w-20px h-20px" />
          <div class="text-12px">app-name</div>
        </template>
        <template #nav-left>
          <div class="flex items-center">
            <img @click="goIcon()" :src="images.dome.icon" class="w-44px h-44px mx-3 select-none" />
            <div class="min-w-160px text-white text-5 md:text-6 lg:text-7 font-bold">app-name</div>
          </div>
        </template>

        <template #nav-right>
          <div>
            <ul class="flex items-center">
              <li
                v-for="item in menuList"
                :key="item.index"
                class="relative lt-md:text-[16px] text-[20px] cursor-pointer hover:text-yellow-300 px-[15px]"
                :class="currentRouteName === item.componentName ? 'text-yellow-300' : 'text-white'"
                @click="changeRouter(item.componentName)"
              >
                {{ item.label }}
                <el-badge
                  :show-zero="false"
                  :value="item.count"
                  :max="99"
                  badge-class="border-none pr-[6px] pl-[5px] m-[2px] rounded-[7px]"
                  class="absolute"
                />
              </li>
              <li class="">
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
                      <div class="flex items-center gap-1 cursor-pointer" @click="changeZoom('in')">
                        <Icon name="el-icon-zoomIn" size="16" />
                        <span class="select-none">放大</span>
                      </div>
                      <div class="flex items-center gap-1 cursor-pointer" @click="changeZoom('out')">
                        <Icon name="el-icon-zoomOut" size="16" />
                        <span class="select-none">缩小</span>
                      </div>
                      <div class="flex items-center gap-1 cursor-pointer" @click="changeZoom('auto')">
                        <Icon name="el-icon-refresh" size="16" />
                        <span class="select-none">还原大小</span>
                      </div>
                    </div>
                    <template #reference>
                      <div class="mr-4 flex flex-col items-center cursor-pointer">
                        <img :src="images.dome.avatar" class="w-[30px] zangqing_filter" alt="" />
                        <p class="text-[16px] text-center text-white">
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
            <!-- 标签页 -->
            <div style="height: var(--tabs-height)" class="bg-#E9ECF2">
              <div class="tab-nav-container">
                <el-tabs
                  v-model="activeTab"
                  type="card"
                  class="demo-tabs"
                  closable
                  @tab-click="handleTabClick"
                  @tab-remove="handleTabRemove"
                >
                  <el-tab-pane v-for="item in tabList" :key="item.id" :label="item.tagName" :name="item.id" />
                </el-tabs>
              </div>
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
    --el-header-padding: 0px;
  }

  &__body {
    flex: 1;
    min-height: 0;
    margin-left: var(--sidebar-width, 200px);
    transition: margin-left 0.3s ease;
  }
  &__content {
    --el-main-padding: 0px;
  }

  .collapse {
    margin-left: 0px;
  }
}

.zangqing_filter {
  filter: hue-rotate(367.6deg) saturate(0.8) brightness(0.85) contrast(1.1);
}
</style>
