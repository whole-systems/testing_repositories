import { FC } from 'react';
import { CarModelsTable } from './components/CarModelsTable/CarModelsTable';
import { AddCarModelSheet } from './components/AddCarModelSheet/AddCarModelSheet';
// import { useCarModels } from './hooks/useCarModels';

export const CarModels: FC = () => {
  // useCarModels();
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex justify-end items-center py-4">
        <AddCarModelSheet />
      </div>

      <CarModelsTable />
    </div>
  );
};
