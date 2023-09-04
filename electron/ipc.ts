import fs from 'node:fs';
import { app, ipcMain, shell } from 'electron';
import _ from 'lodash-es';

import { getSettings, getSettingsPath } from './settings';

export const initIpcMain = () => {
  ipcMain.handle('app:getPath', (_, name) => {
    return app.getPath(name);
  });

  ipcMain.handle('shell:openPath', (_, path) => {
    return shell.openPath(path);
  });

  ipcMain.handle('fs:readFile', (_, path) => {
    return fs.readFileSync(path, 'utf-8');
  });

  ipcMain.handle('getSettingsPath', () => {
    return getSettingsPath();
  });

  ipcMain.handle('getSettings', () => {
    return getSettings();
  });
};
