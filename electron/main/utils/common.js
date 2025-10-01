//  公共函数

import { exec } from 'node:child_process';
import { existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { app } from 'electron';
import { autoUpdater } from 'electron-updater';

/**
 * 目录路径: C:\Users\Administrator\AppData\Local\[应用名-updater]
 * @description 获取更新包缓存目录
 */
export function getUpdataCacheDir() {
  const { app } = autoUpdater;
  const updaterDirName = `${app.name}-updater`;
  const localAppDataPath = join(app.baseCachePath, updaterDirName);

  // 创建目录
  if (!existsSync(localAppDataPath)) mkdirSync(localAppDataPath, { recursive: true });
  return localAppDataPath;
}
/**
 * @description 启动安装程序
 * @param {string} installerPath
 */
export function startInstaller(installerPath) {
  try {
    const normalizedPath = normalize(installerPath);
    const command = `start "" "${normalizedPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('启动安装程序失败:', error);
        console.error('stderr:', stderr);
      }
    });
  } finally {
    app.quit();
  }
}

/**
 * @description 清理安装程序
 */
export function clearExePackage() {
  const temp = getUpdataCacheDir();
  const setupPath = join(temp, 'app-name.exe');
  if (existsSync(setupPath)) {
    try {
      unlinkSync(setupPath);
    } catch (err) {
      console.error('删除安装包失败:', err);
    }
  }
}
