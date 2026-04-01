import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { ColumnDef } from '@tanstack/react-table';
import { UpdateDispatcherSheet } from '../../UpdateDispatcherSheet/UpdateDispatcherSheet';

export interface TDispatcherRow {
  id: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  status: 'ACTIVE' | 'BLOCKED';
  commissionAmount?: number;
  commissionType?: 'PERCENTAGE' | 'FIXED' | 'OVERRIDE';
  commissionIncludedInPrice?: boolean;
  isDev?: boolean;
  isWebhookCreationEnabled?: boolean;
}

export const columns = (resetPassword:(id:string)=>void): ColumnDef<TDispatcherRow>[] => [
  {
    accessorKey: 'companyName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Company Name
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
    accessorKey: 'defaultVat',
    header: () => {
      return <div>VAT</div>;
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
    header: () => <div>Dev</div>,
    cell: ({ row }) => {
      const val = row.original.isDev;
      if (val === null || val === undefined) return '-';
      if (val === false) return '✗';
      return '✓';
    },
  },
  {
    accessorKey: 'id',
    header: () => <div>Reset Password</div>,
    cell: ({ row }) => {
      
      return <Button onClick={()=>{resetPassword(row.original.id)}}>Reset Password</Button>;
    },
  },
  {
    accessorKey: 'options',
    header: () => <div className="w-full text-right pr-4">Options</div>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 justify-end">
        <UpdateDispatcherSheet dispatcher={row.original} />
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(row.original)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button> */}
      </div>
    ),
    size: 80,
  },
];
