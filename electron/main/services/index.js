import { ipcMain } from 'electron';
import { CHANNELS } from './channels';

// 服务注册中心
export const serviceRegistry = new Map();

// 加载相关服务
export async function loadAllServices() {
  // 导入图片服务
  const imageModule = await import('./image/index.js');
  if (imageModule.serviceName && imageModule.default) {
    serviceRegistry.set(imageModule.serviceName, imageModule.default);
  }
  console.log('Loaded services:', Array.from(serviceRegistry.keys()));
}

// 设置服务请求处理
export function setupServiceRequests() {
  // 使用 handle 处理服务调用
  ipcMain.handle(CHANNELS.INVOKE_SERVICE_METHOD, async (_event, { serviceName, method, args }) => {
    try {
      const service = serviceRegistry.get(serviceName);

      if (!service) {
        throw new Error(`Service not found: ${serviceName}`);
      }

      if (typeof service[method] !== 'function') {
        throw new TypeError(`Method ${method} not found in service ${serviceName}`);
      }

      // 调用服务方法并返回结果
      return await service[method](...args);
    } catch (error) {
      // 将错误转换为可序列化的对象
      console.error('Service error:', error);
      throw new Error(error.message);
    }
  });
}
