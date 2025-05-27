// 服务注册中心
export const serviceRegistry = new Map()

// 注册服务
export function registerService(serviceName, serviceImplementation) {
  serviceRegistry.set(serviceName, serviceImplementation)
}

// 获取服务
export function getService(serviceName) {
  return serviceRegistry.get(serviceName)
}

// 自动导入所有服务
export function loadAllServices() {
  const servicesContext = import.meta.glob('./*/index.js', { eager: true })

  Object.values(servicesContext).forEach((module) => {
    if (module.default && typeof module.default === 'object') {
      // 如果模块有默认导出且是对象，假定它是一个服务
      const serviceName = module.serviceName || module.default.name
      if (serviceName) {
        registerService(serviceName, module.default)
      }
    }
  })

  console.log('server:', Array.from(serviceRegistry.keys()))
}
