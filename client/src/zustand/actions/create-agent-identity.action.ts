import { postAgentIdentityRequest } from '@utils';
import { CreateAgent } from '@types';
import { useAgentTokenStore } from '@zustand/stores/use-agents-tokens.store';
import { useMyAgentDetailsStore } from '@zustand/stores/use-my-agent-details.store';
import { useContractsStore } from '@zustand/stores/use-contracts.store';

export const createAgentIdentity = async (agentIdentity: CreateAgent) => {
  clearAgentSpecificStores();
  const data = await postAgentIdentityRequest(agentIdentity);
  if (data !== null) {
    const agentToken = data.token;
    const agentDetails = data.agent;
    useAgentTokenStore.setState({ agentToken });
    useMyAgentDetailsStore.setState({ agentDetails });
  }
};

const clearAgentSpecificStores = () => {
  useAgentTokenStore.setState({ agentToken: null });
  useContractsStore.setState({ contracts: [] });
};