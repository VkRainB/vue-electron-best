import { ipcMain } from 'electron';
import logger from './logger.js';

export function setChannelListener(_win) {
  ipcMain.handle('get-log-config', () => {
    return logger.getConfig();
  });
  // 添加更多
}
