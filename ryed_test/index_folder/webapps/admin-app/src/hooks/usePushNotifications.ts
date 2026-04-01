import { useLazyGetNotificationsQuery } from '@/api/notificationsEndpoints';
import { firebaseMessaging } from '@/config/firebase';
import { LOCAL_STORAGE_FCM_KEY } from '@/utils/shared/consts';
import { getToken, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { env } from '@/config/env';
import { toast } from 'sonner';

export const useNotificationHandler = () => {
  const [getNotifications] = useLazyGetNotificationsQuery();

  useEffect(() => {
    onMessage(firebaseMessaging, (payload) => {
      console.log('Message received. ', payload);

      if (payload.data?.type === 'SyncNotifications') {
        toast.dismiss();
        getNotifications();
      } else {
        toast('New Message Received', {
          description: payload.notification?.title,
          action: {
            label: 'Close',
            onClick: () => console.log('close'),
          },
        });
        getNotifications();
      }
    });
  }, [getNotifications]);

  return null;
};

export const requestNotificationPermission = async () => {
  console.log('Requesting permission...');
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      try {
        const currentToken = await getToken(firebaseMessaging, {
          vapidKey: env.firebaseVapidKey,
        });
        if (currentToken) {
          console.log('FCM token:', currentToken);
          localStorage.setItem(LOCAL_STORAGE_FCM_KEY, currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  } catch (err) {
    console.log('An error occurred while requesting permission. ', err);
  }
};
