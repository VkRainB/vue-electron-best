import { app, ipcMain } from 'electron';
import { installExtensionsFun } from './extension.js';
import { setupFocusBasedShortcuts } from './globalShortcut.js';
import logger from './logger.js';

// invoke / handle
//  send / on
export function setUtilsListener(_win) {
  // 安装调试插件
  installExtensionsFun();

  // 设置快捷键
  setupFocusBasedShortcuts(_win);

  // 获取日志
  ipcMain.handle('get-log-config', () => {
    return logger.getConfig();
  });

  ipcMain.on('app:quit', () => {
    app.quit();
  });

  ipcMain.on('app:exit', () => {
    app.exit();
  });
}
