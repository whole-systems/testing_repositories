import { FC } from 'react';
import { useCarModalsTable } from './hooks/useCarmodelsTable';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/Table';
import { flexRender } from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/Skeleton';
import { TablePagination } from '@/components/ui/TablePagination/TablePagination';

export const CarModelsTable: FC = () => {
  const { data } = useCarModalsTable();

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden h-full">
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
        {!data.isLoading ? (
          <TableBody>
            {data.table.getRowModel().rows?.length ? (
              data.table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={
                      () => {}
                      // navigate(`/journeys/${row.original.id as string}`)
                    }
                    className={`cursor-pointer`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
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
        ) : (
          <TableBody>
            {new Array(10).fill(0).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={8}>
                  <Skeleton className="h-[24px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <TablePagination table={data.table} />
    </div>
  );
};
