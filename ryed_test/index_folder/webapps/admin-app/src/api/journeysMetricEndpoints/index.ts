import {
  TFullScopeJourneyMetric,
  TJourneyMetricDTO,
} from '@/models/journeyMetric';
import { adminApi } from '..';

export const journeysMetricEndpoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getJourneysMetric: builder.query<TJourneyMetricDTO, { scope: string }>({
      query: ({ scope }) => ({
        url: `admin/journey-metric`,
        params: { scope },
      }),
    }),
    getFullScopeJourneyMetric: builder.query<TFullScopeJourneyMetric, string>({
      query: (id) => ({
        url: `admin/journey-metric/${id}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetJourneysMetricQuery,
  useLazyGetJourneysMetricQuery,
  useLazyGetFullScopeJourneyMetricQuery,
} = journeysMetricEndpoints;
