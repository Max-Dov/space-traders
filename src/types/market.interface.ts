import { Transaction } from '@types';
import { TradeGoodsSymbols } from '@constants';

/**
 * Market model coming from API.
 */
export interface Market {
  symbol: string;

  exports: Array<BriefTradeGoodInfo>,
  imports: Array<BriefTradeGoodInfo>,
  exchange: Array<BriefTradeGoodInfo>,

  transactions: Array<Transaction>,
  tradeGoods: Array<TradeGood>
}

interface BriefTradeGoodInfo {
  symbol: TradeGoodsSymbols;
  name: string;
  description: string;
}

interface TradeGood {
  symbol: TradeGoodsSymbols;
  tradeVolume: number;
  activity: Activity;
  supply: Supply;
  purchasePrice: number;
  sellPrice: number;
}

export enum Supply {
  SCARCE = 'SCARCE',
  LIMITED = 'LIMITED',
  MODERATE = 'MODERATE',
  ABUNDANT = 'ABUNDANT',
}

export enum Activity {
  WEAK = 'WEAK',
  GROWING = 'GROWING',
  STRONG = 'STRONG',
  RESTRICTED = 'RESTRICTED',
}