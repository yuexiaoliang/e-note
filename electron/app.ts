import { app, BrowserWindow } from 'electron';
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
    win = createWindow();

    initSettings();

    initWindowInfo(win);

    initIpcMain();
  });
};
