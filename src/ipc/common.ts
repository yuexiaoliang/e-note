export const getSettingsPath = async () => {
  return await window.electronAPI.getSettingsPath();
};

export const getSettings = async () => {
  return await window.electronAPI.getSettings();
};
