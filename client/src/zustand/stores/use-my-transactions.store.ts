import { Transaction, Agent } from '@types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AgentSymbol = Agent['symbol'];

interface MyTransactionsStore {
  transactions: {
    [key in AgentSymbol]: Transaction[];
  }
  
}

export const useMyTransactionsStore = create<MyTransactionsStore>()(persist((_set) => ({
  transactions: {},
}), { name: 'transactions-store', version: 1 }));