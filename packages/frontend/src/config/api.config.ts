import axios from 'axios';
import { API_BASE_URL } from './environment.config';

export const initAxios = () => {
  axios.defaults.baseURL = API_BASE_URL;
};
