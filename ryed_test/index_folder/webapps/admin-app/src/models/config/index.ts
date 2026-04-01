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

export interface IDefaultCurrencies {
  [key: TCurrencyCode]: string[];
}

export interface IConfig {
  airports: IAirport[];
  defaultAirports: IAirportWithGeoJson[];
  availableCountries: string[];
  defaultCurrencies: IDefaultCurrencies;
}

type TCurrencyCode = string;
