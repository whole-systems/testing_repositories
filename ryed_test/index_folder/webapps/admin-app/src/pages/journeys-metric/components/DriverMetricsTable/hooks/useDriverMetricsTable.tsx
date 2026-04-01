import { TMetricVehicleDriverId } from '@/models/journeyMetric';
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { TDriverMetricRow, driverColumns } from '../columns/DriverColumns';

export const useDriverMetricTable = (data: TMetricVehicleDriverId[]) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const tableData: TDriverMetricRow[] = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        fullName: `${item.vehicleDriver.firstName ?? ''} ${
          item.vehicleDriver.lastName ?? ''
        }`,
        sum: +item.sum.toFixed(0),
      })),
    [data]
  );
  const table = useReactTable({
    data: tableData,
    columns: driverColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  return {
    data: { table, columns: driverColumns },
  };
};
