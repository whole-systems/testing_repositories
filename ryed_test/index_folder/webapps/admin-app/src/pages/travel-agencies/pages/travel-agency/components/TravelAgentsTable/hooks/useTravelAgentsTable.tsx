import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns, TravelAgentRow } from '../consts/columns';

import { useMemo } from 'react';
import { Props } from '../TravelAgentsTable';
import { composeReadableTime } from '@ryed-ui/utils/parseTime';
import { useDeleteTravelAgentMutation ,useResetTravelAgentPasswordMutation} from '@/api/travelAgentsEndpoints';
import { useParams } from 'react-router-dom';

export const useTravelAgentsTable = (props: Props) => {
  const { agencyId } = useParams();
  const [deleteTravelAgent] = useDeleteTravelAgentMutation();
  const [resetTravelAgentPassword] = useResetTravelAgentPasswordMutation()

  const dataTable = useMemo(() => {
    const mappedData =
      (props.data?.map((item) => ({
        id: item.id,
        name: `${item.firstName} ${item.lastName}`,
        email: item.email,
        phoneNumber: item.phoneNumber,
        createdAt: composeReadableTime(new Date(item.createdAt)).tableDateTime,
        status: item.status,
      })) as TravelAgentRow[]) || [];

    return mappedData.sort((a, b) => {
      if (a.status === 'ARCHIVED' && b.status !== 'ARCHIVED') return 1;
      if (a.status !== 'ARCHIVED' && b.status === 'ARCHIVED') return -1;
      return 0;
    });
  }, [props.data]);

  const deleteHandler = async (id: string) => {
    await deleteTravelAgent({ agencyId: agencyId, travelAgentId: id });
  };
const resetPassword = async (id: string) => {
    await resetTravelAgentPassword({ agencyId: agencyId, travelAgentId: id });
  };
  const table = useReactTable({
    data: dataTable,
    columns: columns(deleteHandler,resetPassword),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { data: { table, columns } };
};
