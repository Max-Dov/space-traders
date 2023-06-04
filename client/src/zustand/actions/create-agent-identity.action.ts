import { postAgentIdentityRequest } from '@utils';
import { CreateAgent } from '@types';
import { useAgentTokenStore } from '@zustand/stores/use-agent-token.store';
import { useMyAgentDetailsStore } from '@zustand/stores/use-my-agent-details.store';

export const createAgentIdentity = async (agentIdentity: CreateAgent) => {
  const data = await postAgentIdentityRequest(agentIdentity);
  const agentToken = data.token;
  const agentDetails = data.agent;
  useAgentTokenStore.setState({ agentToken });
  useMyAgentDetailsStore.setState({ agentDetails });
};