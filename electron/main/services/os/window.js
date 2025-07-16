import { ipcMain, shell } from 'electron';
import { ALLOW_MULTIPLE_INSTANCES } from '../../index';

export function setWindowListener(_win) {
  // 窗口大小调整
  ipcMain.on('win:setSize', (event, action) => {
    // const win = BrowserWindow.fromWebContents(event.sender);
    if (!_win) return;
    console.log('win:setSize', action);

    if (action === 'small') {
      _win.unmaximize();
      _win.setSize(300, 400);
      // _win.setMinimumSize(300, 400);
      _win.center();
    } else if (action === 'normal') {
      _win.unmaximize();
      _win.setSize(500, 300);
      // _win.setMinimumSize(500, 300);
      _win.center();
    } else if (action === 'large') {
      // _win.unmaximize(); // 最大化情况下窗口化尺寸设置不会改变
      _win.setSize(1024, 768);
      _win.center();
    } else {
      // 不限制
      _win.setMinimumSize(0, 0);
      _win.center();
    }

    // 取消窗口限制
    // see https://www.electronjs.org/docs/latest/api/browser-window#winsetminimumsizewidth-height
    // win.setMaximumSize(Number.MAX_VALUE, Number.MAX_VALUE)
    // win.setMinimumSize(0, 0)
  });

  // 监听窗口最大化/还原，并通知渲染进程
  function sendMaximizeState() {
    const isMaximized = _win.isMaximized();
    _win.webContents.send('win:maximize-state', { isMaximized });
  }

  _win.on('maximize', sendMaximizeState);
  _win.on('unmaximize', sendMaximizeState);

  // 获取窗口状态
  ipcMain.handle('win:get-state', () => {
    return {
      isMaximized: _win.isMaximized(),
      isFullScreen: _win.isFullScreen(),
      isMinimized: _win.isMinimized(),
    };
  });

  // 支持浏览器窗口打开
  _win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // 窗口关闭事件
  !ALLOW_MULTIPLE_INSTANCES &&
    _win.on('close', (e) => {
      if (!_win.isDestroyed()) {
        e.preventDefault();
        _win.hide();
      }
    });
}
