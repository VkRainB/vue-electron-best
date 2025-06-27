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
