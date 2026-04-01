import { IConfig } from '@/models/config';
import { IDefaultCurrencies } from '@/models/config';
import { adminApi } from '..';
export const configEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getDefaultCurrencies: builder.query<IDefaultCurrencies, unknown>({
      query: () => ({ url: '/config/global-admin' }),
      transformResponse: (response: IConfig) => response.defaultCurrencies,
    }),
  }),
  overrideExisting: true,
});

export const { useGetDefaultCurrenciesQuery } = configEndPoints;
