import path from 'node:path';
import { BrowserWindow } from 'electron';
import { getSettings, setSettings } from './settings';

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

export function createWindow() {
  const win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }

  // 开启开发者工具
  win.webContents.openDevTools();

  win.on('close', () => {
    if (!win) return;

    setSettings({ bounds: win.getBounds() });
  });

  return win;
}

// 初始化窗口信息
export function initWindowInfo(win: BrowserWindow) {
  if (!win) return;

  const settings = getSettings();

  if (settings.bounds) {
    // 设置窗口位置和大小
    win.setBounds(settings.bounds);
  }

  win.show();
  win.focus();
}
