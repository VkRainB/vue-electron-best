import { join } from 'node:path';
import { app, BrowserWindow } from 'electron';
import log from './logger.js';

/**
 * @description 多开模式
 */
export function setupMultipleInstancesMode() {
  // 多开模式：为每个实例创建独立的用户数据目录
  const instanceId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const userDataPath = join(app.getPath('userData'), `instance-${instanceId}`);
  app.setPath('userData', userDataPath);

  log.info('MultipleInstances', `实例ID: ${instanceId}, 数据目录: ${userDataPath}`);
}

/**
 * 单实例模式
 */
export function setupSingleInstanceMode() {
  // 单例模式：检查是否已有实例运行
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    log.info('SingleInstance', '已有实例运行，退出当前实例');
    app.quit();
    return false;
  }

  // 当尝试启动第二个实例时的处理
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    log.info('SingleInstance', '检测到第二个实例启动，聚焦主窗口');
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
      mainWindow.show();
    }
  });

  return true;
}
