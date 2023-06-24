import { create } from 'zustand';
import { Ship } from '@types';
import { persist } from 'zustand/middleware';
import { SHIPS_STORE_VERSION } from '@constants';

interface ShipsStore {
  ships: Array<Ship>;
}

export const useShipsStore = create<ShipsStore>()(persist((_set) => ({
  ships: [],
}), { name: 'ships-store', version: SHIPS_STORE_VERSION }));