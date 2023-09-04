import path from 'node:path';
import { app } from 'electron';

export const initEnv = () => {
  process.env.DIST = path.join(__dirname, '../dist');
  process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');
};
