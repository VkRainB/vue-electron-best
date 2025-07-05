import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

// 服务通道定义
const CHANNELS = {
  REQUEST_SERVICE: 'request-service',
  INVOKE_SERVICE_METHOD: 'invoke-service-method',
};

// 服务代理API
const serviceAPI = {
  callMethod: (serviceName, methodName, ...args) => {
    return ipcRenderer.invoke(CHANNELS.INVOKE_SERVICE_METHOD, {
      serviceName,
      method: methodName,
      args,
    });
  },
};

const api = {
  service: serviceAPI,
};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  }
  catch (error) {
    console.error(error);
  }
}
else {
  window.electron = electronAPI;
  window.api = api;
}
