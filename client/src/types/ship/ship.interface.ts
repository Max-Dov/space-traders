import { ShipCrew, ShipFrame, ShipNav, ShipRegistration } from '@types';


export interface Ship {
  /**
   * The globally unique identifier of the ship in the following format: [AGENT_SYMBOL]_[HEX_ID]
   */
  symbol: string;
  nav: ShipNav;
  crew: ShipCrew;
  registration: ShipRegistration;
  frame: ShipFrame;
}
