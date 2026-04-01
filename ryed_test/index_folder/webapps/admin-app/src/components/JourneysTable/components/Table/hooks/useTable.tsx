// import { getCarOrExcluasivityTypes } from '@/utils/maps/carTypeAndExclusivityMap';
import { getCarOrExcluasivityTypes } from '@/utils/carTypeAndExlusivity';
import { getJourneyStatus } from '@/utils/maps/journeyStatusMap';
import { parseLocationName } from '@/utils/parseLocationName/parseLocationName';
import { composeReadableTime } from '@ryed-ui/utils/parseTime';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { columns, secondColumns } from '../consts/columns';
import { Props } from '../Table';

export type TJourneyRow = {
  id: string;
  pickupTime: string;
  fromAddress: string;
  toAddress: string;
  status: string;
  userName: string;
  // carTypes: string;
  // exclusivityTypes: string;
  vehicleDriver: string;
  vehicle: string;
};

export type TSecondJourneyRow = {
  id: string;
  fromAddress: string;
  toAddress: string;
  createdAt: string;
  status: string;
  userName: string;
  pickupTime: string;
  carTypes: string;
  exclusivityTypes: string;
  numberOfPessanger: number;
};

export const useTable = (props: Props) => {
  const { data, params, setParams, isResetTable, setIsResetTable } = props;
  const isPending = params.status === 'pending';
  const { t } = useTranslation();
  const journeysDataTable = useMemo(() => {
    return (
      data?.journeys.map((item) => ({
        id: item.id,
        fromAddress: parseLocationName(item.fromLatLang),
        toAddress: parseLocationName(item.toLatLang),
        pickupTime: item.scheduledJourney?.pickupTime
          ? composeReadableTime(
              new Date(item.scheduledJourney.pickupTime),
              item.fromLatLang.country || item.toLatLang.country
            ).tableDateTime
          : 'N/A',
        status: getJourneyStatus(item.status) ?? 'N/A',
        userName: (() => {
          if (item.metadata.orderrerInformation?.displayInfo?.name) {
            return (
              item.metadata.orderrerInformation?.displayInfo?.name || 'N/A'
            );
          }
          const user = item.user
            ? `${item.user.firstName} ${item.user.lastName}`
            : 'N/A';

          const userName = item.metadata.userInformation
            ? `${item.metadata.userInformation.firstName} ${item.metadata.userInformation.lastName}`
            : user;

          return userName;
        })(),
        // carTypes: item.metadata.requestedCarType
        //   ? getCarOrExcluasivityTypes(item.metadata.requestedCarType, true)
        //   : 'N/A',

        // exclusivityTypes: item.metadata.requestedExclusivity
        //   ? getCarOrExcluasivityTypes(item.metadata.requestedExclusivity, false)
        //   : 'N/A',
        vehicleDriver: item.vehicleDriver
          ? `${item.vehicleDriver.firstName} ${item.vehicleDriver.lastName}`
          : 'N/A',
        driverAccepted: !!item.driverAcceptedAt,
        vehicle: item.vehicle
          ? `${item.vehicle.make}, ${item.vehicle.model}, ${item.vehicle.registeredNumber}`
          : 'N/A',
      })) ?? []
    );
  }, [data]);
  const secondJourneysDataTable = useMemo(() => {
    return (
      data?.journeys.map((item) => ({
        id: item.id,
        pickupTime: item.scheduledJourney?.pickupTime
          ? composeReadableTime(
              new Date(item.scheduledJourney.pickupTime),
              item.fromLatLang.country || item.toLatLang.country
            ).tableDateTime
          : 'N/A',
        fromAddress: parseLocationName(item.fromLatLang),
        toAddress: parseLocationName(item.toLatLang),
        status: getJourneyStatus(item.status) ?? 'N/A',
        userName: (() => {
          if (item.metadata.orderrerInformation?.displayInfo?.name) {
            return (
              item.metadata.orderrerInformation?.displayInfo?.name || 'N/A'
            );
          }
          const userName = item.user
            ? `${item.user.firstName} ${item.user.lastName}`
            : 'N/A';
          return userName;
        })(),
        carTypes: item.metadata.requestedCarType
          ? getCarOrExcluasivityTypes(item.metadata.requestedCarType, true)
          : 'N/A',

        exclusivityTypes: item.metadata.requestedExclusivity
          ? getCarOrExcluasivityTypes(item.metadata.requestedExclusivity, false)
          : 'N/A',
        numberOfPessanger: item.metadata.passengerCount || 'N/A',
      })) ?? []
    );
  }, [data]);

  const currentDataAndCollumns = useMemo(() => {
    return {
      data: !isPending ? journeysDataTable : secondJourneysDataTable,
      columns: !isPending ? columns(t) : secondColumns(t),
    };
  }, [isPending, journeysDataTable, secondJourneysDataTable]);

  const table = useReactTable<TJourneyRow>({
    data: currentDataAndCollumns.data as TJourneyRow[],
    columns:
      currentDataAndCollumns.columns as unknown as ColumnDef<TJourneyRow>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: true,
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex: +params.page || 0,
        pageSize: +params.limit || 10,
      },
    },
    pageCount: data?.totalPages || 0,
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const { sorting } = table.getState();

  useEffect(() => {
    if (sorting.length) {
      const orderBy = params.orderBy;
      const { desc, id } = sorting[0];
      if (!orderBy) {
        setParams({ orderBy: `${id}:${desc ? 'desc' : 'asc'}` });
        return;
      }
      if (orderBy.includes(id) && orderBy.includes(desc ? 'desc' : 'asc')) {
        return;
      }
      if (!orderBy.includes(id) || !orderBy.includes(desc ? 'desc' : 'asc')) {
        setParams({ orderBy: `${id}:${desc ? 'desc' : 'asc'}` });
      }

      //
    }
  }, [sorting, setParams, params]);
  useEffect(() => {
    if (isResetTable) {
      table.reset();
      setIsResetTable(false);
    }
  }, [isResetTable, table, setIsResetTable]);
  useEffect(() => {
    if (isResetTable) return;
    if (+params.page !== pageIndex || +params.limit !== pageSize) {
      setParams({ page: pageIndex.toString(), limit: pageSize.toString() });
    }
  }, [params, pageIndex, pageSize, setParams, isResetTable]);

  // useEffect(() => {
  //   const getData = async () =>
  //     await getTableData({ page: pageIndex, limit: pageSize, driverId });
  //   console.log(pageIndex, pageSize);
  //   getData();
  // }, [pageIndex, pageSize, getTableData, driverId]);

  // useEffect(() => {
  //   if (isError) {
  //     toast.error('Failed to fetch journeys list.');
  //   }
  // }, [isError]);

  return { data: { journeysDataTable, table, columns } };
};
