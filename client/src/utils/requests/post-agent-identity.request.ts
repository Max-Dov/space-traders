import { ApiUrls } from '@constants/api-urls.constant';
import axios from 'axios';
import { Agent, Contract, CreateAgent, Faction, Ship } from '@types';

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

export const postAgentIdentityRequest = (agentIdentity: CreateAgent): Promise<Response['data']> =>
  axios.post<Response>(ApiUrls.REGISTER_AGENT, agentIdentity).then(response => response.data.data);

