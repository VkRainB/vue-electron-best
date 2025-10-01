import { ref } from 'vue';

/**
 * 托盘刷新
 */
export function trayRefresh() {
  ipc.removeAllListeners('tray:refresh');
  ipc.on('tray:refresh', () => {
    // 刷新
    location.hash = '';
    location.reload();
  });
}
/**
 * @description 断网监听
 * @returns 断网状态
 */
export function netDisconnect() {
  // todo （net.online + 定时轮询） 或 方案二（navigator.onLine 事件）
  // let currentStatus = net.online; // 初始状态
  // window.addEventListener('online', () => {});
  // window.addEventListener('offline', () => {});

  const networkStart = ref(true);
  ipc.removeAllListeners('net:disconnect');
  ipc.on('net:disconnect', () => {
    networkStart.value = false;
    let timer = setTimeout(() => {
      networkStart.value = true;
      clearTimeout(timer);
      timer = null;
    }, 2000);
  });

  return networkStart;
}

/**
 * @description 重载页面
 */
export function reloadListener() {
  ipc.removeAllListeners('app:reload');
  ipc.on('app:reload', () => {
    location.hash = '';
    location.reload();
  });
}
