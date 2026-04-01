import { TravelAgenciesGet, TravelAgency } from '@/models/travel-agencies';
import { adminApi } from '..';

export const travelAgenciesEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getTravelAgencies: builder.query<TravelAgenciesGet, unknown>({
      query: () => ({
        url: `admin/travel-agency`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.travelAgencies.map(
                ({ id }) => ({ type: 'TRAVEL_AGENCIES', id } as const)
              ),
              { type: 'TRAVEL_AGENCIES', id: 'LIST' },
            ]
          : [{ type: 'TRAVEL_AGENCIES', id: 'LIST' }],
    }),
    getTravelAgency: builder.query<TravelAgency, string>({
      query: (id: string) => ({
        url: `admin/travel-agency/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'TRAVEL_AGENCIES', id: 'LIST' },
              { type: 'TRAVEL_AGENCIES', id: result.id },
            ]
          : [{ type: 'TRAVEL_AGENCIES', id: 'LIST' }],
    }),
    createTravelAgency: builder.mutation({
      query: (data) => ({
        url: 'admin/travel-agency',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: () => [{ type: 'TRAVEL_AGENCIES' }],
    }),
    updateTravelAgency: builder.mutation({
      query: ({ data, id }) => ({
        url: `admin/travel-agency/${id}`,
        method: 'PUT',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: 'TRAVEL_AGENCIES', id: 'LIST' },
        { type: 'TRAVEL_AGENCIES', id },
      ],
    }),
    deleteTravelAgency: builder.mutation({
      query: (id) => ({
        url: `admin/travel-agency/${id}/BLOCKED`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'TRAVEL_AGENCIES' }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTravelAgenciesQuery,
  useCreateTravelAgencyMutation,
  useGetTravelAgencyQuery,
  useUpdateTravelAgencyMutation,
  useDeleteTravelAgencyMutation,
} = travelAgenciesEndPoints;
