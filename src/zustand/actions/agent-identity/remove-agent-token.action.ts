import { useAgentsTokensStore } from '@zustand/stores/use-agents-tokens.store';

export const removeAgentToken = (agentToken: string) => {
  useAgentsTokensStore.getState().deleteAgentToken(agentToken);
};