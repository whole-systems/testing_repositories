import { ArrowUpDown, SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { ColumnDef } from '@tanstack/react-table';
import { UpdateTravelAgencySheet } from '../../UpdateTravelAgencySheet/UpdateTravelAgencySheet';
import { DeletePopover } from '@/components/DeletePopover/DeletePopover';


export interface TravelAgencyRow {
  id: string;
  name: string;
  supportEmail: string;
  phoneNumber: string;
  status: 'ACTIVE' | 'BLOCKED';
  defaultVat: number;
  isWebhookCreationEnabled: boolean;
  commissionAmount: number;
  commissionType: 'PERCENTAGE' | 'FIXED';
  commissionIncludedInPrice: boolean;
  isDev: boolean;
}

export const columns = (
  deleteHandler: (id: string) => void,
  navigate: (path: string) => void
): ColumnDef<TravelAgencyRow>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          onClick={() => navigate(`/travel-agencies/${row.original.id}`)}
          className="cursor-pointer flex flex-row items-center"
        >
          <SquareArrowOutUpRight size={14} className="mr-2" />
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: 'supportEmail',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Support email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: () => {
      return <div>Phone Number</div>;
    },
  },
  {
    accessorKey: 'status',
    header: () => {
      return <div>Status</div>;
    },
  },
  {
    accessorKey: 'isWebhookCreationEnabled',
    header: () => {
      return <div>Webhook enabled</div>;
    },
    cell: ({ row }) => {
      const val = row.original.isWebhookCreationEnabled;
      if (val === null || val === undefined) return '-';
      if (val === false) return '✗';
      return '✓';
    },
  },
  {
    accessorKey: 'defaultVat',
    header: () => {
      return <div>VAT</div>;
    },
  },
  {
    accessorKey: 'commission',
    header: () => <div>Commission</div>,
    cell: ({ row }) => {
      const amount = row.original.commissionAmount;
      const type = row.original.commissionType;
      if (amount === undefined || amount === null) return '-';
      return `${amount}${type === 'PERCENTAGE' ? '%' : ''}`;
    },
  },
  {
    accessorKey: 'isDev',
    header: () => <div>Dev</div>,
    cell: ({ row }) => {
      const val = row.original.isDev;
      if (val === null || val === undefined) return '-';
      if (val === false) return '✗';
      return '✓';
    },
  },
  {
    accessorKey: 'options',
    header: () => <div className="w-full text-right pr-4">Options</div>,
    cell: ({ row }) => {
      return (
        <>
          {row.original.status === 'ACTIVE' && (
            <div className="flex items-center space-x-2 justify-end">
              <UpdateTravelAgencySheet agencyId={row.original.id} />
              <DeletePopover
                deleteHandler={() => deleteHandler(row.original.id)}
                id={row.original.id}
              />
            </div>
          )}
        </>
      );
    },
    size: 80,
  }
];
