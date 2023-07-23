import { getAllContracts, useAgentsTokensStore, useMyAgentDetailsStore } from '@zustand';
import { getMyAgentDetails as getMyAgentDetailsRequest } from '@utils';

/**
 * Applies new agent token.
 * Additionally, makes agent details request and if details are obtained, saves token to an app.
 */
export const applyAgentToken = async (newToken: string) => {
  useAgentsTokensStore.setState({ agentToken: newToken });
  const agentDetails = await getMyAgentDetailsRequest();
  if (agentDetails !== null) {
    useMyAgentDetailsStore.setState({ agentDetails });
    useAgentsTokensStore.getState().saveAgentToken([newToken, agentDetails.symbol]);
    getAllContracts();
  }
};