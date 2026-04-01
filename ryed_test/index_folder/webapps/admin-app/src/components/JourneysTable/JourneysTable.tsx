import { FC } from 'react';
// import { useJourneys } from './hooks/useJourneys';
import {
  Tabs,
  // TabsContent,
  TabsList,
  TabsTrigger,
} from '@ryed/ui/ui/Tabs';
// import { PendingJourneysTable } from './components/PendingJourneysTable/PendingJourneysTable';

// import { DatePickerWithRange } from '@ryed/ui/ui/DatePickerWithRange/DatePickerWithRange.tsx';
import { FilterSheet } from '@/pages/journeys/components/FilterSheet/FilterSheet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { TableWrapper } from './components/Table/Table';
import { useJourneysTable } from './hooks/useJourneyTable';
import { DownloadIcon } from 'lucide-react';
import { EllipsisIcon } from 'lucide-react';
import { Button } from '@ryed-ui/ui/Button';
import { SearchByReadableId } from '@/pages/journeys/components/SearchByReadableId/SearchByReadableId';
interface Props {
  isJourneyPage: boolean;
  typeOfPage?: 'driver' | 'vehicle';
}

export const JourneysTable: FC<Props> = ({ isJourneyPage, typeOfPage }) => {
  const { data, handlers } = useJourneysTable(isJourneyPage);
  const { t } = useTranslation();
  return (
    <div className={`h-full flex flex-col`}>
      <Tabs
        onValueChange={handlers.handleChangeTab}
        defaultValue={data.searchParams.status || 'journeys'}
        className="h-full flex flex-col"
      >
        <div className=" flex-col-reverse sm:flex-row  flex justify-between sm:items-center mb-4 min-h-24">
          <TabsList className="flex w-30">
            <TabsTrigger value="journeys">
              {t('journeys:journeysTable.triggers.journeys')}
            </TabsTrigger>
            {/* <TabsTrigger value={isJourneyPage ? 'pending' : 'future'}>
              {isJourneyPage
                ? t('journeys:journeysTable.triggers.pendingJourneys')
                : t('journeys:journeysTable.triggers.futureJourneys')}
            </TabsTrigger> */}
          </TabsList>

          <div className="m-2">
            <div className="flex items-center space-x-3 mt-2 sm:mt-0">
              <SearchByReadableId
                getData={handlers.getTableData}
                quaryStateParams={data.quaryStateParams}
              />
              <FilterSheet
                handleConfirmFilter={handlers.setParamsFromFilter}
                searchParams={data.searchParams}
                typeOfPage={typeOfPage}
              />
              <Button
                disabled={data.isExportCSVFetching}
                onClick={handlers.handleExportCSV}
              >
                <div className="flex">
                  {data.isExportCSVFetching ? (
                    <EllipsisIcon size={20} />
                  ) : (
                    <DownloadIcon size={20} />
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col flex-1 overflow-hidden">
          <TableWrapper
            data={data.journeyData}
            isLoading={data.isLoading}
            params={data.searchParams}
            setParams={handlers.setSearchQueryParams}
            isResetTable={data.isResetTable}
            setIsResetTable={handlers.setIsResetTable}
            isJourneyPage={isJourneyPage}
          />
        </div>
      </Tabs>
      <Outlet />
    </div>
  );
};
