import { makeApiRequest } from '@utils';
import { ApiUrls } from '@constants';
import { Faction } from '@types';

interface Response {
  data: Array<Faction>;
}

export const getFactions = async (): Promise<Array<Faction> | null> => {
  const response = await makeApiRequest<Response>({
    method: 'GET',
    url: ApiUrls.FACTIONS,
  });
  if (response === null) {
    return null;
  }
  return response.data
};