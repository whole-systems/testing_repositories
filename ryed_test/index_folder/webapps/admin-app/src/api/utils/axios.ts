import { LOCAL_STORAGE_ACCESS_KEY } from '@/utils/shared/consts';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = process.env.VITE_REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token ?? ''}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_KEY);
      // localStorage.clear();
      window.location.href = '/auth/sign-in';
    }

    if (!error || !error?.response?.status) {
      toast.error(
        'Network Error: Services not available. Please try again later.'
      );
    }

    return Promise.reject(error);
  }
);
