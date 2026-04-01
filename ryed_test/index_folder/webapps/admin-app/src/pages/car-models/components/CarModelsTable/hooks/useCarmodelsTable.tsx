import { useGetCarModelsQuery } from '@/api/carModelsEndpoints';
import { Button } from '@/components/ui/Button/Button';
import { composeReadableTime } from '@ryed-ui/utils/parseTime';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';

export interface CarModalRow {
  createdAt: string;
  id: string;
  make: string;
  model: string;
  updatedAt: string;
  year: number;
}

const columns: ColumnDef<CarModalRow>[] = [
  {
    accessorKey: 'make',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Make
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'model',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Model
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Updated at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

export const useCarModalsTable = () => {
  const { data: carModelsData, isError, isLoading } = useGetCarModelsQuery('');
  const carModelsDataTable = useMemo(() => {
    return (
      carModelsData?.map((item) => ({
        id: item.id,
        make: item.make,
        model: item.model,
        year: item.year,
        createdAt: composeReadableTime(new Date(item.createdAt)).tableDateTime,
        updatedAt: composeReadableTime(new Date(item.updatedAt)).tableDateTime,
      })) ?? []
    );
  }, [carModelsData]);

  const table = useReactTable({
    data: carModelsDataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // manualPagination: true,
  });
  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch car models list.');
    }
  }, [isError]);
  return { data: { carModelsDataTable, table, columns, isLoading } };
};
