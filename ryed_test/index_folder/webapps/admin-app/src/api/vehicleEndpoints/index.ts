import {
  AddImageDTO,
  CreateVehicleDTO,
  EditVehicleDTO,
  Vehicle,
} from '@/models/vehicle/vehicle';
import { adminApi } from '..';
// import { axiosInstance } from '../utils/axios';

export const vehicleEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicle: builder.query<Vehicle[], unknown>({
      query: () => ({ url: 'admin/vehicle' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'VEHICLE', id } as const)),
              { type: 'VEHICLE', id: 'LIST' },
            ]
          : [{ type: 'VEHICLE', id: 'LIST' }],
    }),
    getVehicleById: builder.query<Vehicle, string>({
      query: (id) => ({ url: `admin/vehicle/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'VEHICLE', id }],
    }),
    getVehicleByDispatcherId: builder.query<Vehicle[], string>({
      query: (dispatcherId) => ({
        url: `admin/vehicle`,
        params: {
          dispatcherId,
        },
        method: 'GET',
      }),
      providesTags: (_result, _error, dispatcherId) => [
        { type: 'VEHICLE', id: dispatcherId },
      ],
    }),
    createVehicle: builder.mutation<unknown, CreateVehicleDTO>({
      query: (data) => ({
        url: 'admin/vehicle',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'VEHICLE', id: 'LIST' }],
    }),
    editVehicle: builder.mutation<unknown, EditVehicleDTO>({
      query: ({ id, ...data }) => ({
        url: `admin/vehicle/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'VEHICLE', id }],
    }),
    deleteVehicle: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `admin/vehicle/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'VEHICLE', id: 'LIST' }],
    }),
    addVehicleImage: builder.mutation<unknown, AddImageDTO>({
      query: ({ id, type, formData }) => ({
        url: `admin/vehicle/${id}/gallery/${type}`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'VEHICLE', id }],
      // queryFn: async ({ id, type, formData }) => {
      //   const data = await axiosInstance.post<
      //     unknown,
      //     { profilePictureURL: string }
      //   >(`/vehicle/${id}/gallery/${type}`, formData);

      //   return { data: data };
      // },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllVehicleQuery,
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useDeleteVehicleMutation,
  useEditVehicleMutation,
  useAddVehicleImageMutation,
  useGetVehicleByDispatcherIdQuery,
} = vehicleEndPoints;
