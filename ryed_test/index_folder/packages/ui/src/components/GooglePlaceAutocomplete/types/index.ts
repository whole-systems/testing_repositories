export interface ICountryRegistry {
  name: string;
  code: string;
}

export interface IAirport {
  country: string;
  airportName: string;
  airportCode: string;
}

export interface IAirportWithGeoJson extends IAirport {
  geoJson: {
    type: string;
    geometry: {
      type: string;
      coordinates: Array<Array<number>>;
    };
  };
}
export interface IAirports {
  airports: IAirport[];
  defaultAirports: IAirportWithGeoJson[];
  availableCountries: string[];
}
