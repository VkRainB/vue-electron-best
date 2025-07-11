import { join } from 'node:path';
import process from 'node:process';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, shell } from 'electron';
import icon from '../../resources/icon.png?asset';
import { loadAllServices, setupServiceRequests } from './services';
import { setChannelListener } from './utils/index.js';
import log from './utils/logger.js';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: false,
    autoHideMenuBar: true,
    center: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // 区分开发环境
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  // 设置服务请求处理
  setupServiceRequests();

  log.info('mainWindow', '启动了');
  // 设置通道监听
  setChannelListener(mainWindow);
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron');

  // 加载所有服务
  await loadAllServices();

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
