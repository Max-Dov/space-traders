import { useMyAgentDetailsStore } from '@zustand';
import { getMyAgentDetails as getMyAgentDetailsRequest } from '@utils';

/**
 * Fetches agent details if possible (if agentToken is present).
 */
export const getMyAgentDetails = async () => {
  const agentDetails = await getMyAgentDetailsRequest();
  if (agentDetails !== null) {
    useMyAgentDetailsStore.setState({ agentDetails });
  }
};