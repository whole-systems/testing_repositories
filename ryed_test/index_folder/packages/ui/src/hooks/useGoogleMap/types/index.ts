import { ILocation } from '@ryed-ui/hooks/useLocationSelect';

export interface IWaypoint {
  location: ILocation;
  stopover: boolean;
}
