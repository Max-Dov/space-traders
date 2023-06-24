import { Transaction } from '@types';

/**
 * Transaction model coming from API on buy/sell operations.
 */
export interface MarketTransaction {
  agent: {
    credits: number;
  }
  cargo: {
    inventory: Array<{
      symbol: string;
      name: string;
    }>;
  };
  transaction: Transaction;
}
