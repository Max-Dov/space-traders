import { getMarket, getShips } from '@zustand';

/**
 * Refreshes all markets for current agent.
 * Will reload marketplaces for every unique waypoint for all agent ships.
 */
export const refreshMarkets = async () => {
  const ships = await getShips();
  if (ships) {
    const uniqueWaypoints = [...ships.reduce(
      (waypoints, ship) => waypoints.add(ship.nav.waypointSymbol),
      new Set<string>(),
    )];
    uniqueWaypoints.forEach(getMarket);
  }
};