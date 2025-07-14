/**
 * 主进程与渲染进程通信频道定义
 */

export const ipcApiRoute = {
  example: {
    test: 'services/example/test',
  },
  framework: {
    checkForUpdater: 'services/framework/checkForUpdater',
  },
};

export function dispense(ipcType, channel, ...args) {
  const { IpcRenderer } = window.electron;
  const ipcMethod = IpcRenderer[ipcType];
  if (!ipcMethod) {
    throw new Error(`检查IPC方法: ${ipcType}`);
  }
  return ipcMethod(channel, ...args);
}

export const ipc = {
  invoke: (channel, ...args) => dispense('invoke', channel, ...args),
  sendSync: (channel, ...args) => dispense('sendSync', channel, ...args),
  on: (channel, listener) => dispense('on', channel, listener),
  once: (channel, listener) => dispense('once', channel, listener),
  removeListener: (channel, listener) => dispense('removeListener', channel, listener),
  removeAllListeners: channel => dispense('removeAllListeners', channel),
  send: (channel, ...args) => dispense('send', channel, ...args),
  postMessage: (channel, message, transfer) => dispense('postMessage', channel, message, transfer),
  sendTo: (webContentsId, channel, ...args) => dispense('sendTo', webContentsId, channel, ...args),
  sendToHost: (channel, ...args) => dispense('sendToHost', channel, ...args),
};
