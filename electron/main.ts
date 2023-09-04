import path from 'node:path';
import fs from 'node:fs';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import _ from 'lodash-es';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 开启开发者工具
  win.webContents.openDevTools();

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    if (!win) return;

    win.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }

  win.on('close', () => {
    if (!win) return;

    setSettings({ contentBounds: win.getContentBounds() });
  });
}

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(() => {
  createWindow();

  initSettings();

  initWindowInfo();

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
});

// 初始化窗口信息
function initWindowInfo() {
  if (!win) return;

  const settings = getSettings();

  if (settings.contentBounds) {
    // 设置窗口位置和大小
    win.setContentBounds(settings.contentBounds);
  }

  win.show();
  win.focus();
}

// 获取设置文件路径
function getSettingsPath() {
  return path.join(app.getPath('userData'), 'Settings');
}

// 获取设置内容
function getSettings() {
  const settingsPath = getSettingsPath();

  return JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
}

// 设置
function setSettings(settings: any) {
  const settingsPath = getSettingsPath();

  const _old = getSettings();
  const _new = _.merge(_old, settings);

  try {
    fs.writeFileSync(settingsPath, JSON.stringify(_new));
  } catch (error) {}
}

// 初始化设置文件
function initSettings() {
  const path = getSettingsPath();

  if (!fs.existsSync(path)) {
    fs.writeFileSync(
      path,
      JSON.stringify({
        settingsPath: path
      })
    );
  }
}
