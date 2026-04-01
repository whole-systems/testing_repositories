import { Dispatcher } from '@/models/dispatchers';
import { adminApi } from '..';

export const dispatchersEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getDispatcher: builder.query<Dispatcher[], unknown>({
      query: () => ({
        url: `admin/dispatcher`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'DISPATCHER', id } as const)),
              { type: 'DISPATCHER', id: 'LIST' },
            ]
          : [{ type: 'DISPATCHER', id: 'LIST' }],
    }),
    getDispatcherById: builder.query<Dispatcher, string>({
      query: (id) => ({
        url: `admin/dispatcher/${id}`,
      }),
    }),
    updateDispatcher: builder.mutation({
      query: ({ id, data }) => ({
        url: `admin/dispatcher/${id}`,
        method: 'PUT',
        data,
      }),
    }),
      resetPassword: builder.mutation({
      query: ({ id }) => ({
        url: `admin/dispatcher/resetpassword/${id}`,
        method: 'GET',
      }),
    }),
    createDispatcher: builder.mutation({
      query: (data) => ({
        url: 'admin/dispatcher',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: () => [{ type: 'DISPATCHER' }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDispatcherQuery,
  useCreateDispatcherMutation,
  useGetDispatcherByIdQuery,
  useUpdateDispatcherMutation,
  useResetPasswordMutation
} = dispatchersEndPoints;
