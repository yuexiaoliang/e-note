export const readFile = async (path: string) => {
  return await window.electronAPI.fs.readFile(path);
};
