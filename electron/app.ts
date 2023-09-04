import { app, BrowserWindow } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-assembler';
import _ from 'lodash-es';

import { createWindow, initWindowInfo } from './window';
import { initSettings } from './settings';
import { initIpcMain } from './ipc';

export const createApp = () => {
  let win: BrowserWindow | null;

  app.on('window-all-closed', () => {
    win = null;
  });

  app.whenReady().then(() => {
    installExtension(VUEJS_DEVTOOLS);

    win = createWindow();

    initSettings();

    initWindowInfo(win);

    initIpcMain();
  });
};
