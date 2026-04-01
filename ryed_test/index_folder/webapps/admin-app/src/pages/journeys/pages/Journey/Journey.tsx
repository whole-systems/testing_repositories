import { FC } from 'react';

import { useJourney } from './hooks/useJourney';

import { Separator } from '@ryed/ui/ui/Separator';

import { Outlet } from 'react-router-dom';
import { JourneyDetails } from './components/JourneyDetails/JourneyDetails';
// import { JourneyHeader } from './components/JourneyHeader/JourneyHeader';
import { JourneyMap } from './components/JourneyMap/JourneyMap';
import { JourneyTabs } from './components/JourneyTabs/JourneyTabs';
import { CancelJourneyDialog } from './components/CancelJourneyDialog/CancelJourneyDialog';
import { ETripStatus } from '@/models/journey';
import { getJourneyStatus } from '@/utils/maps/journeyStatusMap';
import { Badge } from '@ryed/ui/ui/Badge';
import { capitalize } from '@mui/material';
import { UpdateStatusDialog } from './components/UpdateStatusDialog/UpdateStatusDialog';
import { AssignJourneyDialog } from './components/AssignJourneyDialog/AssignJourneyDialog';

export const Journey: FC = () => {
  const { data } = useJourney();
  const journeyData = data.journeyData;

  if (!journeyData) {
    return null;
  }

  return (
    <div className="container mx-auto py-4 px-4 md:px-6 lg:px-8 h-full overflow-y-auto">
      {/* <JourneyHeader journeyData={journeyData} /> */}
      <div className="flex justify-between mb-4">
        <Badge
          className="text-lg font-semibold px-4 py-2 mb-4 md:mb-0 mr-4"
          variant={getJourneyStatus(journeyData.status) || 'default'}
        >
          Status:{' '}
          {capitalize(
            getJourneyStatus(journeyData.status) || journeyData.status
          )}
          <UpdateStatusDialog
            status={journeyData.status as ETripStatus}
            journey={journeyData}
          />
        </Badge>
        {data.isJourneyStatusForCancel(journeyData.status as ETripStatus) && (
          <CancelJourneyDialog journeyData={journeyData} />
        )}
        {data.isJourneyStatusForAssign(journeyData.status as ETripStatus) && (
          <AssignJourneyDialog journeyData={journeyData} />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JourneyMap journeyData={journeyData} />

        <JourneyDetails journeyData={journeyData} />
      </div>

      <Separator className="my-6 sm:my-8" />

      <JourneyTabs
        journeyData={journeyData}
        notifications={[]}
        isLoadingNotifications={false}
      />
      <Outlet />
    </div>
  );
};
