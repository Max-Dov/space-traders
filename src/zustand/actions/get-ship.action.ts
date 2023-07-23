import { getShip as getShipRequest } from '@utils';
import { Ship } from '@types';
import { useShipsStore } from '@zustand';

export const getShip = async (shipSymbol: Ship['symbol']) => {
  const ship = await getShipRequest(shipSymbol);

  if (ship !== null) {
    useShipsStore.getState().updateShip(ship);
  }
};
