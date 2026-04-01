import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { ColumnDef } from '@tanstack/react-table';
import { DeletePopover } from '@/components/DeletePopover/DeletePopover';
import { UpdateServiceSheet } from '../../UpdateServiceSheet/UpdateServiceSheet';

export interface TServiceRow {
  id: string;
  name: string;
  type: string;
  active: boolean;
  maxItems: number;
  price: number;
  currency: string;
}

export const columns = (
  deleteServiceHandler: (id: string) => void
): ColumnDef<TServiceRow>[] => [
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
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'active',
    header: () => {
      return <div>Active</div>;
    },
  },
  {
    accessorKey: 'isFrontFacing',
    header: () => {
      return <div>Front Facing</div>;
    },
  },
  {
    accessorKey: 'maxItems',
    header: () => {
      return <div>Max Items</div>;
    },
  },
  {
    accessorKey: 'price',
    header: () => {
      return <div>Price</div>;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.price} {row.original.currency}
        </div>
      );
    },
  },
  {
    accessorKey: 'options',
    header: () => <div className="w-full text-right pr-4">Options</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2 justify-end">
          <UpdateServiceSheet serviceId={row.original.id} />
          <DeletePopover
            deleteHandler={() => deleteServiceHandler(row.original.id)}
            id={row.original.id}
          />
        </div>
      );
    },
    size: 80,
  },
];
