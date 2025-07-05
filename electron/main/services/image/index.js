import fs from 'node:fs/promises';
import path from 'node:path';
import { app, dialog } from 'electron';

// 图片服务实现
const imageService = {
  // 获取系统图片目录
  async getPicturesDirectory() {
    try {
      return app.getPath('pictures');
    }
    catch (error) {
      console.error('获取图片目录失败:', error);
      throw new Error(`获取图片目录失败: ${error.message}`);
    }
  },

  // 列出图片目录内容
  async listPictures(dirPath = null) {
    try {
      // 如果未提供目录路径，使用系统图片目录
      const picturesPath = dirPath || (await this.getPicturesDirectory());

      // 检查目录是否存在
      try {
        await fs.access(picturesPath);
      }
      catch {
        throw new Error(`目录不存在: ${picturesPath}`);
      }

      // 读取目录内容
      const entries = await fs.readdir(picturesPath, { withFileTypes: true });

      // 获取每个条目的详细信息
      const result = await Promise.all(
        entries.map(async (entry) => {
          const entryPath = path.join(picturesPath, entry.name);

          try {
            const stats = await fs.stat(entryPath);
            return {
              name: entry.name,
              path: entryPath,
              isDirectory: entry.isDirectory(),
              size: stats.size,
              modifiedTime: stats.mtime,
              isImage: this.isImageFile(entry.name),
            };
          }
          catch (error) {
            console.warn(`无法获取文件信息: ${entryPath}`, error);
            return null;
          }
        }),
      );

      // 过滤出有效的图片和目录
      return result
        .filter(item => item !== null)
        .filter(item => item.isDirectory || item.isImage)
        .sort((a, b) => {
          // 目录排在前面，然后按名称排序
          if (a.isDirectory && !b.isDirectory)
            return -1;
          if (!a.isDirectory && b.isDirectory)
            return 1;
          return a.name.localeCompare(b.name);
        });
    }
    catch (error) {
      console.error('列出图片目录内容失败:', error);
      throw new Error(`列出图片目录内容失败: ${error.message}`);
    }
  },

  // 读取图片文件
  async readImage(imagePath) {
    try {
      // 验证文件路径
      if (!imagePath || typeof imagePath !== 'string') {
        throw new Error('无效的图片路径');
      }

      // 检查文件是否存在
      try {
        await fs.access(imagePath);
      }
      catch {
        throw new Error(`图片文件不存在: ${imagePath}`);
      }

      // 验证是否为图片文件
      if (!this.isImageFile(imagePath)) {
        throw new Error('不是有效的图片文件');
      }

      // 读取图片文件
      const imageData = await fs.readFile(imagePath);
      return {
        data: imageData.toString('base64'),
        mimeType: this.getMimeType(imagePath),
        size: imageData.length,
      };
    }
    catch (error) {
      console.error('读取图片失败:', error);
      throw new Error(`读取图片失败: ${error.message}`);
    }
  },

  // 判断文件是否为图片
  isImageFile(filename) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
  },

  // 获取图片的 MIME 类型
  getMimeType(filename) {
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.bmp': 'image/bmp',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
    };
    return mimeTypes[ext] || 'application/octet-stream';
  },

  // 获取图片信息（不读取完整数据）
  async getImageInfo(imagePath) {
    try {
      const stats = await fs.stat(imagePath);
      return {
        name: path.basename(imagePath),
        path: imagePath,
        size: stats.size,
        modifiedTime: stats.mtime,
        mimeType: this.getMimeType(imagePath),
        isImage: this.isImageFile(imagePath),
      };
    }
    catch (error) {
      console.error('获取图片信息失败:', error);
      throw new Error(`获取图片信息失败: ${error.message}`);
    }
  },

  // 显示图片选择对话框
  async showImageSelectDialog(options = {}) {
    try {
      const result = await dialog.showOpenDialog({
        title: '选择图片文件',
        properties: ['openFile', 'multiSelections'],
        filters: [
          {
            name: '图片文件',
            extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico'],
          },
          {
            name: '所有文件',
            extensions: ['*'],
          },
        ],
        ...options,
      });

      return {
        canceled: result.canceled,
        filePaths: result.filePaths || [],
      };
    }
    catch (error) {
      console.error('显示图片选择对话框失败:', error);
      throw new Error(`显示图片选择对话框失败: ${error.message}`);
    }
  },

  // 批量读取图片信息
  async getMultipleImageInfo(imagePaths) {
    try {
      if (!Array.isArray(imagePaths)) {
        throw new TypeError('图片路径必须是数组');
      }

      const results = await Promise.allSettled(
        imagePaths.map(async (imagePath) => {
          const info = await this.getImageInfo(imagePath);
          return info;
        }),
      );

      return results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        }
        else {
          console.warn(`获取图片信息失败: ${imagePaths[index]}`, result.reason);
          return {
            path: imagePaths[index],
            error: result.reason.message,
            name: path.basename(imagePaths[index]),
          };
        }
      });
    }
    catch (error) {
      console.error('批量获取图片信息失败:', error);
      throw new Error(`批量获取图片信息失败: ${error.message}`);
    }
  },

  // 批量读取图片数据（限制数量以避免内存问题）
  async readMultipleImages(imagePaths, maxCount = 10) {
    try {
      if (!Array.isArray(imagePaths)) {
        throw new TypeError('图片路径必须是数组');
      }

      // 限制同时加载的图片数量
      const limitedPaths = imagePaths.slice(0, maxCount);

      const results = await Promise.allSettled(
        limitedPaths.map(async (imagePath) => {
          const imageData = await this.readImage(imagePath);
          return {
            path: imagePath,
            ...imageData,
          };
        }),
      );

      return results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        }
        else {
          console.warn(`读取图片失败: ${limitedPaths[index]}`, result.reason);
          return {
            path: limitedPaths[index],
            error: result.reason.message,
            name: path.basename(limitedPaths[index]),
          };
        }
      });
    }
    catch (error) {
      console.error('批量读取图片失败:', error);
      throw new Error(`批量读取图片失败: ${error.message}`);
    }
  },
};

// 导出服务名称，用于自动注册
export const serviceName = 'image';

// 默认导出服务对象
export default imageService;
