import { ShipNavTarget } from '@types';

export interface ShipRoute {
  destination: ShipNavTarget;
  departure: ShipNavTarget;
  departureTime: string;
  arrival: string;
}