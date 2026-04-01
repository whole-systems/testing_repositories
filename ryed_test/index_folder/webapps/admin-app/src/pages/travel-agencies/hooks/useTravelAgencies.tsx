import { useGetTravelAgenciesQuery } from '@/api/travelAgenciesEndpoints';

export const useTravelAgencies = () => {
  const { data: travelAgenciesData, isLoading: travelAgenciesIsLoading } =
    useGetTravelAgenciesQuery('');

  return {
    data: { travelAgenciesData, travelAgenciesIsLoading },
  };
};
