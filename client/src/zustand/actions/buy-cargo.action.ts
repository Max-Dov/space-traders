import { buyCargo as buyCargoRequest } from '@utils';
import { getMyAgentDetails, useMyTransactionsStore } from '@zustand';
import { Ship, Agent } from '@types';

export const buyCargo = async (
  shipSymbol: Ship['symbol'],
  cargoSymbol: string,
  units: number,
  agentSymbol: Agent['symbol']
) => {
  const transaction = await buyCargoRequest(shipSymbol, cargoSymbol, units);
  if (transaction !== null) {
    //To do update ship store
    getMyAgentDetails();

    const prevTransactions = useMyTransactionsStore.getState().transactions[agentSymbol] ?? [];

    useMyTransactionsStore.setState({
      ...useMyTransactionsStore.getState(),
      transactions: {
        ...useMyTransactionsStore.getState().transactions,
        [agentSymbol]: [transaction, ...prevTransactions]
      },
    });
  }
};
