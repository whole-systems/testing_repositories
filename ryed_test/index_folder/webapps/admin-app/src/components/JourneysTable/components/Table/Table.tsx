import { TJourneysData } from '@/models/journey';
import { Skeleton } from '@ryed/ui/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ryed/ui/ui/Table';
import { TablePagination } from '@ryed/ui/ui/TablePagination';
import { flexRender } from '@tanstack/react-table';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable } from './hooks/useTable';
import { useTranslation } from 'react-i18next';

export interface Props {
  data: TJourneysData | undefined;
  isLoading: boolean;
  params: Record<string, string>;
  setParams: (data: Record<string, string>) => void;
  isResetTable: boolean;
  setIsResetTable: (state: boolean) => void;
  isJourneyPage: boolean;
}

export const TableWrapper: FC<Props> = (props) => {
  const { data } = useTable(props);
  const { t } = useTranslation();
  const { table, columns } = data;
  const navigate = useNavigate();

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
                const isPending =
                  (row.getValue('status') as string) === 'pending' &&
                  props.params.status !== 'pending';

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`cursor-pointer ${
                      isPending ? 'bg-slate-800' : ''
                    }`}
                    onMouseDown={(event) => {
                      const url = `/journeys/${row.original.id as string}`;

                      if (
                        event.ctrlKey ||
                        event.metaKey ||
                        event.button === 1
                      ) {
                        window.open(url, '_blank');
                      } else if (event.button === 0) {
                        navigate(url);
                      }

                      if (event.button === 1) {
                        event.preventDefault();
                      }
                    }}
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
                  {t('journeys:Table.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody>
            {new Array(+props.params.limit || 1).fill(0).map((_, index) => (
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
