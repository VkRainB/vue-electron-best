import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 服务通道定义
const CHANNELS = {
  REQUEST_SERVICE: 'request-service',
  INVOKE_SERVICE_METHOD: 'invoke-service-method'
}

// 服务代理API
const serviceAPI = {
  // 请求服务方法
  callMethod: (serviceName, methodName, ...args) => {
    // 使用 invoke 模式，这是更简单且安全的方式
    return ipcRenderer.invoke(CHANNELS.INVOKE_SERVICE_METHOD, {
      serviceName,
      method: methodName,
      args
    })
  }
}

// Custom APIs for renderer
const api = {
  // 服务API
  service: serviceAPI
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
