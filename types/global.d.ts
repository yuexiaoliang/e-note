export {};

// 扩展 window
declare global {
  interface Window {
    electronAPI: any;
  }
}
