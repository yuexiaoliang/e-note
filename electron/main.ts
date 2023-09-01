import path from 'node:path';
import fs from 'node:fs';
import { app, BrowserWindow, ipcMain, shell } from 'electron';

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
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(() => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  initializeSettingsFile(settingsPath);
  createWindow();

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
    return settingsPath;
  });

  ipcMain.handle('getSettings', () => {
    return fs.readFileSync(settingsPath, 'utf-8');
  });
});

// 初始化设置文件
function initializeSettingsFile(path: string) {
  if (!fs.existsSync(path)) {
    const settings = {
      settingsPath: path
    };
    fs.writeFileSync(path, JSON.stringify(settings));
  }
}
