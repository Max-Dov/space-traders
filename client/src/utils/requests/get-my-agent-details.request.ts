import { Agent } from '@types';
import { ApiUrls } from '@constants';
import { makeApiRequest } from '@utils';

interface Response {
  data: Agent;
}

export const getMyAgentDetails = async (): Promise<Agent | null> => {
  const response = await makeApiRequest<Response>({
    method: 'GET',
    url: ApiUrls.MY_AGENT_DETAILS,
  });
  return response === null ? null : response.data;
};
