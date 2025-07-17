import process from 'node:process';
import { electronAPI } from '@electron-toolkit/preload';
import { clipboard, contextBridge } from 'electron';

const api = {
  clipboard,
};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('ipc', electronAPI.ipcRenderer);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.ipc = electronAPI.ipcRenderer;
  window.api = api;
}
