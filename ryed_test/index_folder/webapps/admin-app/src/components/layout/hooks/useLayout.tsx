import {
  useLazyGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from '@/api/authEndpoints';
import { useLazyGetNotificationsQuery } from '@/api/notificationsEndpoints';
import { useAppSelector } from '@/hooks/useRedux';
import { userSelect } from '@/store/slices/userSlice/selectors';
import {
  LOCAL_STORAGE_FCM_KEY,
  LOCAL_STORAGE_ACCESS_KEY,
} from '@/utils/shared/consts.ts';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useLayout = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(userSelect);
  const [getUser] = useLazyGetCurrentUserQuery();
  const [updateUser] = useUpdateCurrentUserMutation();
  const [getNotifications] = useLazyGetNotificationsQuery();

  React.useEffect(() => {
    const fcm = localStorage.getItem(LOCAL_STORAGE_FCM_KEY);

    if (user && fcm && user?.fcmToken !== fcm) {
      updateUser({ fcmToken: fcm, id: user.id });
      console.log('FCM token updated');
    }
  }, [user, updateUser]);

  React.useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_KEY);
    if (!user && !token) {
      navigate('/auth/sign-in');
      return;
    }
    if (token && !user) {
      getUser('', true);
      return;
    }
  }, [user, navigate, getUser]);

  React.useEffect(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.data) {
          console.log('Message from ServiceWorker:', event.data);
          getNotifications();
        }
      });
    }
  }, [getNotifications]);
};
