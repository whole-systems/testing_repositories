import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns, TravelAgencyRow } from '../consts/columns';

import { useMemo } from 'react';
import { Props } from '../TravelAgenciesTable';
import { useDeleteTravelAgencyMutation } from '@/api/travelAgenciesEndpoints';
import { useNavigate } from 'react-router-dom';

export const useTravelAgenciesTable = (props: Props) => {
  const [deleteTravelAgency] = useDeleteTravelAgencyMutation();
  const navigate = useNavigate();
  const dataTable = useMemo(() => {
    const mappedData =
      (props.data?.map((item) => ({
        id: item.id,
        name: item.name,
        supportEmail: item.supportEmail,
        phoneNumber: item.phoneNumber,
        status: item.status,
        defaultVat: item.defaultVat,
        isWebhookCreationEnabled: item.isWebhookCreationEnabled,
        commissionAmount: item.commissionAmount,
        commissionType: item.commissionType,
        commissionIncludedInPrice: item.commissionIncludedInPrice,
        isDev: item.isDev,
        reset_password:'asaf',

      })) as TravelAgencyRow[]) || [];

    return mappedData.sort((a, b) => {
      if (a.status === 'BLOCKED' && b.status !== 'BLOCKED') return 1;
      if (a.status !== 'BLOCKED' && b.status === 'BLOCKED') return -1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });
  }, [props.data]);

  const deleteHandler = async (id: string) => {
    console.log('deleteHandler', id);
    await deleteTravelAgency(id);
  };

  const table = useReactTable({
    data: dataTable,
    columns: columns(deleteHandler, navigate),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { data: { table, columns } };
};
