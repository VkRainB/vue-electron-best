import { app, globalShortcut } from 'electron';

// 缩放比例
export const scalingValue = 0.3;
export function setupFocusBasedShortcuts(_win) {
  // app获得焦点时注册快捷键
  app.on('browser-window-focus', () => {
    globalShortcut.register('Ctrl+Q', () => {
      app.quit();
    });
    globalShortcut.register('Ctrl+Shift+F5', () => {
      _win.webContents.send('app:reload');
    });
    globalShortcut.register('Ctrl+Shift+=', () => {
      const level = _win.webContents.getZoomLevel();
      _win.webContents.setZoomLevel(level + scalingValue);
    });
    globalShortcut.register('Ctrl+Shift+-', () => {
      const level = _win.webContents.getZoomLevel();
      _win.webContents.setZoomLevel(level - scalingValue);
    });
    globalShortcut.register('Ctrl+Shift+F12', () => {
      _win.webContents.openDevTools();
    });
    globalShortcut.register('Ctrl+Shift+/', () => {
      _win.webContents.setZoomLevel(0);
    });
  });

  // app失去焦点时取消所有快捷键
  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll();
  });
}
