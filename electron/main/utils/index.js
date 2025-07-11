import { ipcMain, BrowserWindow } from 'electron';

import logger from './logger.js';

// invoke / handle
//  send / on
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

    // 取消窗口限制
    // see https://www.electronjs.org/docs/latest/api/browser-window#winsetminimumsizewidth-height
    // win.setMaximumSize(Number.MAX_VALUE, Number.MAX_VALUE)
    // win.setMinimumSize(0, 0)
  });

  // 监听窗口最大化/还原，并通知渲染进程
  function sendMaximizeState() {
    console.log('sendMaximizeState');
    const isMaximized = _win.isMaximized();
    console.log('isMaximized', isMaximized)
    _win.webContents.send('win:maximize-state', { isMaximized });
  }

  _win.on('maximize', sendMaximizeState);
  _win.on('unmaximize', sendMaximizeState);
}
