import { is } from '@electron-toolkit/utils';
import { ipcMain } from 'electron';
import { autoUpdater, CancellationToken } from 'electron-updater';

/**
 * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
 */
let updateType = 1; // 更新类型 1 立即更新 2 手动更新 3 稍后更新
let progressTimer;
// 负责向渲染进程发送信息
function Message(mainWindow, type, data) {
  const senddata = {
    state: type,
    msg: data || '',
    type: updateType,
  };
  mainWindow.webContents.send('UpdateMsg', senddata);
}

// 配置行为
autoUpdater.autoInstallOnAppQuit = false; // 下载完成后手动安装,true后confirm-update就不会执行
autoUpdater.autoDownload = false; // 渲染进程触发主进程事件来实现下载
let cancellationToken = null;

// 更新应用的方法
export default (mainWindow) => {
  // 设置版本更新地址，即将打包后的latest.yml文件和exe文件同时放在
  // http://xxxx/test/version/对应的服务器目录下,该地址和package.json的publish中的url保持一致

  autoUpdater.setFeedURL({
    provider: 'generic',
    url: 'http://example/update.com',
    checkUpdateInterval: 1000 * 2,
  });

  if (is.dev) {
    autoUpdater.forceDevUpdateConfig = true;
    // autoUpdater.updateConfigPath = join(process.cwd(), 'dev-app-update.yml');
  }

  // 当更新发生错误的时候触发。
  autoUpdater.on('error', (err) => {
    if (err.message.includes('sha512 checksum mismatch')) {
      Message(mainWindow, -1, 'sha512校验失败');
    }
    Message(mainWindow, -1, err);
  });

  // 当开始检查更新的时候触发
  autoUpdater.on('checking-for-update', (event, arg) => {
    Message(mainWindow, 0);
  });

  // 发现可更新数据时
  autoUpdater.on('update-available', (message) => {
    const { files, path: exeName } = message;
    // console.log(JSON.stringify(message));
    console.log(`updateFileSize-------${files[0].size} ------`);
    Message(mainWindow, 1, message);
  });

  // 没有可更新数据时
  autoUpdater.on('update-not-available', (event, arg) => {
    Message(mainWindow, 2);
  });

  // 下载监听
  autoUpdater.on('download-progress', (progressObj) => {
    clearInterval(progressTimer);
    Message(mainWindow, 3, progressObj);
  });

  // 下载完成
  autoUpdater.on('update-downloaded', async () => {
    Message(mainWindow, 4);
  });

  // 执行更新检查
  ipcMain.handle('check-update', (event, data) => {
    updateType = data;
    cancellationToken = new CancellationToken();
    autoUpdater.checkForUpdates().catch((err) => {
      Message(mainWindow, -1, err);
    });
  });

  // 退出并安装
  ipcMain.handle('confirm-update', () => {
    mainWindow.webContents.send('clearIndexDB');
    // 等待一小段时间确保清理消息被处理
    // 默认autoUpdater.quitAndInstall(false, false); // 非静默安装，安装后不自动重启
    // autoUpdater.quitAndInstall(true, true); // 静默安装，安装后自动重启
    autoUpdater.quitAndInstall();
  });

  // 取消下载
  ipcMain.handle('cancel-downloadUpdate', () => {
    if (cancellationToken) {
      cancellationToken.cancel();
    }
  });

  // 手动下载更新文件
  ipcMain.handle('confirm-downloadUpdate', () => {
    autoUpdater.downloadUpdate(cancellationToken);
  });

  // 稍后更新 - 点击更新
  ipcMain.handle('later-update-now', () => {
    Message(mainWindow, 10, '稍后更新-开始执行更新...');
    autoUpdater.downloadUpdate(cancellationToken);
  });
};
