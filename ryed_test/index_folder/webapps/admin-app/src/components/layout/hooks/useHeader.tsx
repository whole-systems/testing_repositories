import { useAppSelector } from '@/hooks/useRedux';
import { userSelect } from '@/store/slices/userSlice/selectors';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetNotificationsQuery } from "@/api/notificationsEndpoints";

export const useHeader = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(userSelect);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [getNotifications, { data: notifications }] = useLazyGetNotificationsQuery();

  const [notifyCount, setNotifyCount] = useState(0);

  const toggleDrawer = React.useCallback((newState: boolean) => {
    setIsDrawerOpen(newState);
    return;
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    if (notifications) {
      setNotifyCount(notifications.filter((item) => !item.isRead).length);
    }
  }, [notifications, setNotifyCount]);

  const goToPage = React.useCallback(
    (path: string) => {
      setIsDrawerOpen(false);
      navigate(path);
    },
    [navigate]
  );
  const logOut = async () => {
    // await signOut(auth);
    // setModalOpen(false);
  };
  return {
    handlers: { toggleDrawer, logOut, navigate, isDrawerOpen, goToPage },
    data: { isDrawerOpen, user, notifyCount },
  };
};
