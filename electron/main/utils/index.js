import { ipcMain, BrowserWindow } from 'electron';

import logger from './logger.js';

export function setChannelListener(_win) {
  // 获取日志
  ipcMain.handle('get-log-config', () => {
    return logger.getConfig();
  });

  // 窗口大小调整
  ipcMain.on('win:setSize', (event, action) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;

    if (action === 'small') {
      win.setSize(300, 400);
      win.setMinimumSize(300, 400);
      win.center();
    } else if (action === 'normal') {
      win.setSize(1024, 768);
      // win.setMinimumSize(0, 0);
      win.center();
    } else {
      // 不限制
      win.setMinimumSize(0, 0);
      win.center();
    }
  });
}
