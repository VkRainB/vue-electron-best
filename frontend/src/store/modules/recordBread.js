import { defineStore } from 'pinia';
import { useKeepAliveStore } from './keepAlive';

// 录单面包屑数据
export const useRecordBreadStore = defineStore('recordBread', {
  state: () => {
    return {
      recordBread: [], // 录单面包屑列表 可以使用mokeRecordBread
      activeTab: '',
    };
  },
  actions: {
    add(data) {
      const existingCrumb = this.recordBread.find((v) => v.id == data.id);
      if (!existingCrumb) {
        this.recordBread.push(data);
        useKeepAliveStore().excludeName = [];
      }
    },
    remove(id) {
      this.recordBread = this.recordBread.filter((item) => item.id !== id);
    },
    clean() {
      this.recordBread = [];
    },
    // 更新对应录单名称
    update(name, id) {
      this.recordBread.forEach((item) => {
        if (item.id == id) {
          item.tagName = name;
        }
      });
    },
  },
});

