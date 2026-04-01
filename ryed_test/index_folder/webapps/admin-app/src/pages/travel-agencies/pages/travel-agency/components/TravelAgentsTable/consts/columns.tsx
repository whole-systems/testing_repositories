import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { ColumnDef } from '@tanstack/react-table';
import { DeletePopover } from '@/components/DeletePopover/DeletePopover';
import { UpdateTravelAgentSheet } from '../../UpdateTravelAgentSheet/UpdateTravelAgentSheet';

export interface TravelAgentRow {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: string;
  commissionAmount?: number;
  commissionType?: 'PERCENTAGE' | 'FIXED' | 'OVERRIDE';
  commissionIncludedInPrice?: boolean;
  resetPassword:string;
  isDev?: boolean;
}

export const columns = (
  deleteHandler: (id: string) => void,
  resetPassword:(id:string) => void
): ColumnDef<TravelAgentRow>[] => [
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
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
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
    accessorKey: 'commissionAmount',
    header: () => {
      return <div>Commission</div>;
    },
    cell: ({ row }) => {
      const amount = row.original.commissionAmount;
      const type = row.original.commissionType;
      if (amount === undefined || amount === null) return '-';
      return `${amount}${type === 'PERCENTAGE' ? '%' : ''}`;
    },
  },
  {
    accessorKey: 'isDev',
    header: () => {
      return <div>Dev</div>;
    },
    cell: ({ row }) => {
      return row.original.isDev ? '✓' : '-';
    },
  },
  {
    accessorKey: 'options',
    header: () => <div className="w-full text-right pr-4">Reset Password</div>,
    cell: ({row}) => {
      return (
         <div className="flex items-center space-x-2 justify-end">
         <Button onClick={()=>{resetPassword(row.original.id)}}>Reset Password</Button>
        </div>
      );
    },
     size: 80,
  },
  {
    accessorKey: 'options',
    header: () => <div className="w-full text-right pr-4">Options</div>,
    cell: ({ row }) => {
      return (
        <>
          {row.original.status === 'ACTIVE' && (
            <div className="flex items-center space-x-2 justify-end">
              <UpdateTravelAgentSheet travelAgentId={row.original.id} />
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
  },
];
