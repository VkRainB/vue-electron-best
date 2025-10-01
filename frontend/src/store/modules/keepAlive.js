import { defineStore } from 'pinia';

// tabPage组件名，用于清除缓存
const tabNames = ['makeOrder'];

export const useKeepAliveStore = defineStore(
  'keep-alive',
  () => {
    const keepAliveName = ref([]);
    const excludeName = ref([]);

    const addKeepAliveName = (name) => {
      if (!keepAliveName.value.includes(name)) {
        keepAliveName.value.push(name);
      }
    };

    const removeKeepAliveName = (name) => {
      keepAliveName.value = keepAliveName.value.filter((item) => item !== name);
    };

    const setKeepAliveName = (name) => {
      keepAliveName.value = name;
    };

    const clearTabCache = () => {
      excludeName.value = tabNames;
    };

    return {
      keepAliveName,
      excludeName,
      addKeepAliveName,
      removeKeepAliveName,
      setKeepAliveName,
      clearTabCache,
    };
  },
  {
    persist: true,
  }
);
