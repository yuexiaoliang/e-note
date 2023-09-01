export const getPath = async (name: string) => {
  return await window.electronAPI.app.getPath(name);
};
