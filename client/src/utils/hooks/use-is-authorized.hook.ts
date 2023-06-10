import { useAgentTokenStore } from '@zustand';

/**
 * Returns true app store has authorization token.
 */
export const useIsAuthorized = () => {
  const { agentToken } = useAgentTokenStore();
  return agentToken !== null;
};
