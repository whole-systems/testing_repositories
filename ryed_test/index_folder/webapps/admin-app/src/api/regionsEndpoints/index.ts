import {
  AllSupportedRegionsDTO,
  Region,
  RegionDTO,
  regionPricingDTO,
  SupportedCountry,
  SupportedCountryPricingDTO,
  SupportedCountryPricing,
} from '@/models/regions';
import { adminApi } from '..';
import { VehicleType } from '@/models/vehicle/vehicle';

export const regionsEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupportedCountries: builder.query<SupportedCountry[], void>({
      query: () => ({
        url: `admin/supported-region/supported-countries`,
        method: 'GET',
      }),
    }),
    getAllRegions: builder.query<Region[], AllSupportedRegionsDTO>({
      query: (data) => ({
        url: `admin/supported-region`,
        method: 'GET',
        params: { ...data },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'REGIONS' as const, id })),
              { type: 'REGIONS', id: 'LIST' },
            ]
          : [{ type: 'REGIONS', id: 'LIST' }],
    }),
    getRegion: builder.query<
      Region[],
      {
        id: string;
        vehicleType?: VehicleType;
      }
    >({
      query: ({ vehicleType, id }) => ({
        url: `admin/supported-region/${id}`,
        method: 'GET',
        params: { vehicleType },
      }),
    }),
    createRegion: builder.mutation<
      unknown,
      { countryId: string; data: RegionDTO }
    >({
      query: ({ countryId, data }) => ({
        url: `admin/supported-region/${countryId}`,
        method: 'POST',
        data,
      }),
    }),
    setRegionPricing: builder.mutation<
      unknown,
      {
        fromSupportedRegionId: string;
        data: { supportedRegionPricings: regionPricingDTO[] };
      }
    >({
      query: ({ fromSupportedRegionId, data }) => ({
        url: `admin/supported-region-pricing`,
        method: 'POST',
        params: { fromSupportedRegionId },
        data,
      }),
      invalidatesTags: [{ type: 'REGIONS', id: 'LIST' }],
    }),
    updateRegionPricing: builder.mutation<
      unknown,
      {
        pricingId: string;
        data: {
          supportedRegionPricings: {
            priceLocal: number;
            id: string;
            currency: string;
          }[];
        };
      }
    >({
      query: ({ data }) => ({
        url: `admin/supported-region-pricing`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{ type: 'REGIONS', id: 'LIST' }],
    }),
    deleteRegionPricing: builder.mutation<
      unknown,
      {
        pricingId: string;
      }
    >({
      query: ({ pricingId }) => ({
        url: `admin/supported-region-pricing/${pricingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'REGIONS', id: 'LIST' }],
    }),
    deleteRegion: builder.mutation<unknown, { id: string }>({
      query: ({ id }) => ({
        url: `admin/supported-region/${id}`,
        method: 'DELETE',
      }),
    }),
    updateRegion: builder.mutation<unknown, { id: string; data: RegionDTO }>({
      query: ({ id, data }) => ({
        url: `admin/supported-region/${id}`,
        method: 'PUT',
        data,
      }),
    }),
    getCountryPricing: builder.query<SupportedCountryPricing[], string>({
      query: (countryId) => ({
        url: `/admin/supported-country-pricing/${countryId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, countryId) => [
        { type: 'COUNTRY_PRICING', id: countryId },
      ],
    }),
    setCountryPricing: builder.mutation<void, SupportedCountryPricingDTO[]>({
      query: (data) => ({
        url: `/admin/supported-country-pricing/`,
        method: 'POST',
        data: { supportedCountryPricings: data },
      }),
    }),
    updateCountryPricing: builder.mutation<
      void,
      {
        pricingId: string;
        data: { tripPricePerKm: number; tripPricePerMinute: number };
      }
    >({
      query: ({ pricingId, data }) => ({
        url: `admin/supported-country-pricing/${pricingId}`,
        method: 'PUT',
        data: data,
      }),
    }),
    updateCountryCurrency: builder.mutation<
      unknown,
      { supportedCountryId: string; data: { currency: string } }
    >({
      query: ({ supportedCountryId, data }) => ({
        url: `admin/supported-country-pricing/currency/${supportedCountryId}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (_result, _error, { supportedCountryId }) => [
        { type: 'COUNTRY_PRICING', id: supportedCountryId },
      ],
    }),
    getPolygon: builder.query<
      { polygonLines: number[][]; bufferedPolygon: number[][] },
      { query: string; meterRadiosBuffer: number }
    >({
      query: ({ query, meterRadiosBuffer }) => ({
        url: `/admin/osm`,
        method: 'GET',
        params: { query, meterRadiosBuffer },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllRegionsQuery,
  useLazyGetAllRegionsQuery,
  useCreateRegionMutation,
  useGetRegionQuery,
  useGetSupportedCountriesQuery,
  useSetRegionPricingMutation,
  useUpdateRegionPricingMutation,
  useDeleteRegionMutation,
  useUpdateRegionMutation,
  useGetCountryPricingQuery,
  useSetCountryPricingMutation,
  useUpdateCountryPricingMutation,
  useUpdateCountryCurrencyMutation,
  useLazyGetPolygonQuery,
  useDeleteRegionPricingMutation,
} = regionsEndPoints;
