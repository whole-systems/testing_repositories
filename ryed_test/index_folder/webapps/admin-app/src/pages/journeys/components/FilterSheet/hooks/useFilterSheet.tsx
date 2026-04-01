import { useGetDataForFilterQuery } from '@/api/journeysEndpoints';
import { addDays, endOfDay, startOfDay, subDays } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MultiSelectData {
  label: string;
  value: string;
}
export interface Filter {
  vehicleDriverId: string[];
  vehicleId: string[];
  status: string[];
  createdAtFrom?: number;
  createdAtTo?: number;
  pickupTimeFrom?: number;
  pickupTimeTo?: number;
  finishedTimeFrom?: number;
  finishedTimeTo?: number;
  userId: string[];
  dispatcherIds: string[];
  travelAgencyIds: string[];
  withDev: boolean;
  payment?: string;
}
const statuses = [
  'pending',
  'in-progress',
  'future',
  'finished',
  'cancelled',
  'archived',
];

const initDateFrom = startOfDay(addDays(new Date(), -30)).getTime();
const initDateTo = startOfDay(addDays(new Date(), 30)).getTime();

const initFilter = {
  vehicleDriverId: [],
  vehicleId: [],
  status: [],
  userId: [],
  dispatcherIds: [],
  travelAgencyIds: [],
  withDev: false,
};

interface HookProps {
  handleConfirmFilter: (data: Record<string, string>) => void;
  searchParams: Record<string, string>;
}

export const useFilterSheet = (props: HookProps) => {
  const { handleConfirmFilter, searchParams } = props;
  const { data: filterDataAPI } = useGetDataForFilterQuery('');
  const [filter, setFilter] = useState<Filter>(initFilter);

  const vehicleDriverSelectRef = useRef<{ resetSelection: () => void }>(null);
  const vehicleSelectRef = useRef<{ resetSelection: () => void }>(null);
  const statusSelectRef = useRef<{ resetSelection: () => void }>(null);
  const usersSelectRef = useRef<{ resetSelection: () => void }>(null);
  const dispatcherSelectRef = useRef<{ resetSelection: () => void }>(null);
  const travelAgencySelectRef = useRef<{ resetSelection: () => void }>(null);

  const [createAtSelect, setCreateAtSelect] = useState('default');
  const [pickupSelect, setPickupSelect] = useState('default');
  const [finishedSelect, setFinishedSelect] = useState('default');
  const [paymentSelect, setPaymentSelect] = useState('default');

  const [openPickup, setOpenPickup] = useState(false);
  const [openFinished, setOpenFinished] = useState(false);
  const [openCreateAt, setOpenCreateAt] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();
  const statusMultiSelectData = statuses.map((item) => ({
    value: item,
    label: t(`journeys:journeysTableFilterSheet.status.values.${item}`),
  }));
  const toggleDrawer = useCallback(
    () => setIsDrawerOpen((state) => !state),
    []
  );

  useEffect(() => {
    if (!isDrawerOpen) {
      setOpenPickup(false);
      setOpenFinished(false);
      setOpenCreateAt(false);
    }
  }, [isDrawerOpen]);
  useEffect(() => {
    setFilter((state) => ({
      ...state,
      dispatcherIds: searchParams.dispatcherIds?.split(',') || [],
      travelAgencyIds: searchParams.travelAgencyIds?.split(',') || [],
      vehicleDriverIds: searchParams.vehicleDriverIds?.split(',') || [],
      vehicleId: searchParams.vehicleId?.split(',') || [],
      userId: searchParams.userId?.split(',') || [],
      status: searchParams.status?.split(',') || [],
      createdAtFrom: +searchParams.createdAtFrom || undefined,
      createdAtTo: +searchParams.createdAtTo || undefined,
      pickupTimeFrom: +searchParams.pickupTimeFrom || undefined,
      pickupTimeTo: +searchParams.pickupTimeTo || undefined,
      finishedTimeFrom: +searchParams.finishedTimeFrom || undefined,
      finishedTimeTo: +searchParams.finishedTimeTo || undefined,
      withDev: searchParams.withDev === 'true' ? true : false,
      payment:
        searchParams.withPayment === 'true'
          ? 'paidByCreditCard'
          : 'delayedPayment',
    }));
    if (searchParams.withPayment) {
      setPaymentSelect(
        searchParams.withPayment === 'true'
          ? 'paidByCreditCard'
          : 'delayedPayment'
      );
    }

    if (searchParams.createdAtFrom && searchParams.createdAtTo) {
      setCreateAtSelect('custom');
    } else {
      setCreateAtSelect('default');
    }
    if (searchParams.pickupTimeFrom && searchParams.pickupTimeTo) {
      setPickupSelect('custom');
    } else {
      setPickupSelect('default');
    }
    if (searchParams.finishedTimeFrom && searchParams.finishedTimeTo) {
      setFinishedSelect('custom');
    } else {
      setFinishedSelect('default');
    }
  }, [searchParams]);
  const mapData = useMemo(() => {
    const newMapData = {
      drivers: [] as MultiSelectData[],
      vehicle: [] as MultiSelectData[],
      users: [] as MultiSelectData[],
      status: [] as MultiSelectData[],
      dispatchers: [] as MultiSelectData[],
      travelAgencies: [] as MultiSelectData[],
      driversInit: [] as MultiSelectData[],
      vehicleInit: [] as MultiSelectData[],
      usersInit: [] as MultiSelectData[],
      statusInit: [] as MultiSelectData[],
      dispatchersInit: [] as MultiSelectData[],
      travelAgenciesInit: [] as MultiSelectData[],
      withDevInit: false,
    };
    newMapData.drivers =
      filterDataAPI?.drivers.map((item) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item.id,
      })) || [];
    newMapData.dispatchers =
      filterDataAPI?.dispatchers.map((item) => ({
        label: `${item.companyName}`,
        value: item.id,
      })) || [];
    newMapData.travelAgencies =
      filterDataAPI?.travelAgencies.map((item) => ({
        label: `${item.name}`,
        value: item.id,
      })) || [];
    // newMapData.vehicle =
    //   filterDataAPI?.vehicles.map((item) => ({
    //     label: `${item.make} ${item.model}`,
    //     value: item.id,
    //   })) || [];
    // newMapData.users =
    //   filterDataAPI?.users.map((item) => ({
    //     label: `${item.firstName} ${item.lastName}`,
    //     value: item.id,
    //   })) || [];
    newMapData.status = statusMultiSelectData;
    //init fields map
    newMapData.driversInit =
      newMapData.drivers?.filter((f) =>
        searchParams.vehicleDriverId?.includes(f.value)
      ) || [];
    newMapData.dispatchersInit =
      newMapData.dispatchers?.filter((f) =>
        searchParams.dispatcherIds?.includes(f.value)
      ) || [];
    newMapData.travelAgenciesInit =
      newMapData.travelAgencies?.filter((f) =>
        searchParams.travelAgencyIds?.includes(f.value)
      ) || [];
    newMapData.vehicleInit =
      newMapData.vehicle?.filter((f) =>
        searchParams.vehicleId?.includes(f.value)
      ) || [];
    newMapData.usersInit =
      newMapData.users?.filter((f) => searchParams.userId?.includes(f.value)) ||
      [];
    newMapData.statusInit =
      newMapData.status.filter((f) => searchParams.status?.includes(f.value)) ||
      [];
    return newMapData;
  }, [filterDataAPI, searchParams]);

  const handleMultiSelect = useCallback(
    (field: string, values: MultiSelectData[]) => {
      if (field === 'status') {
        setFilter((state) => ({
          ...state,
          status: values.map((item) => item.value),
        }));
        return;
      }
      if (field === 'vehicleDriverId') {
        setFilter((state) => ({
          ...state,
          vehicleDriverId: values.map((item) => item.value) || [],
        }));
        return;
      }
      if (field === 'vehicleId') {
        setFilter((state) => ({
          ...state,
          vehicleId: values.map((item) => item.value) || [],
        }));
        return;
      }
      if (field === 'userId') {
        setFilter((state) => ({
          ...state,
          userId: values.map((item) => item.value) || [],
        }));
        return;
      }
      if (field === 'dispatcherIds') {
        setFilter((state) => ({
          ...state,
          dispatcherIds: values.map((item) => item.value) || [],
        }));
        return;
      }
      if (field === 'travelAgencyIds') {
        setFilter((state) => ({
          ...state,
          travelAgencyIds: values.map((item) => item.value) || [],
        }));
        return;
      }
    },
    []
  );
  const handleChangeCalendar = useCallback(
    (
      field: string,
      values: {
        from: Date;
        to: Date;
      }
    ) => {
      if (field === 'createTime') {
        setFilter((state) => ({
          ...state,
          createdAtFrom: values.from.getTime(),
          createdAtTo: values.to.getTime(),
        }));
        return;
      }
      if (field === 'pickupTime') {
        setFilter((state) => ({
          ...state,
          pickupTimeFrom: values.from.getTime(),
          pickupTimeTo: values.to.getTime(),
        }));
        return;
      }
      if (field === 'finishedTime') {
        setFilter((state) => ({
          ...state,
          finishedTimeFrom: values.from.getTime(),
          finishedTimeTo: values.to.getTime(),
        }));
        return;
      }
    },
    []
  );

  const parseDataAndConfirm = useCallback(() => {
    let withPayment = '';

    switch (filter.payment) {
      case 'delayedPayment':
        withPayment = 'false';
        break;
      case 'paidByCreditCard':
        withPayment = 'true';
        break;
      case 'default':
        withPayment = '';
        break;
      default:
        withPayment = '';
        break;
    }

    const parseData = {
      dispatcherIds: filter.dispatcherIds?.join(',') || '',
      travelAgencyIds: filter.travelAgencyIds?.join(',') || '',
      vehicleDriverId: filter.vehicleDriverId?.join(',') || '',
      vehicleId: filter.vehicleId?.join(',') || '',
      userId: filter.userId?.join(',') || '',
      status: filter.status?.join(',') || '',
      createdAtFrom: filter.createdAtFrom?.toString() || '',
      createdAtTo: filter.createdAtTo?.toString() || '',
      pickupTimeFrom: filter.pickupTimeFrom?.toString() || '',
      pickupTimeTo: filter.pickupTimeTo?.toString() || '',
      finishedTimeFrom: filter.finishedTimeFrom?.toString() || '',
      finishedTimeTo: filter.finishedTimeTo?.toString() || '',
      withDev: filter.withDev ? 'true' : 'false',
      withPayment,
      page: '0',
      limit: '30',
      isFiltered: 'true',
    };

    const cleanObject = (obj: Record<string, string>) => {
      return Object.keys(obj).reduce((acc, key) => {
        if (obj[key]) {
          acc[key] = obj[key];
        }
        return acc;
      }, {} as Record<string, string>);
    };
    const cleanedData = cleanObject(parseData);

    toggleDrawer();
    handleConfirmFilter(cleanedData);
    // setFilter(initFilter);
  }, [handleConfirmFilter, filter, toggleDrawer]);

  const handleChangeSelect = useCallback((name: string, value: string) => {
    let newDateFrom: number | undefined;
    let newDateTo: number | undefined;

    if (name === 'createAt') {
      switch (value) {
        case '0':
          newDateFrom = startOfDay(new Date()).getTime();
          newDateTo = endOfDay(new Date()).getTime();
          break;
        case '1':
          newDateFrom = startOfDay(subDays(new Date(), 1)).getTime();
          newDateTo = endOfDay(subDays(new Date(), 1)).getTime();
          break;
        case '7':
          newDateFrom = startOfDay(subDays(new Date(), 7)).getTime();
          newDateTo = endOfDay(new Date()).getTime();
          break;
        case '30':
          newDateFrom = startOfDay(subDays(new Date(), 30)).getTime();
          newDateTo = endOfDay(new Date()).getTime();
          break;
        case 'custom':
          setFilter((state) => ({
            ...state,
            createdAtFrom: initDateFrom,
            createdAtTo: initDateTo,
          }));
          setCreateAtSelect(value);
          return;
        default:
          break;
      }

      setCreateAtSelect(value);
      setFilter((state) => ({
        ...state,
        createdAtFrom: newDateFrom,
        createdAtTo: newDateTo,
      }));
      return;
    }

    if (name === 'pickup') {
      switch (value) {
        case '0':
          newDateFrom = startOfDay(new Date()).getTime();
          newDateTo = endOfDay(new Date()).getTime();
          break;
        case '1':
          newDateFrom = startOfDay(addDays(new Date(), 1)).getTime();
          newDateTo = endOfDay(addDays(new Date(), 1)).getTime();
          break;
        case '7':
          newDateFrom = startOfDay(new Date()).getTime();
          newDateTo = endOfDay(addDays(new Date(), 7)).getTime();
          break;
        case '30':
          newDateFrom = startOfDay(new Date()).getTime();
          newDateTo = endOfDay(addDays(new Date(), 30)).getTime();
          break;
        case 'custom':
          setFilter((state) => ({
            ...state,
            pickupTimeFrom: initDateFrom,
            pickupTimeTo: initDateTo,
          }));
          setPickupSelect(value);
          return;
        default:
          break;
      }

      setPickupSelect(value);
      setFilter((state) => ({
        ...state,
        pickupTimeFrom: newDateFrom,
        pickupTimeTo: newDateTo,
      }));
      return;
    }

    if (name === 'finished') {
      switch (value) {
        case '0':
          newDateFrom = startOfDay(new Date()).getTime();
          newDateTo = endOfDay(new Date()).getTime();
          break;
        case '1':
          newDateFrom = startOfDay(subDays(new Date(), 1)).getTime();
          newDateTo = endOfDay(subDays(new Date(), 1)).getTime();
          break;
        case '7':
          newDateFrom = startOfDay(subDays(new Date(), 7)).getTime();
          newDateTo = endOfDay(new Date()).getTime();
          break;
        case '30':
          newDateFrom = startOfDay(subDays(new Date(), 30)).getTime();
          newDateTo = endOfDay(new Date()).getTime();
          break;
        case 'custom':
          setFilter((state) => ({
            ...state,
            finishedTimeFrom: initDateFrom,
            finishedTimeTo: endOfDay(addDays(new Date(), 0)).getTime(),
          }));
          setFinishedSelect(value);
          return;
        default:
          break;
      }

      setFinishedSelect(value);
      setFilter((state) => ({
        ...state,
        finishedTimeFrom: newDateFrom,
        finishedTimeTo: newDateTo,
      }));
      return;
    }
    if (name === 'payment') {
      setPaymentSelect(value);
      setFilter((state) => ({
        ...state,
        payment: value,
      }));
      return;
    }
  }, []);

  const handleResetSelects = useCallback((name?: string) => {
    if (name === 'driverId') {
      vehicleDriverSelectRef.current?.resetSelection();
      return;
    }
    if (name === 'vehicleId') {
      vehicleSelectRef.current?.resetSelection();
      return;
    }
    if (name === 'status') {
      statusSelectRef.current?.resetSelection();
      return;
    }
    if (name === 'userId') {
      usersSelectRef.current?.resetSelection();
      return;
    }
    if (name === 'dispatcherIds') {
      dispatcherSelectRef.current?.resetSelection();
      return;
    }
    if (name === 'travelAgencyIds') {
      travelAgencySelectRef.current?.resetSelection();
      return;
    }

    if (name === 'payment') {
      setPaymentSelect('default');
      setFilter((state) => ({
        ...state,
        payment: 'default',
      }));
      return;
    }
    statusSelectRef.current?.resetSelection();
    usersSelectRef.current?.resetSelection();
    vehicleSelectRef.current?.resetSelection();
    vehicleDriverSelectRef.current?.resetSelection();
    setPaymentSelect('default');
    setFilter((state) => ({
      ...state,
      payment: 'default',
    }));
  }, []);

  const handleResetCalendar = useCallback((name?: string) => {
    if (name === 'createAt') {
      setFilter((state) => ({
        ...state,
        createdAtFrom: undefined,
        createdAtTo: undefined,
      }));
      setCreateAtSelect('default');
      return;
    }
    if (name === 'pickup') {
      setFilter((state) => ({
        ...state,
        pickupTimeFrom: undefined,
        pickupTimeTo: undefined,
      }));
      setPickupSelect('default');
      return;
    }
    if (name === 'finished') {
      setFilter((state) => ({
        ...state,
        finishedTimeFrom: undefined,
        finishedTimeTo: undefined,
      }));
      setFinishedSelect('default');
      return;
    }
    setFilter((state) => ({
      ...state,
      pickupTimeFrom: undefined,
      pickupTimeTo: undefined,
      createdAtFrom: undefined,
      createdAtTo: undefined,
      finishedTimeFrom: undefined,
      finishedTimeTo: undefined,
    }));
    setCreateAtSelect('default');
    setPickupSelect('default');
    setFinishedSelect('default');
  }, []);

  const resetFilter = useCallback(() => {
    handleResetSelects();
    handleResetCalendar();
  }, [handleResetSelects, handleResetCalendar]);

  const handleSetWithDev = useCallback((value: boolean) => {
    setFilter((state) => ({
      ...state,
      withDev: value,
    }));
  }, []);

  return {
    data: {
      isDrawerOpen,
      mapData,
      filter,
      ref: {
        vehicleDriverSelectRef,
        vehicleSelectRef,
        usersSelectRef,
        statusSelectRef,
        dispatcherSelectRef,
        travelAgencySelectRef,
      },
      createAtSelect,
      pickupSelect,
      finishedSelect,
      statusMultiSelectData,
      openPickup,
      openFinished,
      openCreateAt,
      paymentSelect,
      openPayment,
    },
    handlers: {
      toggleDrawer,
      handleMultiSelect,
      handleChangeCalendar,
      parseDataAndConfirm,
      handleResetSelects,
      handleResetCalendar,
      resetFilter,
      handleChangeSelect,
      setOpenPickup,
      setOpenFinished,
      setOpenCreateAt,
      setPaymentSelect,
      setOpenPayment,
      handleSetWithDev,
    },
  };
};
