import { makeApiRequest } from '@utils';
import { ApiUrls } from '@constants';
import { Ship, MarketTransaction } from '@types';

interface Response {
  data: MarketTransaction;
}

export const buyProduct = async (shipSymbol: Ship['symbol'], symbol: string, units: number) => {
  const response = await makeApiRequest<Response>({
    method: 'POST',
    url: ApiUrls.BUY_PRODUCT,
    urlParams: { shipSymbol },
    data: { symbol, units }
  });

  return response === null ? null : response.data;
};  