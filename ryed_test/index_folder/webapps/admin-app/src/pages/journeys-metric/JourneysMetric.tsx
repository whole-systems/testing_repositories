import { FC, useCallback } from 'react';
import { useJourneysMetric } from './hooks/useJourneysMetric';
// import { MainMetricsTable } from './components/MainMetricsTable/MainMetricsTable';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/Tabs/Tabs';
import { Card } from '@/components/ui/Card/Card';
import { DriverMetricsTable } from './components/DriverMetricsTable/DriverMetricsTable';
import { VehicleMetricsTable } from './components/VehicleMetricTable/VehicleMetricsTable';
import { DollarSign, Hourglass, Route } from 'lucide-react';
import { requestNotificationPermission } from '@/hooks/usePushNotifications.ts';

export const JourneysMetric: FC = () => {
  const { data, handlers } = useJourneysMetric();
  requestNotificationPermission();

  const renderSummaryCards = useCallback(() => {
    const cards = [
      {
        name: 'Total Trip Price',
        value: data.summaryData.totalTripPrice,
        text: '$',
        icon: <DollarSign />,
      },

      {
        name: 'Total Trip Duration',
        value: data.summaryData.totalTripDuration,
        text: 'Hours',
        icon: <Hourglass />,
      },
      {
        name: 'Total Trip Distance',
        value: data.summaryData.totalTripDistance,
        text: 'KM',
        icon: <Route />,
      },
    ];
    return cards.map((item) => (
      <Card className="p-4 w-1/3 m-2 flex-col flex" key={item.name}>
        <div className="flex justify-between">
          <span>{item.name}:</span>
          {item.icon}
        </div>
        <span className="font-bold">{`${item.text} ${item.value}`}</span>
      </Card>
    ));
  }, [data.summaryData]);
  const renderTabs = useCallback(() => {
    const tabs = ['DAILY', 'WEEKLY', 'MONTHLY'];

    return tabs.map((item) => (
      <TabsContent className="flex flex-1" key={item} value={item}>
        <Card className="p-4 lg:h-2/3 w-full">
          <ResponsiveContainer height={'100%'}>
            <BarChart
              onClick={(e) =>
                handlers.getFullScopeJourneyMetric(
                  e.activePayload![0].payload.id
                )
              }
              width={50}
              height={40}
              data={data.chartData}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip contentStyle={{ color: '#000' }} />
              <Bar dataKey="value" fill="#fff" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </TabsContent>
    ));
  }, [data.chartData, handlers]);
  return (
    <div className=" py-2 lg:py-8 px-2 md:px-6 h-full w-full">
      <div className="flex h-full w-full flex-col">
        <div className="flex h-34">{renderSummaryCards()}</div>
        <div className="flex h-5/6 flex-col lg:flex-row">
          <div className=" flex h-full  w-full lg:w-1/2 m-2">
            <Tabs
              onValueChange={(value) => handlers.getMetrics(value)}
              defaultValue="DAILY"
              className="w-full flex flex-col"
            >
              <TabsList className="flex w-fit">
                <TabsTrigger value="DAILY">Daily</TabsTrigger>
                <TabsTrigger value="WEEKLY">Weekly</TabsTrigger>
                <TabsTrigger value="MONTHLY">Monthly</TabsTrigger>
              </TabsList>
              {renderTabs()}
            </Tabs>
            {/* <MainMetricsTable metricsData={data.journeysMetricData ?? []} /> */}
          </div>
          <div className=" flex w-full h-full lg:w-1/2 m-2 flex-col">
            <Card className="p-4 w-full flex h-1/3 ">
              <DriverMetricsTable
                driverMetricsData={data.fullScopeData?.vehicleDriverId ?? []}
              />
            </Card>
            <Card className="p-4 w-full mt-4 flex h-1/3 ">
              <VehicleMetricsTable
                vehicleMetricsData={data.fullScopeData?.vehicleMetrics ?? []}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
