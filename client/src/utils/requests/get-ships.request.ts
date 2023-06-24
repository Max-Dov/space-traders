import { ApiUrls } from '@constants';
import { makeApiRequest } from '@utils';
import { Ship } from '@types';

interface Response {
  data: Array<Ship>;
}

export const getShips = async () => {
  const response = await makeApiRequest<Response>({
    method: 'GET',
    url: ApiUrls.GET_SHIPS,
  });
  return response === null ? null : response.data;
};