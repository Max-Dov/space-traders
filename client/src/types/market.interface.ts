import { Transaction } from '@types';
import { TradeGoodsSymbols } from '@constants';

/**
 * Market model coming from API.
 */
export interface Market {
  symbol: string;
  exports: Array<{
    symbol: TradeGoodsSymbols;
    name: string;
    description: string;
  }>,
  imports: Array<{
    symbol: TradeGoodsSymbols;
    name: string;
    description: string;
  }>,
  exchange: Array<{
    symbol: TradeGoodsSymbols;
    name: string;
    description: string;
  }>,
  transactions: Array<Transaction>,
  tradeGoods: Array<{
    symbol: TradeGoodsSymbols;
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