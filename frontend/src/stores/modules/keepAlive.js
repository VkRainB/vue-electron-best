import { defineStore } from 'pinia';

export const useKeepAliveStore = defineStore(
  'keep-alive',
  () => {
    const keepAliveName = ref([]);

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

    return {
      keepAliveName,
      addKeepAliveName,
      removeKeepAliveName,
      setKeepAliveName,
    };
  },
  {
    persist: true,
  }
);
