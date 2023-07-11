import { ShipCargoItem } from '@types';

export interface ShipCargo {
  capacity: number;
  units: number;
  inventory: Array<ShipCargoItem>
}