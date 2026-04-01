import { adminApi } from '..';
import { TravelAgent } from '@/models/travel-agents';

export const travelAgentsEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getTravelAgents: builder.query<TravelAgent[], string>({
      query: (id) => ({
        url: `/admin/${id}/travel-agency-agent`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ id }) => ({ type: 'TRAVEL_AGENTS', id } as const)
              ),
              { type: 'TRAVEL_AGENTS', id: 'LIST' },
            ]
          : [{ type: 'TRAVEL_AGENTS', id: 'LIST' }],
    }),
    getTravelAgentById: builder.query<
      TravelAgent,
      { agencyId: string; travelAgentId: string }
    >({
      query: ({ agencyId, travelAgentId }) => ({
        url: `admin/${agencyId}/travel-agency-agent/${travelAgentId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'TRAVEL_AGENTS', id: 'LIST' },
              { type: 'TRAVEL_AGENTS', id: result.id },
            ]
          : [{ type: 'TRAVEL_AGENTS', id: 'LIST' }],
    }),
    createTravelAgent: builder.mutation({
      query: ({ id, formData }) => ({
        url: `admin/${id}/travel-agency-agent`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: () => [{ type: 'TRAVEL_AGENTS' }],
    }),
    updateTravelAgent: builder.mutation({
      query: ({
        agencyId,
        travelAgentId,
        formData,
      }: {
        agencyId: string;
        travelAgentId: string;
        formData: FormData;
      }) => ({
        url: `admin/${agencyId}/travel-agency-agent/${travelAgentId}`,
        method: 'PUT',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: (_result, _error, { travelAgentId }) => [
        { type: 'TRAVEL_AGENTS', id: 'LIST' },
        { type: 'TRAVEL_AGENTS', id: travelAgentId },
      ],
    }),
    deleteTravelAgent: builder.mutation({
      query: ({ agencyId, travelAgentId }) => ({
        url: `admin/${agencyId}/travel-agency-agent/${travelAgentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { travelAgentId }) => [
        { type: 'TRAVEL_AGENTS', id: 'LIST' },
        { type: 'TRAVEL_AGENTS', id: travelAgentId },
      ],
    }),  
    resetTravelAgentPassword: builder.mutation({
      query: ({ agencyId, travelAgentId }) => ({
        url: `admin/${agencyId}/travel-agency-agent/${travelAgentId}/reset-password`,
        method: 'GET',
      })
    }),
    batchImportTravelAgents: builder.mutation({
      query: ({ agencyId, file }: { agencyId: string; file: File }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `admin/${agencyId}/travel-agency-agent/batch-import`,
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: () => [{ type: 'TRAVEL_AGENTS', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTravelAgentsQuery,
  useCreateTravelAgentMutation,
  useUpdateTravelAgentMutation,
  useGetTravelAgentByIdQuery,
  useDeleteTravelAgentMutation,
  useResetTravelAgentPasswordMutation,
  useBatchImportTravelAgentsMutation,
} = travelAgentsEndPoints;
