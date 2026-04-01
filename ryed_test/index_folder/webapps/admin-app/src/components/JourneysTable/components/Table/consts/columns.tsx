import { Badge } from '@ryed/ui/ui/Badge';
import { Button } from '@ryed/ui/ui/Button';
import { ColumnDef } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import { capitalize } from 'lodash';
import { ArrowUpDown, Square, SquareCheckBig } from 'lucide-react';

export type TJourneyRow =
  | {
      id: string;
      fromAddress: string;
      toAddress: string;
      createdAt: string;
      status: string;
      userName: string;
      pickupTime: string;
      // carTypes: string;
      // exclusivityTypes: string;
      vehicleDriver: string;
      vehicle: string;
    }
  | {
      id: string;
      fromAddress: string;
      toAddress: string;
      createdAt: string;
      status: string;
      userName: string;
      pickupTime: string;
      carTypes: string;
      exclusivityTypes: string;
      numberOfPessanger: number;
    };

export const columns = (
  t: TFunction<'translation', undefined>
): ColumnDef<TJourneyRow>[] => [
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.status')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = (row.getValue('status') as string) ?? '';

      return (
        <Badge variant={status}>{capitalize(row.getValue('status'))}</Badge>
      );
    },
  },
  {
    accessorKey: 'pickupTime',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.scheduledTime')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'userName',
    header: () => {
      return <div>{t('journeys:Table.columns.clientName')}</div>;
    },
  },
  {
    accessorKey: 'vehicleDriver',
    header: () => {
      return <div>{t('journeys:Table.columns.vehicleDriver')}</div>;
    },
  },
  {
    accessorKey: 'driverAccepted',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.accepted')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const state = row.getValue('driverAccepted');
      return (
        <div className="flex justify-center">
          {state ? <SquareCheckBig size={20} /> : <Square size={20} />}
        </div>
      );
    },
  },
  {
    accessorKey: 'vehicle',
    header: () => {
      return <div>{t('journeys:Table.columns.vehicle')}</div>;
    },
  },

  {
    accessorKey: 'fromAddress',
    header: () => {
      return <div>{t('journeys:Table.columns.fromAddress')}</div>;
    },
  },
  {
    accessorKey: 'toAddress',
    header: () => {
      return <div>{t('journeys:Table.columns.toAddress')}</div>;
    },
  },
];

export const secondColumns = (
  t: TFunction<'translation', undefined>
): ColumnDef<TJourneyRow>[] => [
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.status')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = (row.getValue('status') as string) ?? '';

      return (
        <Badge variant={status}>{capitalize(row.getValue('status'))}</Badge>
      );
    },
  },
  {
    accessorKey: 'pickupTime',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.scheduledTime')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.clientName')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'carTypes',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.carTypes')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: 'exclusivityTypes',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Exclusivity types
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: 'numberOfPessanger',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.numberOfPessanger')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'fromAddress',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.fromAddress')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'toAddress',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('journeys:Table.columns.toAddress')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
