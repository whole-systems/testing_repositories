import { GlobalLoader } from '@/components/ui/GlobalLoader';
import { Libraries, LoadScript } from '@react-google-maps/api';

const googleApiKey = process.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY ?? '';
const libraries: Libraries = ['places', 'core', 'maps', 'marker', 'geometry'];

export const GoogleMapsLoader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LoadScript
      googleMapsApiKey={googleApiKey}
      libraries={libraries}
      loadingElement={<GlobalLoader />}
    >
      {children}
    </LoadScript>
  );
};
