import { ShipInstallationRequirements } from '@types';

export interface ShipModule {
  symbol: string;
  name: string;
  description: string;
  requirements: ShipInstallationRequirements;
  /**
   * Modules that have a range will such as a sensor array show this value to denote how far can the module reach with
   * its capabilities.
   */
  range?: number;
  /**
   * Modules that provide capacity, such as cargo hold or crew quarters will show this value to denote how much of a
   * bonus the module grants.
   */
  capacity?: number;
}