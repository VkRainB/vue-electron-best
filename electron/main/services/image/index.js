import { app } from 'electron';

// 图片服务实现
const imageService = {
  // 获取系统图片目录
  async getPicturesDirectory() {
    return app.getPath('pictures');
  },
};

// 导出服务名称，用于自动注册
export const serviceName = 'image';

// 默认导出服务对象
export default imageService;
