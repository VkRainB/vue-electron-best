import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { serviceRegistry, loadAllServices } from './services'

// 通道定义
const CHANNELS = {
  INVOKE_SERVICE_METHOD: 'invoke-service-method'
}

function createWindow() {
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

  // 区分开发环境
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
  // 使用 handle 处理服务调用
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

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  // 加载所有服务
  await loadAllServices()

  app.on('browser-window-created', (_, window) => {
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 关闭所有窗口自动退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
