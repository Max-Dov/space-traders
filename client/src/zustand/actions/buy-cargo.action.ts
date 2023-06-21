import { buyCargo as buyCargoRequest } from '@utils';
import { getMyAgentDetails } from '@zustand';
import { Ship } from '@types';

export const buyCargo = async (shipSymbol: Ship["symbol"], cargoSymbol: string, units: number) => {
  const response = await buyCargoRequest(shipSymbol, cargoSymbol, units);
  if (response !== null) {
    //To do update ship store
    getMyAgentDetails();
  }
};