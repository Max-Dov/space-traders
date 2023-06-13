import { ApiUrls } from '@constants';
import { makeApiRequest } from '@utils';
import { Market, Ship } from '@types';

interface Response {
  data: Market;
}

export const getMarket = async (
  systemSymbol: Ship['nav']['systemSymbol'],
  waypointSymbol: Ship['nav']['waypointSymbol']
) => {
  const response = await makeApiRequest<Response>({
    method: 'GET',
    url: ApiUrls.GET_MARKET,
    urlParams: { systemSymbol, waypointSymbol },
  });
  return response === null ? null : response.data;
};
