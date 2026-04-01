interface Point {
  lat: number;
  lng: number;
}

export const parseGoogleDirections = async (
  from: Point,
  to: Point
): Promise<google.maps.LatLng[]> => {
  const directionsService = new google.maps.DirectionsService();
  let latLngArray: google.maps.LatLng[] = [];
  await directionsService.route(
    {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        if (!result) return;
        if (result.routes.length === 0) {
          return;
        }

        const route = google.maps.geometry.encoding.decodePath(
          result.routes[0].overview_polyline
        );
        latLngArray = route;
      } else {
        console.error('Failed to load directions:', result);
      }
    }
  );

  return latLngArray;
};
