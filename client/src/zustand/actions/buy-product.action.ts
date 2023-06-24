import { buyProduct as buyCargoRequest } from '@utils';
import { Ship } from '@types';
import { getShip, saveTransaction } from '@zustand';

export const buyProduct = async (
  productSymbol: string,
  amount: number,
  /**
   * If successfully bought, product would go to docked ship's cargo.
   */
  shipSymbol: Ship['symbol'],
) => {
  const transaction = await buyCargoRequest(shipSymbol, productSymbol, amount);
  if (transaction !== null) {
    saveTransaction(transaction);
    getShip(shipSymbol);
  }
};
