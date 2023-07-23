const waypointRegexp = /([A-Z0-9]+-[A-Z0-9]+)/;

/**
 * Gets system symbol from waypoint symbol.
 * E.g.: "X1-F132-AS2341" -> "X1-F132"
 */
export const getSystemFromWaypoint = (waypointSymbol: string): string | null => {
  const systemSymbol = waypointSymbol.match(waypointRegexp)?.[0];
  if (!systemSymbol) {
    console.warn('Weird: can not figure out system symbol from waypoint symbol', { waypointSymbol });
    return null;
  }
  return systemSymbol;
};