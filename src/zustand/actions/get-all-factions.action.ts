import { fetchFullList } from '@utils';
import { useFactionsStore } from '@zustand';
import { ApiUrls } from '@constants';
import { Faction } from '@types';

export const getAllFactions = async () => {
  const factions = await fetchFullList<Faction>(ApiUrls.FACTIONS);
  if (factions !== null) {
    useFactionsStore.setState({ factions });
  }
};