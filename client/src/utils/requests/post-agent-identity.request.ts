import { ApiUrls } from '@constants/api-urls.constant';
import axios from 'axios';
import { Agent, Contract, CreateAgent, Faction, Ship } from '@types';

export const postAgentIdentityRequest = (agentIdentity: CreateAgent): Promise<{
  agent: Agent;
  contract: Contract;
  faction: Faction;
  ship: Ship;
  /**
   * Bearer token.
   */
  token: string;
}> =>
  axios.post(ApiUrls.REGISTER_AGENT, agentIdentity).then(response => response.data.data);

