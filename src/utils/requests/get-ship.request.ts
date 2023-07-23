import { Ship } from '@types';
import { makeApiRequest } from '@utils';
import { ApiUrls } from '@constants';

interface Response {
  data: Ship;
}

export const getShip = async (shipSymbol: Ship['symbol']) => {
  const response = await makeApiRequest<Response>({
    url: ApiUrls.GET_SHIP,
    method: 'GET',
    urlParams: { shipSymbol },
  });
  return response === null ? null : response.data;
};