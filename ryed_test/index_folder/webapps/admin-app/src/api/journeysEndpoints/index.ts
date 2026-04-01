import {
  ETripStatus,
  FilterJournyes,
  PricingDTO,
  PricingResponse,
  TJourney,
  TJourneysData,
  TravelAgency,
} from '@/models/journey';
import { adminApi } from '..';
import { TDriver } from '@/models/driver';
import { Vehicle } from '@/models/vehicle/vehicle';
import { Dispatcher } from '@/models/dispatchers';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

export const journeysEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getJourneys: builder.query<TJourneysData, FilterJournyes>({
      query: ({
        page,
        limit,
        driverId,
        status,
        createdAtTo,
        createdAtFrom,
        pickupTimeFrom,
        pickupTimeTo,
        finishedTimeTo,
        finishedTimeFrom,
        vehicleDriverId,
        vehicleId,
        userId,
        orderBy,
        travelAgencyIds,
        dispatcherIds,
        readableId,
        withDev,
        withPayment,
      }) => ({
        url: `/admin/journeys`,
        params: {
          page,
          limit,
          ...(createdAtFrom ? { createdAtFrom } : {}),
          ...(createdAtTo ? { createdAtTo } : {}),
          ...(pickupTimeFrom ? { pickupTimeFrom } : {}),
          ...(pickupTimeTo ? { pickupTimeTo } : {}),
          ...(finishedTimeFrom ? { finishedTimeFrom } : {}),
          ...(finishedTimeTo ? { finishedTimeTo } : {}),
          ...(driverId ? { vehicleDriverId: driverId } : {}),
          ...(status
            ? { status }
            : {
                status:
                  'in-progress,pending,future,finished,cancelled,archived',
              }),
          ...(vehicleDriverId ? { vehicleDriverId } : {}),
          ...(vehicleId ? { vehicleId } : {}),
          ...(userId ? { userId } : {}),
          ...(orderBy ? { orderBy } : {}),
          ...(travelAgencyIds ? { travelAgencyIds } : {}),
          ...(dispatcherIds ? { dispatcherIds } : {}),
          ...(readableId ? { readableId } : {}),
          ...(withDev ? { withDev } : {}),
          ...(withPayment ? { withPayment } : {}),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.journeys.map(
                ({ id }) => ({ type: 'JOURNEY', id } as const)
              ),
              { type: 'JOURNEY', id: 'LIST' },
            ]
          : [{ type: 'JOURNEY', id: 'LIST' }],
    }),
    getJourney: builder.query<TJourney, string>({
      query: (id) => ({
        url: `admin/journeys/${id}`,
      }),
      providesTags: (_result, _error, journeyId) => [
        { type: 'JOURNEY', journeyId },
      ],
    }),
    getJourneyAvailability: builder.query<
      { availableDrivers: TDriver[]; availableVehicles: Vehicle[] },
      string
    >({
      query: (id) => ({
        url: `admin/journey/${id}/availability`,
      }),
    }),
    getDataForFilter: builder.query({
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const driversResponse = await fetchWithBQ({
          url: '/admin/drivers',
        });
        const dispatchersResponse = await fetchWithBQ({
          url: 'admin/dispatcher?status=ACTIVE',
        });
        const travelAgenciesResponse = await fetchWithBQ({
          url: 'admin/travel-agency',
        });

        const combinedData = {
          drivers: (driversResponse.data as TDriver[]) ?? [],
          dispatchers: (dispatchersResponse.data as Dispatcher[]) ?? [],
          travelAgencies:
            (travelAgenciesResponse.data as { travelAgencies: TravelAgency[] })
              ?.travelAgencies ?? [],
        };
        return { data: combinedData };
      },
    }),
    getJourneysExportCSV: builder.query<string, FilterJournyes>({
      query: ({
        page,
        limit,
        driverId,
        status,
        createdAtTo,
        createdAtFrom,
        pickupTimeFrom,
        pickupTimeTo,
        finishedTimeTo,
        finishedTimeFrom,
        vehicleDriverId,
        vehicleId,
        userId,
        orderBy,
        withDev,
      }) => ({
        url: `/admin/journeys/journeys/csv-export`,
        method: 'GET',
        params: {
          page,
          limit,
          withDev,
          ...(createdAtFrom ? { createdAtFrom } : {}),
          ...(createdAtTo ? { createdAtTo } : {}),
          ...(pickupTimeFrom ? { pickupTimeFrom } : {}),
          ...(pickupTimeTo ? { pickupTimeTo } : {}),
          ...(finishedTimeFrom ? { finishedTimeFrom } : {}),
          ...(finishedTimeTo ? { finishedTimeTo } : {}),
          ...(driverId ? { vehicleDriverId: driverId } : {}),
          ...(status ? { status } : {}),
          ...(vehicleDriverId ? { vehicleDriverId } : {}),
          ...(vehicleId ? { vehicleId } : {}),
          ...(userId ? { userId } : {}),
          ...(orderBy ? { orderBy } : {}),
        },
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const blob = new Blob([data], { type: 'text/csv' });

          saveAs(blob, `journeys-${format(new Date(), 'yyyy-MM-dd')}.csv`);
        } catch (error) {
          console.error('Error downloading CSV:', error);
        }
      },
    }),
    cancelJourney: builder.mutation<
      unknown,
      { reason: string; journeyId: string }
    >({
      query: ({ reason, journeyId }) => {
        return {
          url: `/admin/journeys/${journeyId}/cancel`,
          method: 'PUT',
          data: { reason },
        };
      },
      invalidatesTags: (_result, _error, { journeyId }) => [
        { type: 'JOURNEY', journeyId },
      ],
    }),
    updateJourneyStatus: builder.mutation<
      unknown,
      { journeyId: string; status: ETripStatus }
    >({
      query: ({ journeyId, status }) => ({
        url: `/admin/journeys/${journeyId}/status`,
        method: 'PATCH',
        data: { status },
      }),
      invalidatesTags: (_result, _error, { journeyId }) => [
        { type: 'JOURNEY', journeyId },
      ],
    }),
    assignDispatcherToJourney: builder.mutation<
      unknown,
      { journeyId: string; dispatcherId: string }
    >({
      query: ({ journeyId, dispatcherId }) => ({
        url: `/admin/journeys/${journeyId}/dispatcher-approve`,
        method: 'PUT',
        data: { dispatcherId },
      }),
      invalidatesTags: (_result, _error, { journeyId }) => [
        { type: 'JOURNEY', journeyId },
      ],
    }),
    assignDriverToJourney: builder.mutation<
      unknown,
      {
        journeyId: string;
        vehicleDriverId: string;
        vehicleId: string;
        price: number;
        currencyCode: string;
      }
    >({
      query: ({
        journeyId,
        vehicleDriverId,
        vehicleId,
        price,
        currencyCode,
      }) => ({
        url: `/admin/journeys/${journeyId}/assign`,
        method: 'PUT',
        data: { vehicleDriverId, vehicleId, price, currencyCode },
      }),
      invalidatesTags: (_result, _error, { journeyId }) => [
        { type: 'JOURNEY', journeyId },
      ],
    }),
    reassignDriverToJourney: builder.mutation<
      unknown,
      {
        journeyId: string;
        vehicleDriverId: string;
        vehicleId: string;
        price: number;
        currencyCode: string;
      }
    >({
      query: ({
        journeyId,
        vehicleDriverId,
        vehicleId,
        price,
        currencyCode,
      }) => ({
        url: `/admin/journeys/${journeyId}/re-assign`,
        method: 'PUT',
        data: { vehicleDriverId, vehicleId, price, currencyCode },
      }),
      invalidatesTags: (_result, _error, { journeyId }) => [
        { type: 'JOURNEY', journeyId },
      ],
    }),
    updateJourneyPrice: builder.mutation<
      TJourney,
      { journeyId: string; newPrice: number }
    >({
      query: ({ journeyId, newPrice }) => ({
        url: `/admin/journeys/${journeyId}/price`,
        method: 'PATCH',
        data: { newPrice },
      }),
      invalidatesTags: (_result, _error, { journeyId }) => [
        { type: 'JOURNEY', journeyId },
      ],
    }),
    getPrice: builder.mutation<
      PricingResponse,
      { data: PricingDTO; dispatcherId: string }
    >({
      query: ({ data, dispatcherId }) => ({
        url: `/pricing/admin/dispatcher/${dispatcherId}`,
        method: 'PUT',
        data: { ...data },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetJourneysQuery,
  useLazyGetJourneysQuery,
  useGetJourneyQuery,
  useGetJourneyAvailabilityQuery,
  useGetDataForFilterQuery,
  useLazyGetJourneysExportCSVQuery,
  useCancelJourneyMutation,
  useUpdateJourneyStatusMutation,
  useAssignDispatcherToJourneyMutation,
  useAssignDriverToJourneyMutation,
  useReassignDriverToJourneyMutation,
  useUpdateJourneyPriceMutation,
  useGetPriceMutation,
} = journeysEndPoints;
