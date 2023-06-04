import { useAgentTokenStore, useMyAgentDetailsStore } from '@zustand';
import { getMyAgentDetails as getMyAgentDetailsRequest } from '@utils';

/**
 * Fetches agent details if possible (if agentToken is present)
 */
export const getMyAgentDetails = async () => {
  const token = useAgentTokenStore.getState().agentToken;
  if (token !== null) {
    const agentDetails = await getMyAgentDetailsRequest();
    useMyAgentDetailsStore.setState({ agentDetails });
  }
};