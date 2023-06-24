import { Transaction, Agent } from '@types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TRANSACTIONS_STORE_VERSION } from '@constants';

type AgentSymbol = Agent['symbol'];

interface AgentsTransactionsStore {
  transactions: {
    [key in AgentSymbol]: Transaction[];
  }
}

export const useAgentsTransactionsStore = create<AgentsTransactionsStore>()(persist((_set) => ({
  transactions: {},
}), { name: 'transactions-store', version: TRANSACTIONS_STORE_VERSION }));