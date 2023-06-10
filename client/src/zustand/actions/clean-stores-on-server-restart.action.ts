import { useAgentTokenStore, useContractsStore, useFactionsStore, useServerStatusStore } from '@zustand';

/**
 * Checks if date now is after date of next server restart and if so, then cleans all non-static info stores.
 */
export const cleanStoresOnServerRestart = () => {
  const { serverStatus } = useServerStatusStore.getState();
  if (serverStatus !== null) {
    const nextResetDate = new Date(serverStatus.serverResets.next).getTime();
    const nowDate = new Date().getTime();
    const shouldReset = nowDate > nextResetDate;
    if (shouldReset) {
      useAgentTokenStore.setState({ agentToken: null });
      useFactionsStore.setState({ factions: [] });
      useContractsStore.setState({ contracts: [] });
      useServerStatusStore.setState({ serverStatus: null });
    }
  }
};