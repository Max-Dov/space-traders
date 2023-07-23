import { ShipInstallationRequirements } from '@types';

export interface ShipReactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  powerOutput: number;
  requirements: ShipInstallationRequirements;
}