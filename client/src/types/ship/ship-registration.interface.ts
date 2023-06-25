import { ShipRoles } from '@constants';

/**
 * The public registration information of the ship
 */
export interface ShipRegistration {
  /**
   * The agent's registered name of the ship
   */
  name: string;
  /**
   * The symbol of the faction the ship is registered with
   */
  factionSymbol: string;
  role: ShipRoles;
}