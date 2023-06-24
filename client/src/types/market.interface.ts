import { Transaction } from '@types';

/**
 * Market model coming from API.
 */
export interface Market {
  symbol: string;
  exports: Array<{
    symbol: string;
    name: string;
    description: string;
  }>,
  imports: Array<{
    symbol: string;
    name: string;
    description: string;
  }>,
  exchange: Array<{
    symbol: string;
    name: string;
    description: string;
  }>,
  transactions: Array<Transaction>,
  tradeGoods: Array<{
    symbol: string;
    tradeVolume: number;
    supply: Supply;
    purchasePrice: number;
    sellPrice: number;
  }>
}

export enum Supply {
  SCARCE = 'SCARCE',
  LIMITED = 'LIMITED',
  MODERATE = 'MODERATE',
  ABUNDANT = 'ABUNDANT',
}