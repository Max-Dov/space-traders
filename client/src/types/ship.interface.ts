export interface Ship {
  /**
   * The globally unique identifier of the ship in the following format: [AGENT_SYMBOL]_[HEX_ID]
   */
  symbol: string;
  nav: {
    systemSymbol: string;
    waypointSymbol: string;
  }
}