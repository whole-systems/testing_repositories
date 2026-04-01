import { useEffect, useState } from 'react';
// import { getJourneyStatus } from '@/utils/maps/journeyStatusMap';
import { useMemo } from 'react';
import { parseGoogleDirections } from '@/utils/parseGoogleDirections';
import { TJourney } from '@/models/journey';

export const useJourneyMap = ({ journeyData }: { journeyData: TJourney }) => {
  // const { data: activeRoute } = useGetActiveRouteQuery(journeyData.id!, {
  //   pollingInterval: 10000,
  //   skip: getJourneyStatus(journeyData?.status || '') !== 'in-progress',
  // });

  // const activeDirections = useMemo(() => {
  //   if (!activeRoute?.route) return null;
  //   const decodedPath = google.maps.geometry.encoding.decodePath(
  //     activeRoute?.route
  //   );
  //   return decodedPath;
  // }, [activeRoute]);
  const [directions, setDirections] = useState<google.maps.LatLng[] | null>(
    null
  );

  const waypoints = useMemo(
    () =>
      journeyData?.metadata.routeDetails
        ? journeyData?.metadata.routeDetails?.stops
        : [],
    [journeyData]
  );

  useEffect(() => {
    const getRoute = async () => {
      if (journeyData) {
        if (journeyData.metadata.routeDetails?.polyline) {
          const decodedPath = google.maps.geometry.encoding.decodePath(
            journeyData.metadata.routeDetails.polyline
          );
          setDirections(decodedPath);
        } else {
          const fromLatLng = {
            lat: journeyData.fromLatLang.latitude,
            lng: journeyData.fromLatLang.longitude,
          };
          const toLatLng = {
            lat: journeyData.toLatLang.latitude,
            lng: journeyData.toLatLang.longitude,
          };
          const points = await parseGoogleDirections(fromLatLng, toLatLng);
          setDirections(points);
        }
      }
    };
    getRoute();
  }, [journeyData]);
  return {
    data: {
      // activeDirections,
      directions,
      waypoints,
      // activeRoute,
    },
  };
};
