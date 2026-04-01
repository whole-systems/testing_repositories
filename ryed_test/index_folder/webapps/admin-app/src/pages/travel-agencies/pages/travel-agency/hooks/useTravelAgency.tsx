import { useGetTravelAgencyQuery } from '@/api/travelAgenciesEndpoints';
import { useGetTravelAgentsQuery } from '@/api/travelAgentsEndpoints';
import { useParams } from 'react-router-dom';

export const useTravelAgency = () => {
  const { agencyId } = useParams();
  const { data: agencyData } = useGetTravelAgencyQuery(agencyId!);
  const { data: agentsData, isLoading: agentsIsLoading } =
    useGetTravelAgentsQuery(agencyId!);

  return {
    data: {
      agencyData,
      agentsData,
      agentsIsLoading,
    },
  };
};
