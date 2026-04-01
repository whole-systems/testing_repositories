import { Service } from '@/models/journey-services';
import { adminApi } from '..';

export const journeyServicesEndpoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<
      Service[],
      { language?: string; supportedCountry?: string } | void
    >({
      query: (params) => ({
        url: `journey-services`,
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'SERVICES' as const, id })),
              { type: 'SERVICES', id: 'LIST' },
            ]
          : [{ type: 'SERVICES', id: 'LIST' }],
    }),
    createService: builder.mutation<unknown, unknown>({
      query: (data) => ({
        url: `journey-services`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'SERVICES', id: 'LIST' }],
    }),
    updateService: builder.mutation<unknown, { id: string; data: unknown }>({
      query: ({ id, data }) => ({
        url: `journey-services/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'SERVICES', id },
        { type: 'SERVICES', id: 'LIST' },
      ],
    }),
    deleteService: builder.mutation<unknown, { id: string }>({
      query: ({ id }) => ({
        url: `journey-services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'SERVICES', id },
        { type: 'SERVICES', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetServicesQuery,
  useLazyGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = journeyServicesEndpoints;
