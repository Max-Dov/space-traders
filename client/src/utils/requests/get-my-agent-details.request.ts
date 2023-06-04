import { Agent } from '@types';
import axios from 'axios';
import { ApiUrls } from '@constants';
import { getAuthHeader } from '@utils';

interface Response {
  data: Agent;
}

export const getMyAgentDetails = (): Promise<Agent> =>
  axios.get<Response>(ApiUrls.MY_AGENT_DETAILS, { headers: { ...getAuthHeader() } }).then(response => response.data.data);