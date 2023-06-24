import { MarketTransaction } from '@types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TRANSACTIONS_STORE_VERSION } from '@constants';
import { useAgentsTokensStore } from '@zustand/stores/use-agents-tokens.store';

type AgentToken = string;

interface AgentsTransactionsStore {
  transactions: {
    [key in AgentToken]: MarketTransaction[];
  };
  saveTransaction: (transaction: MarketTransaction) => void;
}

export const useAgentsTransactionsStore = create<AgentsTransactionsStore>()(persist((set, get) => ({
  transactions: {},
  saveTransaction: (transaction) => {
    const agentToken = useAgentsTokensStore.getState().agentToken;
    if (agentToken !== null) {
      const transactions = get().transactions;
      const agentTransactions = transactions[agentToken];
      if (!agentTransactions) {
        set({
          transactions: {
            ...transactions,
            [agentToken]: [transaction],
          },
        });
      } else {
        set({
          transactions: {
            ...transactions,
            [agentToken]: [transaction, ...agentTransactions],
          },
        });
      }
    }
  },
}), { name: 'transactions-store', version: TRANSACTIONS_STORE_VERSION }));