export interface ServerStatus {
  /**
   * The current status of the game server.
   */
  status: string;
  /**
   * The current version of the API.
   */
  version: string;
  /**
   * The date and time when the game server was last reset.
   */
  resetDate: string;
  stats: {
    agents: number;
    ships: number;
    systems: number;
    waypoints: number;
  };
  serverResets: {
    next: string;
    frequency: string;
  };
  leaderboards: {
    mostCredits: Array<{
      agentSymbol: string;
      credits: number;
    }>
    mostSubmittedCharts: Array<{
      agentSymbol: string;
      chartCount: number;
    }>
  };
  announcements: Array<{
    title: string
    body: string
  }>;
}