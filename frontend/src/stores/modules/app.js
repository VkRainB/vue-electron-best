import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  // 显示更新
  const showUpdate = ref(false);

  return {
    showUpdate,
  };
});
