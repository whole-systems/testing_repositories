import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/Table';
import { TMetricVehicle } from '@/models/journeyMetric';
import { flexRender } from '@tanstack/react-table';
import { FC } from 'react';
import { useVehicleMetricsTable } from './hooks/useVehicleMetricsTable';

interface Props {
  vehicleMetricsData: TMetricVehicle[];
}

export const VehicleMetricsTable: FC<Props> = ({ vehicleMetricsData }) => {
  const { data } = useVehicleMetricsTable(vehicleMetricsData);
  return (
    <div className=" w-full overflow-auto">
      <Table>
        <TableHeader>
          {data.table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data.table.getRowModel().rows?.length ? (
            data.table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {}}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={data.columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
