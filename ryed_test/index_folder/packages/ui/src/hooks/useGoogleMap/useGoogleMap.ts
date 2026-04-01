import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ILocation } from '../useLocationSelect';
import { IWaypoint } from './types';
import { getDirections } from './utils';

interface IUseGoogleMapParams {
  from?: ILocation | null;
  to?: ILocation | null;
  waypoints?: IWaypoint[] | null;
}

export const useGoogleMap = ({ from, to, waypoints }: IUseGoogleMapParams) => {
  const service = useMemo(() => new google.maps.DirectionsService(), []);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (from && to) {
      getDirections({ from, to, waypoints, service })
        .then(setDirections)
        .catch(() => {
          toast.error('Failed to load directions');
        });
    }
  }, [from, to, waypoints, service]);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend({ lat: 33.3966, lng: 35.5725 });
    bounds.extend({ lat: 29.4996, lng: 34.895 });

    map.fitBounds(bounds);
  }, []);

  return { directions, onLoad };
};
