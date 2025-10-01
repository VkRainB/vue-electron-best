import { defineStore } from 'pinia';

export const useLocalStore = defineStore('locale', {
  state: () => {
    return {
      remember: false, // 是否记住密码
      houseKeeperFalse: [], //管家配置,
      defaultShopId: '', // 默认空，可自己选
    };
  },
  persist: true,
});
