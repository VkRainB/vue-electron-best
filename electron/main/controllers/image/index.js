import fs from 'fs/promises'
import path from 'path'
import { app } from 'electron'

// 图片控制器实现
const imageController = {
  // 获取系统图片目录
  async getPicturesDirectory() {
    return app.getPath('pictures')
  },

  // 列出图片目录内容
  async listPictures(dirPath = null) {
    try {
      // 如果未提供目录路径，使用系统图片目录
      const picturesPath = dirPath || (await this.getPicturesDirectory())

      // 读取目录内容
      const entries = await fs.readdir(picturesPath, { withFileTypes: true })

      // 获取每个条目的详细信息
      const result = await Promise.all(
        entries.map(async (entry) => {
          const entryPath = path.join(picturesPath, entry.name)
          const stats = await fs.stat(entryPath)

          return {
            name: entry.name,
            path: entryPath,
            isDirectory: entry.isDirectory(),
            size: stats.size,
            modifiedTime: stats.mtime,
            isImage: this.isImageFile(entry.name)
          }
        })
      )

      // 过滤出图片和目录
      return result.filter((item) => item.isDirectory || item.isImage)
    } catch (error) {
      console.error('列出图片目录内容失败:', error)
      throw new Error(`列出图片目录内容失败: ${error.message}`)
    }
  },

  // 读取图片文件
  async readImage(imagePath) {
    try {
      // 读取图片文件
      const imageData = await fs.readFile(imagePath)
      return imageData.toString('base64')
    } catch (error) {
      console.error('读取图片失败:', error)
      throw new Error(`读取图片失败: ${error.message}`)
    }
  },

  // 判断文件是否为图片
  isImageFile(filename) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
    const ext = path.extname(filename).toLowerCase()
    return imageExtensions.includes(ext)
  }
}

// 导出控制器名称，用于自动注册
export const controllerName = 'image'

// 默认导出控制器对象
export default imageController
