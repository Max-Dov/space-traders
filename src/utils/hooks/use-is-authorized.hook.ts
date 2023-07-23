import { useAgentsTokensStore } from '@zustand';

/**
 * Returns true app store has authorization token.
 */
export const useIsAuthorized = () => {
  const { agentToken } = useAgentsTokensStore();
  return agentToken !== null;
};
