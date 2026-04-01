import { FC } from 'react';
// import { useJourneys } from './hooks/useJourneys';
import { Outlet } from 'react-router-dom';
import { JourneysTable } from '@/components/JourneysTable/JourneysTable';

export const Journeys: FC = () => {
  // const { data } = useJourneys();
  return (
    <div className="overflow-hidden flex  h-full">
      <div className=" py-2 lg:py-8 px-2 md:px-6 w-full">
        <JourneysTable isJourneyPage={true} />
        <Outlet />
      </div>
    </div>
  );
};
