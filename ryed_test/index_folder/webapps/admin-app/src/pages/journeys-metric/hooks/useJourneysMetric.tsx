import {
  useLazyGetFullScopeJourneyMetricQuery,
  useLazyGetJourneysMetricQuery,
} from '@/api/journeysMetricEndpoints';
import { useCallback, useEffect, useMemo } from 'react';

export const useJourneysMetric = () => {
  // const { data: journeysMetricData } = useGetJourneysMetricQuery('');
  const [getMetricsAPI, { data: journeysMetricData }] =
    useLazyGetJourneysMetricQuery();
  const [getFullScopeJourneyMetricAPI, { data: fullScopeData }] =
    useLazyGetFullScopeJourneyMetricQuery();

  useEffect(() => {
    console.log('count');
    getMetricsAPI({ scope: 'DAILY' });
  }, [getMetricsAPI]);
  const chartData = useMemo(() => {
    return journeysMetricData?.journeyMetrics.map((item) => ({
      id: item.id,
      date: new Date(item.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
      }),
      value: item.sum,
    }));
  }, [journeysMetricData]);

  const summaryData = useMemo(() => {
    return {
      totalTripDistance: journeysMetricData?.totalDistances.toFixed(0) ?? 0,
      totalTripDuration: journeysMetricData?.totalDuration.toFixed(0) ?? 0,
      totalTripPrice: journeysMetricData?.totalPrices.toFixed(0) ?? 0,
    };
  }, [journeysMetricData]);

  const getMetrics = useCallback(
    (scope: string) => {
      getMetricsAPI({ scope });
    },
    [getMetricsAPI]
  );
  const getFullScopeJourneyMetric = useCallback(
    (id: string) => {
      getFullScopeJourneyMetricAPI(id);
    },
    [getFullScopeJourneyMetricAPI]
  );

  return {
    data: { journeysMetricData, chartData, fullScopeData, summaryData },
    handlers: { getMetrics, getFullScopeJourneyMetric },
  };
};
