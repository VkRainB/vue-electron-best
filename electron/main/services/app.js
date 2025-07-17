import process from 'node:process';
import { app, globalShortcut, ipcMain } from 'electron';

export function setAppListener(_traty) {
  // 关闭所有窗口自动退出
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('will-quit', () => {
    console.log('will-quit');
    globalShortcut.unregisterAll();
  });

  ipcMain.on('app:quit', () => {
    app.quit();
  });

  ipcMain.on('app:exit', () => {
    // app exit不会清理 如果图标残留
    // 直到鼠标悬停在上面时才消失 ，这是因为系统会在鼠标交互时检查应用进程是否仍在运行。
    globalShortcut.unregisterAll();
    _traty && _traty.destroy();
    app.exit();
  });
}
