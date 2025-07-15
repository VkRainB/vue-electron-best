import { join } from 'node:path';
import process from 'node:process';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow } from 'electron';
import icon from '../../resources/icon.png?asset';
import { setServerListener } from './services';
import { setUtilsListener } from './utils';
import log from './utils/logger.js';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    center: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      spellcheck: false, // 取消拼写检查
      webSecurity: false, // 取消跨域检查
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // 区分开发环境
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  log.info('mainWindow', '启动了');

  // 工具函数监听
  setUtilsListener(mainWindow);

  // 加载服务
  setServerListener(mainWindow);
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron');

  optimizer.registerFramelessWindowIpc();

  app.on('browser-window-created', (_, window) => {
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口自动退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
