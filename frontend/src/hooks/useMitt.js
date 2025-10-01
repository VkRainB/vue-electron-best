import mitt from 'mitt';
import { getCurrentScope, onUnmounted } from 'vue';

const mittInstance = mitt();

export const useMitt = {
  on: (event, handler) => {
    mittInstance.on(event, handler);
    // 仅当在有效的响应式作用域中时才注册清理
    if (getCurrentScope()) {
      onUnmounted(() => {
        // console.log('off');
        mittInstance.off(event, handler);
      });
    }
  },
  emit: (event, data) => {
    mittInstance.emit(event, data);
  },
  off: (event, handler) => {
    mittInstance.off(event, handler);
  },
  emitter: () => {
    return mittInstance;
  },
};

export * from '@/emums';
