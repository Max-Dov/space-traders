import { create } from 'zustand';
import { Ship } from '@types';
import { persist } from 'zustand/middleware';
import { SHIPS_STORE_VERSION } from '@constants';

interface ShipsStore {
  ships: Array<Ship>;
  /**
   * Updates ships' info in store.
   */
  updateShip: (ship: Ship) => void;
}

export const useShipsStore = create<ShipsStore>()(persist((set, get) => ({
  ships: [],
  updateShip: (ship) => {
    const shipSymbol = ship.symbol;
    const ships = [...get().ships];
    const shipIndex = ships.findIndex(ship => ship.symbol === shipSymbol);
    if (shipIndex !== -1) {
      ships[shipIndex] = ship;
      set({ ships });
    }
  },
}), { name: 'ships-store', version: SHIPS_STORE_VERSION }));