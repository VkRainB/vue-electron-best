import { ipcMain } from 'electron'

// 通道定义
const CHANNELS = {
  INVOKE_SERVICE_METHOD: 'invoke-service-method'
}

// 服务注册中心
export const serviceRegistry = new Map()

// 注册服务
export function registerService(serviceName, serviceImplementation) {
  serviceRegistry.set(serviceName, serviceImplementation)
  console.log(`Service registered: ${serviceName}`)
}

// 获取服务
export function getService(serviceName) {
  return serviceRegistry.get(serviceName)
}

// 手动导入所有服务
export async function loadAllServices() {
  try {
    // 导入图片服务
    const imageModule = await import('./image/index.js')
    if (imageModule.serviceName && imageModule.default) {
      registerService(imageModule.serviceName, imageModule.default)
    }

    console.log('Loaded services:', Array.from(serviceRegistry.keys()))
  } catch (error) {
    console.error('Failed to load services:', error)
  }
}

// 设置服务请求处理
export function setupServiceRequests() {
  // 使用 handle 处理服务调用
  ipcMain.handle(CHANNELS.INVOKE_SERVICE_METHOD, async (_event, { serviceName, method, args }) => {
    try {
      const service = serviceRegistry.get(serviceName)

      if (!service) {
        throw new Error(`Service not found: ${serviceName}`)
      }

      if (typeof service[method] !== 'function') {
        throw new Error(`Method ${method} not found in service ${serviceName}`)
      }

      // 调用服务方法并返回结果
      return await service[method](...args)
    } catch (error) {
      // 将错误转换为可序列化的对象
      console.error('Service error:', error)
      throw {
        message: error.message,
        name: error.name,
        stack: error.stack
      }
    }
  })
}
