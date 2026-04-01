import { googleMapIcons } from '@/common/mapStyles';
import { TLocation } from '@/models/journey';
import { Marker, Polyline } from '@react-google-maps/api';
import { FC } from 'react';

interface Props {
  waypoints: TLocation[];
  polyline: google.maps.LatLng[];
  startPoint: TLocation;
  endPoint: TLocation;
}

export const JourneyDirections: FC<Props> = ({
  waypoints = [],
  polyline,
  startPoint,
  endPoint,
}) => {
  const origin = { lat: startPoint.latitude, lng: startPoint.longitude };
  const destination = { lat: endPoint.latitude, lng: endPoint.longitude };

  return (
    <>
      <Marker
        position={origin}
        icon={{
          url: googleMapIcons.startRide,
          scaledSize: new window.google.maps.Size(42, 42),
        }}
      />
      <Marker
        position={destination}
        icon={{
          url: googleMapIcons.endRide,
          scaledSize: new window.google.maps.Size(42, 42),
        }}
      />
      {waypoints.map((waypoint, index) => (
        <Marker
          key={index}
          position={{ lat: waypoint.latitude, lng: waypoint.longitude }}
          icon={{
            url: googleMapIcons.rideStoped,
            scaledSize: new window.google.maps.Size(42, 42),
          }}
        />
      ))}

      <Polyline
        options={{
          strokeColor: '#8400AA',
          strokeWeight: 2,
          strokeOpacity: 0.8,
        }}
        path={polyline}
      />
    </>
  );
};
