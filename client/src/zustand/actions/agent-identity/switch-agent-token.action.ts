import { useAgentsTokensStore, getMyAgentDetails, getAllContracts } from '@zustand';

/**
 * Switches token to another token saved in browser.
 * Safe action that should not verify against API.
 */
export const switchAgentToken = (newToken: string) => {
  const existingTokens = useAgentsTokensStore.getState().savedAgentTokens;
  const doesTokenExists = existingTokens.some(([existingToken]) => existingToken === newToken);
  if (doesTokenExists) {
    useAgentsTokensStore.setState({ agentToken: newToken });
    getMyAgentDetails();
    getAllContracts();
  }
};