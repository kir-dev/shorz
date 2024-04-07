import axios from 'axios';
import { QueryClient } from 'react-query';

import { API_BASE_URL } from './environment.config';

export const initAxios = () => {
  axios.defaults.baseURL = API_BASE_URL;
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const queryClient = new QueryClient();
