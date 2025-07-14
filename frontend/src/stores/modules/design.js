import { defineStore } from 'pinia';
import designSetting from '@/config/design';

const { isCollapse: reisCollapse, layout: reLayout } = designSetting;

export const useDesignStore = defineStore(
  'design',
  () => {
    const layout = ref(reLayout);

    // 最终是否展开左侧菜单
    const isCollapse = ref(reisCollapse);

    const setCollapse = (collapseFinal) => {
      isCollapse.value = collapseFinal;
    };

    return {
      layout,
      isCollapse,
      setCollapse,
    };
  },
  {
    persist: true,
  },
);
