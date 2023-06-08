import { makeApiRequest } from '@utils';
import { ApiUrls } from '@constants';
import { ApiListResponse, Faction } from '@types';

export const getFactions = async (): Promise<Array<Faction> | null> => {
  const response = await makeApiRequest<ApiListResponse<Faction>>({
    method: 'GET',
    url: ApiUrls.FACTIONS,
    listParams: {
      page: 1,
      limit: 20,
    },
  });
  if (response === null) {
    return null;
  }
  return response.data;
};