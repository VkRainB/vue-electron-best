import { ipcMain } from 'electron';
import { scalingValue } from '../../utils/globalShortcut';

export function setZoomListener(_win) {
  ipcMain.on('zoom:changed', (event, zoomDirection) => {
    const level = _win.webContents.getZoomLevel();
    if (zoomDirection === 'in') {
      _win.webContents.setZoomLevel(level + scalingValue);
    } else if (zoomDirection === 'out') {
      _win.webContents.setZoomLevel(level - scalingValue);
    } else {
      _win.webContents.setZoomLevel(0);
    }
  });
}
