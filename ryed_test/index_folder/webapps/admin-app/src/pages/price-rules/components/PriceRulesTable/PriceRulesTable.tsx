import { FC } from 'react';
import { usePriceRulesTable } from './hooks/usePriceRulesTable';
import clsx from 'clsx';
import { flexRender } from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@ryed/ui';

import { useNavigate } from 'react-router-dom';

export const PriceRulesTable: FC = () => {
  const { data } = usePriceRulesTable();
  const navigate = useNavigate();
  return (
    <div className="relative w-full overflow-auto">
      <Table
        className={clsx({ 'opacity-50 pointer-events-none': data.isLoading })}
      >
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
                  onClick={() =>
                    navigate(
                      row.original.isBatched
                        ? `/price-rules/batched/${row.original.id}`
                        : `/price-rules/${row.original.id}`
                    )
                  }
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
