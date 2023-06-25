import { WaypointTypes } from '@constants';

/**
 * Comes from API as part of Ship['route'] object.
 * Describes destination or departure object.
 */
export interface ShipNavTarget {
  /**
   * The symbol of the waypoint.
   */
  symbol: string;
  type: WaypointTypes;
  systemSymbol: string;
  /**
   * Position in the universe in the x-axis.
   */
  x: number;
  /**
   * Position in the universe in the y-axis.
   */
  y: number;
}