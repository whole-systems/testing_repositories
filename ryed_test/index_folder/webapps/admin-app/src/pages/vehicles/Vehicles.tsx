import { FC } from 'react';
import { useVehicles } from './hooks/useVehicles';
import { VehiclesTable } from './components/VehiclesTable/VehiclesTable';
import { AddVehicleSheet } from './components/AddVehicleSheet/AddVehicleSheet';
import { Card } from '@/components/ui/Card/Card';

export const Vehicles: FC = () => {
  const { data, isLoading } = useVehicles();

  return (
    <div className="h-full flex flex-col w-full p-4">
      <div className="mb-4">
        <div className="flex w-full justify-end items-center space-x-3 mt-2 sm:mt-0">
          <AddVehicleSheet />
        </div>
      </div>
      <Card className="flex h-full w-full flex-col flex-1 overflow-hidden">
        <VehiclesTable
          data={data.vehicleData}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};
