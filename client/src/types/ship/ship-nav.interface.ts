import { ShipRoute } from '@types';

export interface ShipNav {
  systemSymbol: string;
  waypointSymbol: string;
  route: ShipRoute;
  status: 'IN_TRANSIT' | 'IN_ORBIT' | 'DOCKED';
  /**
   * The ship's set speed when traveling between waypoints or systems.
   * Default is CRUISE.
   */
  flightMode: 'DRIFT' | 'CRUISE' | 'STEALTH' | 'BURN';
}