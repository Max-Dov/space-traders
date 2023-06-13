import { useMarketStore } from '@zustand';
import { getMarket as getMarketRequest } from '@utils';
import { Ship } from '@types';

export const getMarket = async (
  systemSymbol: Ship['nav']['systemSymbol'],
  waypointSymbol: Ship['nav']['waypointSymbol']
) => {
  const market = await getMarketRequest(systemSymbol, waypointSymbol);
  if (market !== null) {
    useMarketStore.setState({ market });
  }
};
