import { FC } from 'react';
import { useTravelAgencies } from './hooks/useTravelAgencies';
import { TravelAgenciesTable } from './components/TravelAgenciesTable/TravelAgenciesTable';
import { CreateTravelAgencySheet } from './components/CreateTravelAgencySheet/CreateTravelAgencySheet';
import { Card } from '@/components/ui/Card/Card';



export const TravelAgencies: FC = () => {
  const { data } = useTravelAgencies();


 
  
  
  return (
    <div className="h-full flex flex-col w-full p-4">
      <div className=" mb-4">
        <div className="flex w-full justify-end items-center space-x-3 mt-2 sm:mt-0">
          <CreateTravelAgencySheet />
        </div>
      </div>
      <Card className="flex h-full w-full flex-col flex-1 overflow-hidden">
        <TravelAgenciesTable
          data={data.travelAgenciesData?.travelAgencies}
          isLoading={data.travelAgenciesIsLoading}
        />
      </Card>
    
    </div>
  );
};
