import { ILocation } from '@ryed-ui/hooks/useLocationSelect';
import { IWaypoint } from '../types';

export interface IGetDirectionsParams {
  from: ILocation;
  to: ILocation;
  service: google.maps.DirectionsService;
  waypoints?: IWaypoint[] | null;
}

export const getDirections = ({
  from,
  to,
  waypoints,
  service,
}: IGetDirectionsParams): Promise<google.maps.DirectionsResult | null> => {
  return new Promise((resolve, reject) => {
    const origin = {
      lat: from.latitude,
      lng: from.longitude,
    };
    const destination = {
      lat: to.latitude,
      lng: to.longitude,
    };

    const waypointsToDirections =
      (waypoints?.map((item) => {
        return {
          location: {
            lat: item.location.latitude,
            lng: item.location.longitude,
          },
          stopover: true,
        };
      }) as google.maps.DirectionsWaypoint[] as google.maps.DirectionsWaypoint[]) ||
      [];

    service.route(
      {
        origin,
        destination,
        waypoints: waypointsToDirections,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(result);
        } else {
          console.error('Failed to load directions:', result);

          reject(new Error('Failed to load directions'));
        }
      }
    );
  });
};
