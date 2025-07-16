import update from './os/checkUpdate';
import { creatTray } from './os/tray';
import { setWebRequestListener } from './os/webRequest';
import { setWindowListener } from './os/window';
import { setZoomListener } from './os/zoom';

export function setServerListener(_win) {
  // 创建托盘
  creatTray(_win);

  // 检测软件更新
  update(_win);

  // 窗口监听
  setWindowListener(_win);

  // 缩放调整
  setZoomListener(_win);

  // 监听离线
  setWebRequestListener(_win);
}

export * from './os/tray';
export * from './os/webRequest';
export * from './os/window';
