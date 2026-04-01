import {
  FilterDrivers,
  TCreateDriverDTO,
  TDriver,
  TEditDriverDTO,
} from '@/models/driver';
import { adminApi } from '..';

export const driversEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getDrivers: builder.query<TDriver[], FilterDrivers | void>({
      query: (params) => ({ url: 'admin/drivers', params: { ...params } }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'DRIVER', id } as const)),
              { type: 'DRIVER', id: 'LIST' },
            ]
          : [{ type: 'DRIVER', id: 'LIST' }],
    }),
    getDriverById: builder.query<TDriver, string>({
      query: (id) => ({ url: `admin/drivers/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'DRIVER', id }],
    }),
    createDriver: builder.mutation<unknown, TCreateDriverDTO>({
      query: (data) => ({
        url: 'admin/drivers/invite',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'DRIVER', id: 'LIST' }],
    }),
    editDriver: builder.mutation<unknown, TEditDriverDTO>({
      query: (data) => {
        const { id, ...driverData } = data;
        return {
          url: `admin/drivers/${id}`,
          method: 'PUT',
          data: driverData,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'DRIVER', id }],
    }),
    deleteDriver: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `admin/drivers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'DRIVER', id: 'LIST' }],
    }),
      generateDriverDeepLink: builder.mutation<unknown, { driverId: string }>({
      query: ({driverId}) => ({
        url: `admin/drivers/${driverId}/deeplink`,
        method: 'GET',
      })
    }),
    assignVehicle: builder.mutation<
      unknown,
      { vehicleId: string; driverId: string }
    >({
      query: ({ vehicleId, driverId }) => ({
        url: `admin/drivers/${driverId}/vehicles/assign`,
        method: 'POST',
        data: { vehicleId },
      }),
      invalidatesTags: (_result, _error, { driverId }) => [
        { type: 'DRIVER', driverId },
      ],
    }),
    unAssignVehicle: builder.mutation<
      unknown,
      { vehicleId: string; driverId: string }
    >({
      query: ({ vehicleId, driverId }) => ({
        url: `admin/drivers/${driverId}/vehicles/unassign`,
        method: 'POST',
        data: { vehicleId },
      }),
      invalidatesTags: (_result, _error, { driverId }) => [
        { type: 'DRIVER', driverId },
      ],
    }),
    approveDriver: builder.mutation<unknown, { driverId: string }>({
      query: ({ driverId }) => ({
        url: `admin/drivers/${driverId}/approve`,
        method: 'PUT',
        data: {},
      }),
      invalidatesTags: (_result, _error, { driverId }) => [
        { type: 'DRIVER', driverId },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDriversQuery,
  useCreateDriverMutation,
  useGetDriverByIdQuery,
  useDeleteDriverMutation,
  useEditDriverMutation,
  useApproveDriverMutation,
  useAssignVehicleMutation,
  useUnAssignVehicleMutation,
  useGenerateDriverDeepLinkMutation
} = driversEndPoints;
