import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/Table';
import { TablePagination } from '@/components/ui/TablePagination/TablePagination';
import { flexRender } from '@tanstack/react-table';
import { FC } from 'react';
import { Vehicle } from '@/models/vehicle/vehicle';
import { useVehiclesTable } from './hooks/useVehiclesTable';

export interface Props {
  data: Vehicle[] | undefined;
  isLoading: boolean;
}

export const VehiclesTable: FC<Props> = (props) => {
  const { data } = useVehiclesTable(props);
  const { table, columns } = data;

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden h-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {!props.isLoading ? (
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody>
            {new Array(+table.getState().pagination.pageSize)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={10}>
                    <Skeleton className="h-[24px]" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>
      <TablePagination table={table} />
    </div>
  );
};
