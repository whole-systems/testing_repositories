import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns, TDispatcherRow } from '../consts/columns';
import { Props } from '../DispatchersTable';
import { useMemo } from 'react';

export const useDispatcherTable = (props: Props) => {
  const dataTable = useMemo(() => {
    return (
      (props.data?.map((item) => ({
        id: item.id,
        companyName: item.companyName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        status: item.status,
        defaultVat: item.defaultVat,
        options: item.id,
        commissionAmount: item.commissionAmount,
        commissionType: item.commissionType,
        commissionIncludedInPrice: item.commissionIncludedInPrice,
        isDev: item.isDev
      })) as TDispatcherRow[]) || []
    );
  }, [props.data]);

  const table = useReactTable({
    data: dataTable,
    columns: columns(props.resetPassword),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { data: { table, columns } };
};
