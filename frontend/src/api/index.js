/**
 * 统一的API调用接口
 * 基于Electron的IPC通信机制，提供类型安全的服务调用
 */

/**
 * 服务调用基础类
 * 封装与Electron主进程的通信逻辑
 */
class ServiceAPI {
  constructor() {
    // 检查是否在Electron环境中
    if (!window.api?.service) {
      console.warn('Service API not available. Running in browser mode.');
      this.isElectronMode = false;
    }
    else {
      this.isElectronMode = true;
    }
  }

  /**
   * 调用服务方法
   * @param {string} serviceName - 服务名称
   * @param {string} methodName - 方法名称
   * @param {...any} args - 方法参数
   * @returns {Promise<any>} 服务调用结果
   */
  async callMethod(serviceName, methodName, ...args) {
    if (!this.isElectronMode) {
      throw new Error('Service calls are only available in Electron environment');
    }

    try {
      const result = await window.api.service.callMethod(serviceName, methodName, ...args);
      return result;
    }
    catch (error) {
      console.error(`Service call failed: ${serviceName}.${methodName}`, error);
      throw new Error(`服务调用失败: ${error.message || '未知错误'}`);
    }
  }

  /**
   * 检查服务是否可用
   * @returns {boolean} 服务是否可用
   */
  isAvailable() {
    return this.isElectronMode;
  }
}

// 创建全局服务API实例
export const serviceAPI = new ServiceAPI();

/**
 * 图片服务API
 * 封装图片相关的服务调用
 */
export class ImageAPI {
  constructor(serviceAPI) {
    this.service = serviceAPI;
    this.serviceName = 'image';
  }

  /**
   * 获取系统图片目录
   * @returns {Promise<string>} 图片目录路径
   */
  async getPicturesDirectory() {
    return await this.service.callMethod(this.serviceName, 'getPicturesDirectory');
  }

  /**
   * 列出图片目录内容
   * @param {string} [dirPath] - 目录路径，不提供则使用系统图片目录
   * @returns {Promise<Array>} 图片和目录列表
   */
  async listPictures(dirPath = null) {
    return await this.service.callMethod(this.serviceName, 'listPictures', dirPath);
  }

  /**
   * 读取图片文件
   * @param {string} imagePath - 图片文件路径
   * @returns {Promise<object>} 图片数据对象 {data, mimeType, size}
   */
  async readImage(imagePath) {
    return await this.service.callMethod(this.serviceName, 'readImage', imagePath);
  }

  /**
   * 获取图片信息
   * @param {string} imagePath - 图片文件路径
   * @returns {Promise<object>} 图片信息对象
   */
  async getImageInfo(imagePath) {
    return await this.service.callMethod(this.serviceName, 'getImageInfo', imagePath);
  }

  /**
   * 显示图片选择对话框
   * @param {object} [options] - 对话框选项
   * @returns {Promise<object>} 选择结果 {canceled, filePaths}
   */
  async showImageSelectDialog(options = {}) {
    return await this.service.callMethod(this.serviceName, 'showImageSelectDialog', options);
  }

  /**
   * 批量获取图片信息
   * @param {Array<string>} imagePaths - 图片路径数组
   * @returns {Promise<Array>} 图片信息数组
   */
  async getMultipleImageInfo(imagePaths) {
    return await this.service.callMethod(this.serviceName, 'getMultipleImageInfo', imagePaths);
  }

  /**
   * 批量读取图片数据
   * @param {Array<string>} imagePaths - 图片路径数组
   * @param {number} [maxCount] - 最大读取数量
   * @returns {Promise<Array>} 图片数据数组
   */
  async readMultipleImages(imagePaths, maxCount = 10) {
    return await this.service.callMethod(this.serviceName, 'readMultipleImages', imagePaths, maxCount);
  }
}

// 创建图片API实例
export const imageAPI = new ImageAPI(serviceAPI);

/**
 * API模块导出
 * 提供统一的API访问入口
 */
export default {
  service: serviceAPI,
  image: imageAPI,
};
