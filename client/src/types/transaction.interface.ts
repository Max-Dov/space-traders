import { Market, ProductCategory } from '@types';

export interface Transaction {
  agent: {
    credits: number;
  }
  cargo: {
    inventory: Array<{
      symbol: ProductCategory;
      name: string;
    }>;
  };
  transaction: Market['transactions'][0];
};
