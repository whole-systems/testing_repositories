import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios';

export interface AxiosBaseQueryError extends SerializedError {
  status?: number;
  data?: {
    message?: string;
  };
}

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    AxiosBaseQueryError
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      const serializedError = {
        error: {
          name: err?.name,
          message: err?.message,
          stack: err?.stack,
          status: err?.response?.status,
          data: err?.response?.data || { message: err.message },
        } as AxiosBaseQueryError,
      };

      return serializedError;
    }
  };
