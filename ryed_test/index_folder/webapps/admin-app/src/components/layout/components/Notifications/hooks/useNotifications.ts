import {
  useArchivedNotificationsMutation,
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from '@/api/notificationsEndpoints';
import { useCallback, useEffect, useState } from 'react';

export const useNotifications = () => {
  const { data: notifications, refetch } = useGetNotificationsQuery();
  const [setAsRead] = useReadNotificationsMutation();
  const [archive, { isLoading }] = useArchivedNotificationsMutation();

  const [selectAll, setSelectAll] = useState(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    if (notifications) {
      const allId = notifications.map((item) => item.id);
      setAsRead(allId);
    }
  }, [notifications, setAsRead]);

  useEffect(() => {
    if (notifications?.length === checkedList.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [checkedList, selectAll, notifications?.length]);

  const toggleSelect = useCallback(
    (id: string, remove: boolean = false) => {
      setCheckedList((prevList) => {
        if (remove) {
          return prevList.filter((item) => item !== id);
        } else {
          return [...prevList, id];
        }
      });
    },
    [setCheckedList]
  );

  const selectAllToggle = useCallback(() => {
    const allId = notifications?.map((item) => item.id);
    if (!selectAll) {
      setSelectAll(true);
      setCheckedList(allId || []);
      return;
    }
    setSelectAll(false);
    setCheckedList([]);
  }, [setSelectAll, setCheckedList, notifications, selectAll]);

  const archiveChecked = () => {
    if (notifications) {
      archive(checkedList).then(() => refetch());
    }
  };

  return {
    data: { notifications, selectAll, checkedList, isLoading },
    handlers: { archiveChecked, selectAllToggle, toggleSelect, refetch },
  };
};
