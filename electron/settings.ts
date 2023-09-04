import path from 'node:path';
import fs from 'node:fs';
import { app } from 'electron';
import { merge } from 'lodash-es';

// 获取设置文件路径
export function getSettingsPath() {
  return path.join(app.getPath('userData'), 'Settings');
}

// 获取设置内容
export function getSettings() {
  const settingsPath = getSettingsPath();

  return JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
}

// 设置
export function setSettings(settings: any) {
  const settingsPath = getSettingsPath();

  const _old = getSettings();
  const _new = merge(_old, settings);

  try {
    fs.writeFileSync(settingsPath, JSON.stringify(_new));
  } catch (error) {}
}

// 初始化设置文件
export function initSettings() {
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
