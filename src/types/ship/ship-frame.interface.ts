import { ShipFrames } from '@constants';
import { ShipInstallationRequirements } from '@types';

export interface ShipFrame {
  symbol: ShipFrames;
  /**
   * Name of the frame.
   */
  name: string;
  /**
   * Description of the frame.
   */
  description: string;
  /**
   * Condition is a range of 0 to 100 where 0 is completely worn out and 100 is brand new.
   */
  condition: number;
  /**
   * The amount of slots that can be dedicated to modules installed in the ship.
   * Each installed module take up a number of slots, and once there are no more slots, no new modules can be installed.
   */
  moduleSlots: number;
  /**
   * The amount of slots that can be dedicated to mounts installed in the ship.
   * Each installed mount takes up a number of points, and once there are no more points remaining,
   * no new mounts can be installed.
   */
  mountingPoints: number;
  /**
   * The maximum amount of fuel that can be stored in this ship. When refueling, the ship will be refueled to this amount.
   */
  fuelCapacity: number;
  requirements: ShipInstallationRequirements;
}