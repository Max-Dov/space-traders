import { create } from 'zustand';
import { Market, Ship } from '@types';
import { persist } from 'zustand/middleware';
import { MARKETS_STORE_VERSION } from '@constants';

type WaypointSymbol = Ship['nav']['waypointSymbol'];

interface StoreMarket extends Market {
  updatedAt: number;
}

interface MarketStore {
  markets: {
    [key in WaypointSymbol]: StoreMarket
  };
  /**
   * Currently opened market.
   */
  selectedMarket: WaypointSymbol | null;
}

export const useMarketsStore = create<MarketStore>()(persist((_set) => ({
  markets: {},
  selectedMarket: null,
}), { name: 'markets-store', version: MARKETS_STORE_VERSION }));