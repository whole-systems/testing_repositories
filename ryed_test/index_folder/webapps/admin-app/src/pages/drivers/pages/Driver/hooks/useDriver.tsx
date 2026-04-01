import { useGetDriverByIdQuery } from '@/api/driversEndpoints';
import { useParams } from 'react-router-dom';

export const useDriver = () => {
  const { driverId } = useParams();
  const { data: driverData } = useGetDriverByIdQuery(driverId!, {
    pollingInterval: 1000 * 30,
  });
  console.log(driverData);
  // const { data: vehicleData } = useGetVehicleByIdQuery(vehicleId!);

  return { data: { driverData } };
};
