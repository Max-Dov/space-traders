import { useMarketsStore } from '@zustand';

export const setSelectedMarket = (selectedMarket: string | null) => {
  useMarketsStore.setState({ selectedMarket });
};