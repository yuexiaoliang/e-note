export const openPath = async (path: string) => {
  return await window.electronAPI.shell.openPath(path);
};
