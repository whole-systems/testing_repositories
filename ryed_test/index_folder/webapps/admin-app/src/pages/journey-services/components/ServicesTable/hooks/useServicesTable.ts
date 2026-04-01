import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns, TServiceRow } from '../consts/columns';
import { Props } from '../ServicesTable';
import { useMemo } from 'react';
import { useDeleteServiceMutation } from '@/api/journeyServicesEndpoints';

export const useServicesTable = (props: Props) => {
  const [deleteServiceAPI] = useDeleteServiceMutation();
  const dataTable = useMemo(() => {
    return (
      (props.data?.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        active: item.active,
        isFrontFacing: item.isFrontFacing,
        maxItems: item.maxItems,
        price: item.price,
        currency: item.currency,
      })) as TServiceRow[]) || []
    );
  }, [props.data]);

  const deleteServiceHandler = async (id: string) => {
    await deleteServiceAPI({ id });
    props.refetch();
  };

  const table = useReactTable({
    data: dataTable,
    columns: columns(deleteServiceHandler),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { data: { table, columns } };
};
