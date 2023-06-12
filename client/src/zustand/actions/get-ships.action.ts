import { useShipsStore } from '@zustand';
import { getShips as getShipsRequest } from '@utils';

export const getShips = async () => {
  const ships = await getShipsRequest();
  if (ships !== null) {
    useShipsStore.setState({ ships });
  }
};