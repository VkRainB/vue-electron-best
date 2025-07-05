import type { ElectronAPI } from '@electron-toolkit/preload'

export {}
declare global {
  interface Window {
    readonly electron: ElectronAPI
    readonly api: {
      clipboard
      nativeImage
      pkg
    }
  }
}
