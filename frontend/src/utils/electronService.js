// 服务缓存
const serviceCache = new Map()

/**
 * 服务调用错误类
 */
class ServiceError extends Error {
  constructor(serviceName, methodName, originalError) {
    super(`Service call failed: ${serviceName}.${methodName} - ${originalError.message}`)
    this.name = 'ServiceError'
    this.serviceName = serviceName
    this.methodName = methodName
    this.originalError = originalError
  }
}

/**
 * 检查 Electron API 是否可用
 */
function checkElectronAPI() {
  if (!window.api || !window.api.service) {
    throw new Error(
      'Electron API not available. Make sure you are running in Electron environment.'
    )
  }
}

/**
 * 创建服务代理
 * @param {string} serviceName 服务名称
 * @returns {Object} 服务代理对象
 */
function createServiceProxy(serviceName) {
  return new Proxy(
    {},
    {
      get: (target, methodName) => {
        if (typeof methodName !== 'string') return undefined

        return async (...args) => {
          try {
            checkElectronAPI()

            console.log(`Calling service: ${serviceName}.${methodName}`, args)
            const result = await window.api.service.callMethod(serviceName, methodName, ...args)
            console.log(`Service call result: ${serviceName}.${methodName}`, result)

            return result
          } catch (error) {
            console.error(`Service call error: ${serviceName}.${methodName}`, error)
            throw new ServiceError(serviceName, methodName, error)
          }
        }
      }
    }
  )
}

/**
 * 获取电子服务
 * @param {string} serviceName 服务名称
 * @returns {Object} 服务代理对象
 */
export function getService(serviceName) {
  if (!serviceName || typeof serviceName !== 'string') {
    throw new Error('Service name must be a non-empty string')
  }

  if (!serviceCache.has(serviceName)) {
    console.log(`Creating service proxy for: ${serviceName}`)
    const serviceProxy = createServiceProxy(serviceName)
    serviceCache.set(serviceName, serviceProxy)
  }

  return serviceCache.get(serviceName)
}

/**
 * 预加载常用服务（可选的性能优化）
 */
export function preloadServices() {
  Object.values(SERVICE_NAMES).forEach((serviceName) => {
    getService(serviceName)
  })
}

/**
 * 清除服务缓存
 */
export function clearServiceCache() {
  serviceCache.clear()
}

// 导出常用服务名称常量
export const SERVICE_NAMES = {
  IMAGE: 'image'
}

// 导出服务错误类
export { ServiceError }
