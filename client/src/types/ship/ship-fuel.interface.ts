export interface ShipFuel {
  current: number;
  capacity: number;
  /**
   * An object that only shows up when an action has consumed fuel in the process. Shows the fuel consumption data.
   */
  consumed?: {
    /**
     * The amount of fuel consumed by the most recent transit or action.
     */
    amount: number;
    /**
     * The time at which the fuel was consumed.
     */
    timestamp: string;
  }
}