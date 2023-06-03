import { Agent } from '@types';
import axios from 'axios';
import { ApiUrls } from '@constants';
import { getAuthHeader } from '@utils';

export const getMyAgentDetails = (): Promise<Agent> =>
  axios.get(ApiUrls.MY_AGENT_DETAILS, { headers: { ...getAuthHeader() } });