import { Button, Switch } from '@ryed/ui';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export type PriceRuleRow = {
  id: string;
  isBatched: boolean;
  name: string;
  entityType: string;
  journeyType: string;
  priority: number;
  adjustmentType: string;
  priceAdjustment: string;
  isEnabled: boolean;
};

export const getColumns = (
  onSwitchEnable: (id: string, isEnabled: boolean) => void
): ColumnDef<PriceRuleRow>[] => [
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
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'adjustmentType',
    header: () => {
      return <div>Adjustment Type</div>;
    },
  },
  {
    accessorKey: 'priceAdjustment',
    header: () => {
      return <div>Price Adjustment</div>;
    },
  },
  {
    accessorKey: 'journeyType',
    header: () => {
      return <div>Journey Type</div>;
    },
  },
  {
    accessorKey: 'entityType',
    header: () => {
      return <div>Entity Type</div>;
    },
  },
  {
    accessorKey: 'isEnabled',
    cell: ({ row }) => {
      return (
        <Switch
          checked={row.original.isEnabled}
          onCheckedChange={() =>
            onSwitchEnable(row.original.id, !row.original.isEnabled)
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      );
    },
    header: () => {
      return <div>Enabled</div>;
    },
  },
];
