import { join } from 'node:path';
import process from 'node:process';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow } from 'electron';
import icon from '../../resources/icon.png?asset';
import { setServerListener } from './services';
import { setUtilsListener } from './utils';
import { clearExePackage } from './utils/common.js';
import { setupMultipleInstancesMode, setupSingleInstanceMode } from './utils/launchMode.js';
import log from './utils/logger.js';

// 控制应用运行模式的变量
// true: 允许多开模式 false: 单例模式
export const ALLOW_MULTIPLE_INSTANCES = false;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    center: true,
    icon,
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
    mainWindow.focus();
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

  return mainWindow;
}

(function initializeApp() {
  // 根据配置决定运行模式
  if (ALLOW_MULTIPLE_INSTANCES) {
    setupMultipleInstancesMode();
    log.info('AppMode', '多开模式已启用');
  } else {
    const canStart = setupSingleInstanceMode();
    if (!canStart) {
      return; // 单例模式下，如果已有实例则退出
    }
    log.info('AppMode', '单例模式已启用');
  }

  // 应用就绪后的初始化
  app.whenReady().then(async () => {
    electronApp.setAppUserModelId('com.electron');

    optimizer.registerFramelessWindowIpc();

    app.on('browser-window-created', (_, window) => {
      // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
      optimizer.watchWindowShortcuts(window);
    });

    createWindow();

    clearExePackage();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
})();
