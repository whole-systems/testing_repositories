import { Marker } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';
import { googleMapIcons, mapOptions } from '@/common/mapStyles';
import { parsePoint } from '@/utils/parsePoint/parsePoint';
import { getJourneyStatus } from '@/utils/maps/journeyStatusMap';
import { useJourneyMap } from './hooks/useJourneyMap';
import { TJourney } from '@/models/journey';
import { Card } from '@ryed/ui/ui/Card';
import { JourneyDirections } from '@/components/JourneyDirections/JourneyDirections';

export const JourneyMap = ({ journeyData }: { journeyData: TJourney }) => {
  const { data } = useJourneyMap({ journeyData });
  return (
    <Card className=" min-h-96 h-full">
      <GoogleMap
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        center={data.directions ? data.directions[0] : { lat: 0, lng: 0 }}
        zoom={10}
        options={mapOptions}
      >
        {journeyData && data.directions && (
          <JourneyDirections
            startPoint={journeyData.fromLatLang}
            endPoint={journeyData.toLatLang}
            waypoints={data.waypoints}
            polyline={data.directions}
          />
        )}
        {/* {data.activeDirections && (
          <Polyline
            options={{ strokeColor: '#FFD700', strokeWeight: 2 }}
            path={data.activeDirections}
          />
        )} */}
        {journeyData.vehicleDriver?.location &&
          getJourneyStatus(journeyData.status) === 'in-progress' && (
            <Marker
              position={{
                ...(parsePoint(journeyData.vehicleDriver?.location) ?? {
                  lat: 0,
                  lng: 0,
                }),
              }}
              icon={{
                url: googleMapIcons.currentLocationCar,
                scaledSize: new window.google.maps.Size(42, 42),
              }}
            />
          )}
      </GoogleMap>
    </Card>
  );
};
