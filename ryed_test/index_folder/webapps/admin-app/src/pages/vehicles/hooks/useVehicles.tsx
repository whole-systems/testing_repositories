import { useGetAllVehicleQuery } from '@/api/vehicleEndpoints';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export const useVehicles = () => {
  const { data: vehicleData, isLoading, isError } = useGetAllVehicleQuery('');

  const sortVehicleDataByCreate = React.useMemo(() => {
    if (!vehicleData?.length) {
      return [];
    }
    return [...vehicleData].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [vehicleData]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch vehicles.');
    }
  }, [isError]);

  return {
    data: { vehicleData: sortVehicleDataByCreate },
    isLoading,
    isError,
  };
};
