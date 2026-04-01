import { FC } from 'react';
import { ServicesTable } from './components/ServicesTable/ServicesTable';
import { useJourneyServices } from './hooks/useJourneyServices';
import { Service } from '@/models/journey-services';
import { CreateServiceSheet } from './components/CreateServiceSheet/CreateServiceSheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/Select';
import { Card } from '@ryed/ui/ui/Card';

export const JourneyServices: FC = () => {
  const { data, handlers } = useJourneyServices();
  const { journeyServicesData, journeyServicesIsLoading } = data;
  return (
    <div className="h-full flex flex-col w-full overflow-y-auto pb-4">
      <div className="m-4">
        <div className="flex w-full justify-between items-center space-x-3 mt-2 sm:mt-0">
          <div className="flex flex-row gap-2 shrink-0">
            <Select
              onValueChange={(value) => handlers.setActiveCountryId(value)}
              value={data.activeCountryId || ''}
            >
              <SelectTrigger className="w-full min-w-40">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {data.supportedCountries?.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <Select
              onValueChange={(value) => handlers.setActiveLanguage(value)}
              value={data.activeLanguage || ''}
            >
              <SelectTrigger className="w-full min-w-40">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {data.languages.map((language) => (
                  <SelectItem key={language.id} value={language.id}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
          <CreateServiceSheet />
        </div>
      </div>
      <Card className="mx-4">
        <div className="flex h-full w-full flex-col flex-1 overflow-hidden">
          <ServicesTable
            data={journeyServicesData as Service[]}
            isLoading={journeyServicesIsLoading}
            refetch={handlers.getServices}
          />
        </div>
      </Card>
    </div>
  );
};
