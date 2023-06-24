export enum TransactionType {
  PURCHASE = 'PURCHASE',
  SELL = 'SELL',
}

/**
 * Detailed receipt on buy/sell market action.
 * Comes from API.
 */
export interface Transaction {
  waypointSymbol: string;
  shipSymbol: string;
  tradeSymbol: string;
  type: TransactionType;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: string;
}