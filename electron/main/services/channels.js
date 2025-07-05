import { ipcRenderer } from 'electron';

export const CHANNELS = {
  INVOKE_SERVICE_METHOD: 'invoke-service-method',
  REQUEST_SERVICE: 'request-service',
};

// 服务代理API

export const service = {
  // 调用服务方法
  callMethod: (serviceName, methodName, ...args) => {
    return ipcRenderer.invoke(CHANNELS.INVOKE_SERVICE_METHOD, {
      serviceName,
      method: methodName,
      args,
    });
  },

  // 发送消息到主进程
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  // 同步发送消息到主进程
  sendSync: (channel, data) => {
    return ipcRenderer.sendSync(channel, data);
  },

  // 监听主进程消息
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },

  // 监听主进程消息（一次性）
  once: (channel, callback) => {
    ipcRenderer.once(channel, callback);
  },

  // 移除监听器
  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },

  // 移除所有监听器
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
};
