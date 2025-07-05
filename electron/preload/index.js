import process from 'node:process';
import { electronAPI } from '@electron-toolkit/preload';
import { clipboard, contextBridge } from 'electron';
import { invoke } from '../main/services/channels';

const api = {
  invoke,
  clipboard,
};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
