import { FC } from 'react';
import { useTravelAgency } from './hooks/useTravelAgency';
import { TravelAgentsTable } from './components/TravelAgentsTable/TravelAgentsTable';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { CreateTravelAgentSheet } from './components/CreateTravelAgent/CreateTravelAgentSheet';
import { Badge } from '@ryed-ui/ui/Badge';
import { CopyIcon } from 'lucide-react';
import {
  ImportTravelAgentsDialog
} from '@/pages/travel-agencies/pages/travel-agency/components/ImportTravelAgentsDialog';

const IDS_FOR_HIDE_RESIDENCE_SELECTION = ['cm653j4x600ld14gpom7sl2pg'];
export const TravelAgency: FC = () => {
  const { data } = useTravelAgency();
  return (
    <div className="h-full flex flex-col w-full p-4 overflow-y-auto">
      {IDS_FOR_HIDE_RESIDENCE_SELECTION.includes(data.agencyData?.id || '') && (
        <span className="text-red-500 py-2">
          Residence selection is hidden for this agency in link app.
        </span>
      )}
      <div className="flex flex-1 w-full flex-col">
        <Card className="flex flex-1">
          <CardContent className="w-full">
            <div className="flex justify-between gap-4 w-full">
              <div className="p-4">
                <img
                  className="w-72 h-72 object-fit"
                  src={data.agencyData?.logoUrl}
                  alt=""
                />
                <div className="flex flex-col">
                  <span>{data.agencyData?.name}</span>
                  <span>{data.agencyData?.phoneNumber}</span>
                  <span>{data.agencyData?.supportEmail}</span>
                  <span>{data.agencyData?.status}</span>
                  <span>{data.agencyData?.description}</span>
                </div>
              </div>
              {data.agencyData?.isWebhookCreationEnabled && (
                <div className="p-4">
                  <div>
                    <Badge
                      className="cursor-pointer font-bold text-lg"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          data.agencyData?.inviteLink || ''
                        );
                      }}
                    >
                      Copy invite link
                      <CopyIcon className=" ml-2 w-6 h-6" />
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="my-4 w-full flex justify-end gap-2">
          <ImportTravelAgentsDialog />
          <CreateTravelAgentSheet />
        </div>
      </div>
      <Card className="flex h-full w-full flex-col flex-1 overflow-hidden min-h-[300px]">
        {/* <TravelAgenciesTable
				data={data.travelAgenciesData?.travelAgencies}
				isLoading={data.travelAgenciesIsLoading}
			/> */}
        <TravelAgentsTable
          data={data.agentsData}
          isLoading={data.agentsIsLoading}
        />
      </Card>
    </div>
  );
};
