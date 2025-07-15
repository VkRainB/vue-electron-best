import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const retLoginName = ref('admin');

  return {
    retLoginName,
  };
});
