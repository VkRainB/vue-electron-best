import { defineStore } from 'pinia';
import designSetting from '@/config/design';

const { isCollapse: reisCollapse, layout: reLayout, navbarHeight: reNavbarHeight } = designSetting;

export const useDesignStore = defineStore(
  'design',
  () => {
    const layout = ref(reLayout);
    const navbarHeight = ref(reNavbarHeight);

    // 最终是否展开左侧菜单
    const isCollapse = ref(reisCollapse);

    const setCollapse = (collapseFinal) => {
      isCollapse.value = collapseFinal;
    };

    return {
      layout,
      isCollapse,
      navbarHeight,
      setCollapse,
    };
  },
  {
    persist: true,
  }
);
