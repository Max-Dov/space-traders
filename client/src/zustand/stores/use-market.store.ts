import { create } from 'zustand';
import { Market } from '@types';

interface MarketStore {
  market: Market | null;
}

export const useMarketStore = create<MarketStore>()(() => ({
  market: null,
}));