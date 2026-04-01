import { useGetDriversQuery } from '@/api/driversEndpoints';
import { parsePoint } from '@/utils/parsePoint/parsePoint';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

interface MarkerData {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

export const DriverStatusRegistry = {
  all: null,
  pending: 'ONBOARDING_PENDING_APPROVAL',
  available: 'AVAILABLE',
  ['in-drive']: 'IN_DRIVE,ON_THE_WAY,IN_SCHEDULE',
  onboarding: 'ONBOARDING_IN_PROGRESS,APP_ONBOARDING,ONBOARDING_REJECTED',
};

export const useDrivers = () => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({});
  const filterStatusKey = searchParams.get('status');
  const [dispatcherComboboxOpen, setDispatcherComboboxOpen] = useState(false);
  const [dispatcherComboboxValue, setDispatcherComboboxValue] = useState('');

  useEffect(() => {
    const filterStatus =
      filterStatusKey &&
      DriverStatusRegistry[
        filterStatusKey as keyof typeof DriverStatusRegistry
      ];
    setQueryParams(filterStatus ? { status: filterStatus } : {});
  }, [filterStatusKey]);

  const {
    data: driversData,
    isError,
    isLoading,
    isFetching,
  } = useGetDriversQuery(queryParams, {
    pollingInterval: 1000 * 30,
  });

  const markers = useMemo(
    () =>
      driversData?.reduce((acc, item) => {
        if (item.location) {
          acc.push({
            id: item.id,
            ...parsePoint(item.location ?? '')!,
            label: item.fullName,
          });
        }
        return acc;
      }, [] as MarkerData[]) ?? [],
    [driversData]
  );

  const tableData = useMemo(() => {
    if (dispatcherComboboxValue) {
      return (
        driversData
          ?.filter((item) => item.dispatcher.id === dispatcherComboboxValue)
          .map((item) => ({
            id: item.id,
            dispatcher: item.dispatcher.companyName,
            phoneNumber: item.phoneNumber,
            fullName: item.fullName,
            status: item.status,
          })) ?? []
      );
    }
    return (
      driversData?.map((item) => ({
        id: item.id,
        dispatcher: item.dispatcher.companyName,
        phoneNumber: item.phoneNumber,
        fullName: item.fullName,
        status: item.status,
      })) ?? []
    );
  }, [driversData, dispatcherComboboxValue]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load drivers list.');
    }
  }, [isError]);

  const dispatcherComboboxOptions = useMemo(() => {
    const allDispatchers = driversData
      ?.map((item) => ({
        id: item.dispatcher.id,
        companyName: item.dispatcher.companyName,
      }))
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
      );

    return (
      allDispatchers?.map((item) => ({
        value: item.id,
        label: item.companyName,
      })) ?? []
    );
  }, [driversData]);

  return {
    data: {
      driversData: driversData,
      tableData,
      markers,
      selectedMarker,
      dispatcherComboboxOpen,
      dispatcherComboboxOptions,
      dispatcherComboboxValue,
    },
    handlers: {
      setSelectedMarker,
      setDispatcherComboboxOpen,
      setDispatcherComboboxValue,
    },
    isLoading,
    isFetching,
    isError,
  };
};
