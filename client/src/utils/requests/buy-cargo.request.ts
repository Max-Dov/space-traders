import { makeApiRequest } from '@utils';
import { ApiUrls } from '@constants';
import { Ship, Transaction } from '@types';

interface Response {
  data: Transaction;
}

export const buyCargo = async (shipSymbol: Ship['symbol'], symbol: string, units: number) => {
  const response = await makeApiRequest<Response>({
    method: 'POST',
    url: ApiUrls.BUY_CARGO,
    urlParams: { shipSymbol },
    data: { symbol, units }
  });

  return response === null ? null : response.data;
};  