/**
 * 主进程与渲染进程通信频道定义
 */
export const ipcApiRoute = {
  getPicturesDirectory: 'services/image/getPicturesDirectory',
};

export function dispense(ipcType, route, ...args) {
  const channelEvent = `${ipcType}/${ipcApiRoute[route]}`;
  if (!channelEvent) {
    throw new Error(`检查路由: ${route}`);
  }
  const { IpcRenderer } = window.electron;
  const ipcMethod = IpcRenderer[ipcType];
  if (!ipcMethod) {
    throw new Error(`检查IPC方法: ${ipcType}`);
  }
  return ipcMethod(channelEvent, ...args);
}
