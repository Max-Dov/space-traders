import { getFactions as getFactionsRequest } from '@utils';
import { useFactionsStore } from '@zustand';

export const getFactions = async () => {
  const factions = await getFactionsRequest();
  if (factions !== null) {
    useFactionsStore.setState({ factions });
  }
};