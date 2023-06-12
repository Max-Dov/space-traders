import { create } from 'zustand';
import { Ship } from '@types';

interface ShipsStore {
  ships: Array<Ship>;
}

export const useShipsStore = create<ShipsStore>()(() => ({
  ships: [],
}));