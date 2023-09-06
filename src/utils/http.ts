import axios from 'axios';
import { getSettings } from '@/ipc/common';

const http = axios.create({
  baseURL: 'https://api.openai.com/'
});

http.interceptors.request.use(
  async (config) => {
    const settings = await getSettings();
    config.headers['Authorization'] = `Bearer ${settings['openai-api-key']}`;

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default http;
