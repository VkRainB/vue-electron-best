import fs from 'node:fs';
import { join } from 'node:path';
import axios from 'axios';
import { app, ipcMain } from 'electron';
import { getUpdataCacheDir, startInstaller } from '../../utils/common';

/**
 * @description 设置手动更新监听
 * @param {Electron.BaseWindow} _win
 */
export function setManuaUpdateListener(_win) {
  let cancelDownload = false; // 是否取消下载
  let currentDownloadStream = null;
  let currentWriter = null;
  // 取消手动下载
  ipcMain.handle('cancel-handle', () => {
    cancelDownload = true;
    if (currentDownloadStream) {
      currentDownloadStream.destroy();
      currentDownloadStream.removeAllListeners();
      currentDownloadStream = null;
    }
    if (currentWriter) {
      currentWriter.destroy();
      currentWriter.removeAllListeners();
      currentWriter = null;
    }
  });

  // 手动安装下载
  ipcMain.handle('download-and-install', async (event, fileUrl) => {
    const temp = getUpdataCacheDir();
    const savePath = join(temp, 'app-name.exe');
    cancelDownload = false;
    if (currentDownloadStream) {
      currentDownloadStream.destroy();
      currentDownloadStream.removeAllListeners();
      currentDownloadStream = null;
    }
    if (currentWriter) {
      currentWriter.destroy();
      currentWriter.removeAllListeners();
      currentWriter = null;
    }
    try {
      const version = app.getVersion();
      const fileUrl = `http://example/update.com/app-name ${version}.exe`;
      const response = await axios({ method: 'get', url: fileUrl, responseType: 'stream' });
      // 获取文件总大小
      const exeSize = response.headers['content-length'];
      let lastUpdateTime = 0;
      let downloadProgress = 0;
      let downloadedSize = 0;
      currentDownloadStream = response.data;
      currentWriter = fs.createWriteStream(savePath);

      response.data.on('data', (chunk) => {
        if (cancelDownload) {
          response.data.destroy();
          currentWriter.destroy();
          if (fs.existsSync(savePath)) fs.unlinkSync(savePath);
          return;
        }
        downloadedSize += chunk.length;
        const progress = (downloadedSize / exeSize) * 100;
        // 获取当前时间戳
        const currentTime = Date.now();
        // 每隔一秒发送一次更新
        if (currentTime - lastUpdateTime >= 1000) {
          lastUpdateTime = currentTime;
          downloadProgress = Math.floor(progress);
          _win.webContents.send('handle-download', { state: 3, msg: downloadProgress });
        }
      });
      response.data.pipe(currentWriter);

      await new Promise((resolve, reject) => {
        currentWriter.on('finish', () => {
          if (cancelDownload) {
            reject(new Error('下载已取消'));
          } else {
            resolve();
          }
        });
        currentWriter.on('error', reject);
      });

      if (cancelDownload) return; // 如果已取消，不再执行后续

      _win.webContents.send('handle-download', { state: 4 });

      startInstaller(savePath);
      return true;
    } catch (error) {
      if (fs.existsSync(savePath)) fs.unlinkSync(savePath);
      _win.webContents.send('handle-download', { state: 5, msg: '下载文件时发生错误' });
      throw new Error(`下载文件时发生错误: ${error.message}`);
    } finally {
      // 清理引用，防止事件叠加
      currentDownloadStream = null;
      currentWriter = null;
    }
  });
}
