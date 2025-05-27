// 控制器注册中心
export const controllerRegistry = new Map()

// 注册控制器
export function registerController(controllerName, controllerImplementation) {
  controllerRegistry.set(controllerName, controllerImplementation)
}

// 获取控制器
export function getController(controllerName) {
  return controllerRegistry.get(controllerName)
}

// 自动导入所有控制器
export function loadAllControllers() {
  const controllersContext = import.meta.glob('./*/index.js', { eager: true })

  Object.values(controllersContext).forEach((module) => {
    if (module.default && typeof module.default === 'object') {
      // 如果模块有默认导出且是对象，假定它是一个控制器
      const controllerName = module.controllerName || module.default.name
      if (controllerName) {
        registerController(controllerName, module.default)
      }
    }
  })

  console.log('controller:', Array.from(controllerRegistry.keys()))
}
