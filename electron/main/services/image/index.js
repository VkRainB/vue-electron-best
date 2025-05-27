import { getController } from '../../controllers'

// 图片服务实现
const imageService = {
  // 获取系统图片目录
  async getPicturesDirectory() {
    const imageController = getController('image')
    if (!imageController) {
      throw new Error('图片控制器未注册')
    }
    return await imageController.getPicturesDirectory()
  },

  // 列出图片目录内容
  async listPictures(dirPath = null) {
    const imageController = getController('image')
    if (!imageController) {
      throw new Error('图片控制器未注册')
    }
    return await imageController.listPictures(dirPath)
  },

  // 读取图片文件
  async readImage(imagePath) {
    const imageController = getController('image')
    if (!imageController) {
      throw new Error('图片控制器未注册')
    }
    return await imageController.readImage(imagePath)
  }
}

// 导出服务名称，用于自动注册
export const serviceName = 'image'

// 默认导出服务对象
export default imageService
