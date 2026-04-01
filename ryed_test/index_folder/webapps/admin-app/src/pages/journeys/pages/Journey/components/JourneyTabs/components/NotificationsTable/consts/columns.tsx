import { Button } from '@ryed/ui/ui/Button';
import { ColumnDef } from '@tanstack/react-table';
import { TFunction } from 'i18next';

export const columns = (
  t: TFunction<'translation', undefined>
): ColumnDef<Notification>[] => [
  {
    accessorKey: 'title',
    header: () => {
      return (
        <Button variant="ghost">
          {t('journeys:notificationsTable.columns.title')}
        </Button>
      );
    },
  },
  {
    accessorKey: 'description',
    header: () => {
      return (
        <Button variant="ghost">
          {t('journeys:notificationsTable.columns.description')}
        </Button>
      );
    },
  },
  {
    accessorKey: 'time',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:notificationsTable.columns.time')}
        </Button>
      );
    },
  },
];
