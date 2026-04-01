import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { columns } from '../consts/columns';
import { Props } from '../NotificationsTable';
import { formatDistance } from 'date-fns';

type TNotificationRow = {
  id: string;
  title: string;
  description: string;
  time: string;
};

export const useNotificationsTable = (props: Props) => {
  const { data } = props;
  const { t } = useTranslation();

  const notificationsData = useMemo(() => {
    return (
      data?.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        time: formatDistance(new Date(item.createdAt), new Date(), {
          addSuffix: true,
        }),
      })) ?? []
    );
  }, [data]);

  const table = useReactTable<TNotificationRow>({
    data: notificationsData,
    columns: columns(t) as ColumnDef<TNotificationRow>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return { data: { notificationsData, table, columns: columns(t) } };
};
