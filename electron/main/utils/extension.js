import { existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { is } from '@electron-toolkit/utils';
import { app, session } from 'electron';

/**
 * 自用Vue DevTools扩展安装
 * 使用的话需要在out目录下放好扩展文件，temp\extension\nhdogjmejiglipccpnnnanhbledajbpd\manifest.json
 */
export function installExtensionsFun() {
  if (is.dev) {
    const root = process.cwd();
    // out 目录
    const reactDevToolsPath = join(root, 'temp/extension/nhdogjmejiglipccpnnnanhbledajbpd');

    console.log('v tool', reactDevToolsPath);
    if (existsSync(reactDevToolsPath)) {
      app.whenReady().then(async () => {
        try {
          await session.defaultSession.loadExtension(reactDevToolsPath);
          console.log(' Vue DevTools successfully installed');
        } catch (err) {
          console.error(' Vue DevTools installation failed:', err);
        }
      });
    }
  }
}
