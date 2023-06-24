import { useMarketsStore } from '@zustand';
import { getMarket as getMarketRequest, getSystemFromWaypoint } from '@utils';
import { Ship } from '@types';

export const getMarket = async (
  waypointSymbol: Ship['nav']['waypointSymbol'],
) => {
  console.log({waypointSymbol})
  const systemSymbol = getSystemFromWaypoint(waypointSymbol);
  if (!systemSymbol) {
    return;
  }
  const market = await getMarketRequest(systemSymbol, waypointSymbol);
  if (market !== null) {
    const updatedAt = new Date().getTime();
    useMarketsStore.setState({
      markets: {
        ...useMarketsStore.getState().markets,
        [waypointSymbol]: { ...market, updatedAt },
      },
    });
  }
};
