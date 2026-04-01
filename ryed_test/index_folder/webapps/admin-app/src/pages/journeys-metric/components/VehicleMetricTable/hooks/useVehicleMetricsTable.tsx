import { TMetricVehicle } from '@/models/journeyMetric';
import { useMemo, useState } from 'react';
import { TVehicleMetricRow, vehicleColumns } from '../columns/VehicleColumns';
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export const useVehicleMetricsTable = (data: TMetricVehicle[]) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const tableData: TVehicleMetricRow[] = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        carModel: `${item.vehicle.make} ${item.vehicle.model}`,
        number: item.vehicle.registeredNumber,
        sum: +item.sum.toFixed(0),
      })),
    [data]
  );
  const table = useReactTable({
    data: tableData,
    columns: vehicleColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  return {
    data: { table, columns: vehicleColumns },
  };
};
