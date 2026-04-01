import { directionsOptions, googleMapIcons } from '@/common/mapStyles';
import { DirectionsRenderer, Marker } from '@react-google-maps/api';
import { FC } from 'react';

interface Props {
  directions: google.maps.DirectionsResult;
}

export const GoogleMapsDirections: FC<Props> = ({ directions }) => {
  const origin = directions.routes[0].legs[0].start_location;
  const destination = directions.routes[0].legs[0].end_location;
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
      <DirectionsRenderer
        directions={directions}
        options={{
          ...directionsOptions,
          suppressMarkers: true,
        }}
      />
    </>
  );
};
