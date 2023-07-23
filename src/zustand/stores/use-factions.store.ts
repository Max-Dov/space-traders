import { create } from 'zustand';
import { Faction } from '@types';

interface FactionsStore {
  factions: Array<Faction>;
}

export const useFactionsStore = create<FactionsStore>()(() => ({
  factions: [],
}));