import { useAgentIdentityStore } from '@zustand';

/**
 * Returns auth token in format ready to be spread in axios requests.
 */
export const getAuthHeader = () => {
  const token = useAgentIdentityStore.getState().agentToken
  return {Authorization: `Bearer ${token}`}
}