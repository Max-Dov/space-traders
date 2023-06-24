import { MarketTransaction } from '@types';
import { useAgentsTransactionsStore } from '@zustand';

export const saveTransaction = (transaction: MarketTransaction) => {
  useAgentsTransactionsStore.getState().saveTransaction(transaction);
};