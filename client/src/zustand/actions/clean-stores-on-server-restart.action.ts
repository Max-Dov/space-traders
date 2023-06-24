import {
  useAgentsTokensStore,
  useContractsStore,
  useFactionsStore,
  useMarketsStore,
  useServerStatusStore,
} from '@zustand';

/**
 * Checks if date now is after date of next server restart and if so, then cleans all non-static info stores.
 */
export const cleanStoresOnServerRestart = () => {
  const { serverStatus, lastResetDate } = useServerStatusStore.getState();
  if (serverStatus !== null && lastResetDate !== null) {
    const nowTime = new Date().getTime();
    const lastResetTime = new Date(lastResetDate).getTime();
    const shouldReset = nowTime > lastResetTime;
    if (shouldReset) {
      useAgentsTokensStore.setState({ agentToken: null, savedAgentTokens: [] });
      useFactionsStore.setState({ factions: [] });
      useContractsStore.setState({ contracts: [] });
      useServerStatusStore.setState({ serverStatus: null });
      useMarketsStore.setState({ markets: {}, selectedMarket: null });
      const newLastResetDate = serverStatus.serverResets.next;
      useServerStatusStore.setState({ lastResetDate: newLastResetDate });
    }
  }
  if (lastResetDate === null && serverStatus !== null) {
    const lastResetDate = serverStatus.serverResets.next;
    useServerStatusStore.setState({ lastResetDate });
  }
};