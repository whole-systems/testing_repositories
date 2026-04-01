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

import { TravelAgency } from '@/models/travel-agencies';
import { useTravelAgenciesTable } from './hooks/useTravelAgenciesTable';

export interface Props {
  data: TravelAgency[] | undefined;
  isLoading: boolean;
}

export const TravelAgenciesTable: FC<Props> = (props) => {
  const { data } = useTravelAgenciesTable(props);

  const { table, columns } = data;

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden h-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
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
        {!props.isLoading ? (
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    className={`${
                      row.original.status === 'BLOCKED' ? 'opacity-25' : ''
                    }`}
                    // onClick={() =>
                    //   navigate(`/travel-agencies/${row.original.id as string}`)
                    // }
                    // className={`cursor-pointer`}
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
                  <TableCell colSpan={8}>
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
