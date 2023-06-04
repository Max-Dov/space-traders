import { useAgentTokenStore } from '@zustand';

/**
 * Returns auth token in format ready to be spread in axios requests.
 */
export const getAuthHeader = () => {
  const token = useAgentTokenStore.getState().agentToken
  return {Authorization: `Bearer ${token}`}
}