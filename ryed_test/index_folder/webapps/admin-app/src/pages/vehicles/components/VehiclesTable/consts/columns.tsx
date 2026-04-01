import { ArrowUpDown, SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { ColumnDef } from '@tanstack/react-table';
// import { DeletePopover } from '@/components/DeletePopover/DeletePopover';

export interface VehicleRow {
  id: string;
  make: string;
  model: string;
  type: string;
  registeredNumber: string;
  color: string;
  year: number;
  numberOfSits: number;
  exclusivityLevel: string;
  tripPricePerKm: number;
  tripMinPrice: number;
}

export const columns = (
  // deleteHandler: (id: string) => void,
  navigate: (path: string) => void
): ColumnDef<VehicleRow>[] => [
  {
    accessorKey: 'make',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Make / Model
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          onClick={() => navigate(`/vehicles/${row.original.id}`)}
          className="cursor-pointer flex flex-row items-center"
        >
          <SquareArrowOutUpRight size={14} className="mr-2" />
          {row.original.make} {row.original.model}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: () => <div>Type</div>,
  },
  {
    accessorKey: 'registeredNumber',
    header: () => <div>Reg. Number</div>,
  },
  {
    accessorKey: 'color',
    header: () => <div>Color</div>,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'numberOfSits',
    header: () => <div>Seats</div>,
  },
  {
    accessorKey: 'exclusivityLevel',
    header: () => <div>Exclusivity</div>,
  },
  {
    accessorKey: 'tripPricePerKm',
    header: () => <div>Price/km</div>,
    cell: ({ row }) => `$${row.original.tripPricePerKm ?? '-'}`,
  },
  {
    accessorKey: 'tripMinPrice',
    header: () => <div>Min price</div>,
    cell: ({ row }) => `$${row.original.tripMinPrice ?? '-'}`,
  },
  // {
  //   accessorKey: 'options',
  //   header: () => <div className="w-full text-right pr-4">Options</div>,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center justify-end">
  //         <DeletePopover
  //           deleteHandler={() => deleteHandler(row.original.id)}
  //           id={row.original.id}
  //         />
  //       </div>
  //     );
  //   },
  //   size: 80,
  // },
];
