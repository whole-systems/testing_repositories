import { adminApi } from '..';
import { Notification } from '@/models/notification';

export const notificationsEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => ({ method: 'GET', url: '/notification/admin' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'NOTIFICATION' as const,
                id,
              })),
              { type: 'NOTIFICATION', id: 'LIST' },
            ]
          : [{ type: 'NOTIFICATION', id: 'LIST' }],
    }),
    readNotifications: builder.mutation<unknown, string[]>({
      query: (data) => ({
        method: 'PUT',
        url: `/notification/admin/set-read`,
        data: { notificationIds: data },
      }),
      invalidatesTags: [{ type: 'NOTIFICATION', id: 'LIST' }],
    }),
    archivedNotifications: builder.mutation<unknown, string[]>({
      query: (data) => ({
        method: 'PUT',
        url: `/notification/admin/set-archived`,
        data: { notificationIds: data },
      }),
      invalidatesTags: [{ type: 'NOTIFICATION', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetNotificationsQuery,
  useReadNotificationsMutation,
  useArchivedNotificationsMutation,
  useGetNotificationsQuery,
} = notificationsEndPoints;
