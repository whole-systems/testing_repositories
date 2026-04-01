import { adminApi } from '..';

export const exchangeEndpoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getExchangeRate: builder.query<
      { rate: number; from: string; to: string },
      {
        from: string;
        to: string;
      }
    >({
      query: (params: { from: string; to: string }) => ({
        url: '/exchange/rate',
        params,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetExchangeRateQuery } = exchangeEndpoints;
