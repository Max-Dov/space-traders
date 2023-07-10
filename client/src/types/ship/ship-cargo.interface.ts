export interface ShipCargo {
  capacity: number;
  units: number;
  inventory: Array<{
    symbol: string;
    name: string;
    description: string;
    units: number;
  }>
}