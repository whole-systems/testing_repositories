import { Skeleton } from '@ryed/ui/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ryed/ui/ui/Table';
// import { TablePagination } from '@ryed/ui/ui/TablePagination';
import { flexRender } from '@tanstack/react-table';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotificationsTable } from './hooks/useNotificationsTable';
import { Notification } from '@/models/notification';

export interface Props {
  data: Notification[] | undefined;
  isLoading: boolean;
}

export const NotificationsTable: FC<Props> = (props) => {
  const { data } = useNotificationsTable(props);
  const { t } = useTranslation();
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('journeys:Table.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody>
            {new Array(1).fill(0).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={3}>
                  <Skeleton className="h-[24px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {/* <TablePagination table={table} /> */}
    </div>
  );
};
