import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './utils/axiosBaseQuery';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  tagTypes: [
    'VEHICLE',
    'DRIVER',
    'JOURNEY',
    'CAR_MODELS',
    'USER',
    'NOTIFICATION',
    'DISPATCHER',
    'TRAVEL_AGENCIES',
    'TRAVEL_AGENTS',
    'REGIONS',
    'SERVICES',
    'COUNTRY_PRICING',
    'GET_PRICE_RULES',
    'GET_PRICE_RULE',
  ],
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
