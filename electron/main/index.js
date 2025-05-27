import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { serviceRegistry, loadAllServices } from './services'
import { loadAllControllers } from './controllers'

// 加载所有服务和控制器
loadAllServices()
loadAllControllers()

// 通道定义
const CHANNELS = {
  REQUEST_SERVICE: 'request-service',
  INVOKE_SERVICE_METHOD: 'invoke-service-method'
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 设置服务请求处理
  setupServiceRequests()
}

// 设置服务请求处理
function setupServiceRequests() {
  // 使用 handle 而不是 on，这样可以返回结果
  ipcMain.handle(CHANNELS.INVOKE_SERVICE_METHOD, async (event, { serviceName, method, args }) => {
    try {
      const service = serviceRegistry.get(serviceName)

      if (!service) {
        throw new Error(`Service not found: ${serviceName}`)
      }

      if (typeof service[method] !== 'function') {
        throw new Error(`Method ${method} not found in service ${serviceName}`)
      }

      // 调用服务方法并返回结果
      return await service[method](...args)
    } catch (error) {
      // 将错误转换为可序列化的对象
      console.error('Service error:', error)
      throw {
        message: error.message,
        name: error.name,
        stack: error.stack
      }
    }
  })
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// console.log(import.meta.env)
