// import { useGetJourneysQuery } from '@/api/journeysEndpoints';
// import { useMemo } from 'react';

import {
  useLazyGetJourneysQuery,
  useLazyGetJourneysExportCSVQuery,
} from '@/api/journeysEndpoints';
import { useSearchQueryParams } from '@/hooks/useSearchQueryParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const initParams = {
  page: '0',
  limit: '30',
  orderBy: 'pickupTime: desc',
  withDev: 'false',
} as Record<string, string>;
export const useJourneysTable = (isJourneyPage: boolean) => {
  const [getTableData, { data: journeyData, isFetching }] =
    useLazyGetJourneysQuery();
  const [isResetTable, setIsResetTable] = useState(false);
  const [exportCSVApi, { isFetching: isExportCSVFetching }] =
    useLazyGetJourneysExportCSVQuery();
  const params = useParams();

  const { searchParams, setSearchQueryParams, resetAndPasteParams } =
    useSearchQueryParams(initParams);

  const quaryStateParams = useMemo(() => {
    const page = +searchParams.page || 0;
    const limit = +searchParams.limit;
    const status = searchParams.status ? searchParams.status : undefined;
    const createdAtFrom = !isNaN(+searchParams.createdAtFrom)
      ? +searchParams.createdAtFrom
      : +initParams.createdAtFrom;
    const createdAtTo = !isNaN(+searchParams.createdAtTo)
      ? +searchParams.createdAtTo
      : +initParams.createdAtTo;
    const pickupTimeFrom = !isNaN(+searchParams.pickupTimeFrom)
      ? +searchParams.pickupTimeFrom
      : +initParams.pickupTimeFrom;
    const pickupTimeTo = !isNaN(+searchParams.pickupTimeTo)
      ? +searchParams.pickupTimeTo
      : +initParams.pickupTimeTo;
    const finishedTimeFrom = !isNaN(+searchParams.finishedTimeFrom)
      ? +searchParams.finishedTimeFrom
      : +initParams.finishedTimeFrom;
    const finishedTimeTo = !isNaN(+searchParams.finishedTimeTo)
      ? +searchParams.finishedTimeTo
      : +initParams.finishedTimeTo;
    const vehicleDriverId = searchParams.vehicleDriverId || '';
    const vehicleId = searchParams.vehicleId || '';
    const userId = searchParams.userId || '';
    const orderBy = searchParams.orderBy || '';
    const travelAgencyIds = searchParams.travelAgencyIds || '';
    const dispatcherIds = searchParams.dispatcherIds || '';
    const withDev = searchParams.withDev === 'true' ? true : false;
    const withPayment = searchParams.withPayment || '';
    const commonData = {
      page,
      limit,
      status,
      createdAtFrom,
      createdAtTo,
      pickupTimeFrom,
      pickupTimeTo,
      vehicleDriverId,
      vehicleId,
      userId,
      orderBy,
      finishedTimeFrom,
      finishedTimeTo,
      travelAgencyIds,
      dispatcherIds,
      withDev,
      withPayment,
    };
    if (!isJourneyPage && params.driverId) {
      return {
        ...commonData,
        driverId: params.driverId,
      };
    }
    if (!isJourneyPage && params.vehicleId) {
      return {
        ...commonData,
        vehicleId: params.vehicleId,
      };
    }
    return commonData;
  }, [searchParams, params.driverId, isJourneyPage, params.vehicleId]);

  const handleExportCSV = useCallback(() => {
    exportCSVApi(quaryStateParams);
  }, [quaryStateParams, exportCSVApi]);

  const handleDateChange = useCallback(
    (newRange: { from: Date; to: Date }) => {
      if (newRange.from.getTime() > newRange.to.getTime()) {
        setSearchQueryParams({
          ...searchParams,
          dateFrom: newRange.to.getTime().toString(),
          dateTo: newRange.from.getTime().toString(),
        });
      } else {
        setSearchQueryParams({
          ...searchParams,
          dateFrom: newRange.from.getTime().toString(),
          dateTo: newRange.to.getTime().toString(),
        });
      }
    },
    [searchParams, setSearchQueryParams]
  );
  const handleChangeTab = useCallback(
    (value: string) => {
      if (value === 'pending') {
        setIsResetTable(true);
        resetAndPasteParams({
          page: initParams.page,
          limit: initParams.limit,
          status: 'pending',
        });
        return;
      }
      if (value !== 'journeys') {
        setIsResetTable(true);
        resetAndPasteParams({
          ...initParams,
          status: value,
        });
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { status, ...rest } = searchParams;
      setIsResetTable(true);
      resetAndPasteParams({
        ...rest,
      });
    },
    [resetAndPasteParams]
  );
  const setParamsFromFilter = useCallback(
    (filter: Record<string, string>) => {
      resetAndPasteParams(filter);
      setIsResetTable(true);
    },
    [resetAndPasteParams]
  );
  useEffect(() => {
    getTableData(quaryStateParams);
  }, [quaryStateParams, getTableData]);
  return {
    data: {
      quaryStateParams,
      searchParams,
      isLoading: isFetching,
      journeyData,
      isResetTable,
      params,
      isExportCSVFetching,
    },
    handlers: {
      handleDateChange,
      setSearchQueryParams,
      handleChangeTab,
      setIsResetTable,
      setParamsFromFilter,
      handleExportCSV,
      getTableData,
    },
  };
};
