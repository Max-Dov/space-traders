import { ApiUrls } from '@constants';
import { Agent, Contract, CreateAgent, Faction, Ship } from '@types';
import { makeApiRequest } from '@utils';

interface Response {
  data: {
    agent: Agent;
    contract: Contract;
    faction: Faction;
    ship: Ship;
    /**
     * Bearer token.
     */
    token: string;
  };
}

export const postAgentIdentityRequest = async (agentIdentity: CreateAgent): Promise<Response['data'] | null> => {
  const response = await makeApiRequest<Response>({
    method: 'POST',
    url: ApiUrls.REGISTER_AGENT,
    data: agentIdentity,
  });
  return response === null ? null : response.data;
};

