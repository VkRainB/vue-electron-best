import { ipcMain } from 'electron';

import update from './checkUpdate.js';
import { installExtensionsFun } from './extension.js';
import logger from './logger.js';

// invoke / handle
//  send / on
export function setUtilsListener(_win) {
  // 安装插件
  installExtensionsFun();

  // 检测软件更新
  update(_win);

  // 获取日志
  ipcMain.handle('get-log-config', () => {
    return logger.getConfig();
  });
}
