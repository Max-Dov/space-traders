import { ShipCargo, ShipCrew, ShipEngine, ShipFrame, ShipFuel, ShipNav, ShipReactor, ShipRegistration } from '@types';

/**
 * Ship model coming from API.
 */
export interface Ship {
  /**
   * The globally unique identifier of the ship in the following format: [AGENT_SYMBOL]_[HEX_ID]
   */
  symbol: string;
  nav: ShipNav;
  crew: ShipCrew;
  registration: ShipRegistration;
  frame: ShipFrame;
  fuel: ShipFuel;
  cargo: ShipCargo;
  reactor: ShipReactor;
  engine: ShipEngine;
}
