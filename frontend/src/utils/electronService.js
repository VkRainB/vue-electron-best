// 服务缓存
const serviceCache = new Map()

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
            return await window.api.service.callMethod(serviceName, methodName, ...args)
          } catch (error) {
            console.error(`Error calling ${serviceName}.${methodName}:`, error)
            throw error
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
  console.log('window.api', window.api)
  if (!serviceCache.has(serviceName)) {
    console.log('getService', serviceName)
    const serviceProxy = createServiceProxy(serviceName)
    serviceCache.set(serviceName, serviceProxy)
  }

  return serviceCache.get(serviceName)
}

// 导出常用服务名称常量
export const SERVICE_NAMES = {
  FILE: 'file',
  IMAGE: 'image'
}
