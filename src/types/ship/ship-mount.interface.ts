import { TradeGoodsSymbols } from '@constants';
import { ShipInstallationRequirements } from '@types';

export interface ShipMount {
  symbol: string;
  name: string;
  requirements: ShipInstallationRequirements;
  description?: string;
  /**
   * Mounts that have this value, such as mining lasers, denote how powerful this mount's capabilities are.
   */
  strength?: number;
  /**
   * Mounts that have this value denote what goods can be produced from using the mount.
   */
  deposits?: Array<TradeGoodsSymbols>;
}