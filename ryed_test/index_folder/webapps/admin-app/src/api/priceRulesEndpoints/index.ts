import { TravelAgenciesGet, TravelAgency } from '@/models/travel-agencies';
import { adminApi } from '..';
import { Dispatcher } from '@/models/dispatchers';
import { TravelAgent } from '@/models/travel-agents';
import { Region, SupportedCountry } from '@/models/regions';
import {
  CreatePriceRuleDTO,
  EditPriceRuleDTO,
  PriceRule,
} from '@/models/price-rules';

export const priceRulesEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getDispatchers: builder.query<Dispatcher[], void>({
      query: () => {
        return {
          url: 'admin/dispatcher',
          method: 'GET',
        };
      },
      transformResponse: (response: Dispatcher[]) => {
        return response.map((dispatcher) => dispatcher);
      },
    }),
    getAgencies: builder.query<TravelAgency[], void>({
      query: () => {
        return {
          url: 'admin/travel-agency',
          method: 'GET',
        };
      },
      transformResponse: (response: TravelAgenciesGet) => {
        return response.travelAgencies.map((travelAgency) => travelAgency);
      },
    }),
    getAgents: builder.query<TravelAgent[], string>({
      query: (agencyId) => {
        return {
          url: `admin/${agencyId}/travel-agency-agent`,
          method: 'GET',
        };
      },
      transformResponse: (response: TravelAgent[]) => {
        return response.map((agent) => agent);
      },
    }),
    getSupportedCountries: builder.query<SupportedCountry[], void>({
      query: () => {
        return {
          url: '/admin/supported-region/supported-countries',
          method: 'GET',
        };
      },
    }),
    getSupportedRegions: builder.query<Region[], string>({
      query: (countryCode) => {
        return {
          url: `/admin/supported-region`,
          method: 'GET',
          params: {
            countryCode,
          },
        };
      },
    }),
    getPriceRules: builder.query<PriceRule[], void>({
      query: () => {
        return {
          url: '/admin/pricing-rules',
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'GET_PRICE_RULES' as const,
                id,
              })),
              { type: 'GET_PRICE_RULES', id: 'LIST' },
            ]
          : [{ type: 'GET_PRICE_RULES', id: 'LIST' }],
    }),
    createPriceRule: builder.mutation<unknown, CreatePriceRuleDTO>({
      query: (priceRule) => {
        return {
          url: '/admin/pricing-rules',
          method: 'POST',
          data: priceRule,
        };
      },
      invalidatesTags: [{ type: 'GET_PRICE_RULES', id: 'LIST' }],
    }),
    getPriceRule: builder.query<PriceRule, string>({
      query: (priceRuleId) => {
        return {
          url: `/admin/pricing-rules/${priceRuleId}`,
          method: 'GET',
        };
      },
      providesTags: ['GET_PRICE_RULE'],
    }),
    getPriceRulesByBatchId: builder.query<PriceRule, string>({
      query: (priceRuleBatchId) => {
        return {
          url: `/admin/pricing-rules/by-batchId/${priceRuleBatchId}`,
          method: 'GET',
        };
      },
      providesTags: [{ type: 'GET_PRICE_RULES', id: 'LIST' }],
    }),
    deletePriceRule: builder.mutation<void, string>({
      query: (priceRuleId) => {
        return {
          url: `/admin/pricing-rules/${priceRuleId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'GET_PRICE_RULES', id: 'LIST' }],
    }),
    editPriceRule: builder.mutation<
      unknown,
      { id: string; data: EditPriceRuleDTO }
    >({
      query: ({ id, data }) => {
        return {
          url: `/admin/pricing-rules/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: [
        'GET_PRICE_RULE',
        { type: 'GET_PRICE_RULES', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetDispatchersQuery,
  useLazyGetAgenciesQuery,
  useLazyGetAgentsQuery,
  useLazyGetSupportedCountriesQuery,
  useLazyGetSupportedRegionsQuery,
  useCreatePriceRuleMutation,
  useGetPriceRulesQuery,
  useGetPriceRuleQuery,
  useGetPriceRulesByBatchIdQuery,
  useDeletePriceRuleMutation,
  useEditPriceRuleMutation,
} = priceRulesEndPoints;
