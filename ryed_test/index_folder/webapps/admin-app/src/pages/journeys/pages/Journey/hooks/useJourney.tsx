import {
  // useGetJourneyAvailabilityQuery,
  useGetJourneyQuery,
} from '@/api/journeysEndpoints';
import { ETripStatus } from '@/models/journey';

import { parseGoogleDirections } from '@/utils/parseGoogleDirections';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useJourney = () => {
  const { journeyId } = useParams();

  const { data: journeyData } = useGetJourneyQuery(journeyId!, {
    pollingInterval: 300000,
  });

  const [directions, setDirections] = useState<google.maps.LatLng[] | null>(
    null
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

  const isJourneyStatusForCancel = (status: ETripStatus) => {
    if (
      status === ETripStatus.PENDING ||
      status === ETripStatus.PENDING_DRIVER_ACCEPTANCE ||
      status === ETripStatus.PENDING_SCHEDULED_JOURNEY ||
      status === ETripStatus.SEARCHING_FOR_DRIVER ||
      status === ETripStatus.DRIVER_ON_THE_WAY ||
      status === ETripStatus.DRIVER_AT_PICKUP_SPOT ||
      status === ETripStatus.IN_PROGRESS ||
      status === ETripStatus.PENDING_UPDATE_ACCEPTED
    )
      return true;
    return false;
  };
  const isJourneyStatusForAssign = (status: ETripStatus) => {
    if (
      status === ETripStatus.PENDING ||
      status === ETripStatus.PENDING_SCHEDULED_JOURNEY ||
      status === ETripStatus.PENDING_UPDATE_ACCEPTED ||
      status === ETripStatus.DRIVER_ON_THE_WAY ||
      status === ETripStatus.DRIVER_AT_PICKUP_SPOT ||
      status === ETripStatus.IN_PROGRESS
    )
      return true;
    return false;
  };

  return {
    data: {
      journeyData,
      directions,
      isJourneyStatusForCancel,
      isJourneyStatusForAssign,
    },
    handlers: {},
  };
};
