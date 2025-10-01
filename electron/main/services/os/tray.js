import { app, Menu, Tray } from 'electron';
import icon from '/resources/icon.png?asset';

let traty;
export function creatTray(_win) {
  if (!traty) {
    traty = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '刷新软件',
        click: () => {
          _win.webContents.send('tray:refresh');
        },
      },
      {
        label: '关闭软件',
        click: () => {
          // _win.webContents.send();
          app.quit();
        },
      },
    ]);
    traty.setToolTip('app-name');
    traty.setContextMenu(contextMenu);
    traty.on('click', () => {
      _win.show();
      _win.focus();
    });
  }
  return traty;
}
