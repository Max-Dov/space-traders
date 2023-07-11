import { ShipInstallationRequirements } from '@types';

export interface ShipEngine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  speed: number;
  requirements: ShipInstallationRequirements;
}