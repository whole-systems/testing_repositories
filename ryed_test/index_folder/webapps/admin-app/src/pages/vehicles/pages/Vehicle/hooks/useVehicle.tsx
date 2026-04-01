import { useGetVehicleByIdQuery } from '@/api/vehicleEndpoints';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const useVehicle = () => {
  const { vehicleId } = useParams();
  const {
    data: vehicleData,
    isError,
    isLoading,
  } = useGetVehicleByIdQuery(vehicleId!);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load vehicle information.');
    }
  }, [isError]);

  return { data: { vehicleData }, isError, isLoading };
};
